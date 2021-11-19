import * as React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

import {WorkspaceContext} from '../App.js';

const getEvents = async (googleID, setCurrentEvents) => {
    await axios.get(`http://localhost:4000/v0/medicine/events/${googleID}`)
    .then((response) => {
        setCurrentEvents(response.data);
    })
    .catch(() => {
        console.log('Cannot get medicine list');
    });
};

const getMedicine = async (googleID, setMedicineList) => {
    await axios.get(`http://localhost:4000/v0/medicine/${googleID}`)
    .then((res) => {
        setMedicineList(res.data);
    })
    .catch(() => {
        console.log('Cannot get medicine list');
    });
};

function DailyList() {
    const {customerIDS, currentEventsS, medicineListS} = React.useContext(WorkspaceContext);

    const [googleID,] = customerIDS;
    const [medicineList, setMedicineList] = medicineListS;
    const [, setCurrentEvents] = currentEventsS;

    React.useEffect(() => {
        getEvents(googleID, setCurrentEvents);
        getMedicine(googleID, setMedicineList);
    }, [googleID, setCurrentEvents, setMedicineList]);

    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
    let today = new Date();
    const display = [['today', today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear()]];
    for (let i = 1; i < 30; i++) {
        today.setDate(today.getDate() + 1);
        display.push([dow[today.getDay()], today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear()]);
    }
    today = new Date();
    let dailymed = new Array(30);
    for (let i = 0; i < dailymed.length; i++) {
        dailymed[i] = [];
    }
    for (let i = 0; i < medicineList.length; i++) {
        for (let j = 0; j < 30; j += medicineList[i]['frequency']) {
            const date = new Date(medicineList[i]['time']);
            let hours = date.getHours();
            let mins = date.getMinutes();
            if(hours < 10) {
                hours = '0' + hours;
            }
            if(mins < 10) {
                mins = '0' + mins;
            }
            dailymed[j].push([medicineList[i]['name'], hours + ':' + mins])
        }
    }

    return(
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <Typography align="left" variant="h5">Medication</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right" variant="h5">Doses</Typography>
                </Grid>
            </Grid>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '100vw',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: '100vw',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
                >
                {display.map((sectionId, index) => (
                    <li key={`section-${sectionId}`}>
                    <ul>
                        <ListSubheader>{`${sectionId[0]} ${sectionId[1]}`}</ListSubheader>
                        {dailymed[index].map((item) => (
                            <ListItem key={`item-${sectionId}-${item}`}>
                                <ListItemText primary={`${item[0]}`} />
                                <Stack spacing={1} direction="row" sx={{float: 'right'}}>
                                    <div>
                                        <Button>{item[1]}</Button>
                                    </div>
                                </Stack>
                            </ListItem>
                        ))}
                    </ul>
                    </li>
                ))}
            </List>
        </div>
    );
}

export default DailyList;