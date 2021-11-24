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
const input = {}
const updateEvents = async (eventid) => {
    console.log(input);
    await axios.put(`http://localhost:4000/v0/events/update/${eventid}`, input)
    .then(() => {
        console.log('it worked');
    })
    .catch(() => {
        console.log('Cannot get event');
    });
}

function DailyList() {
    function taken(event) {
        console.log(event);
        event.taken = !event.taken;
        input['taken'] = event.taken;
        updateEvents(event.id)

    }

    const {customerIDS, currentEventsS, medicineListS} = React.useContext(WorkspaceContext);

    const [googleID,] = customerIDS;
    const [medicineList, setMedicineList] = medicineListS;
    const [currentEvents, setCurrentEvents] = currentEventsS;

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
    for  (let i = 0; i < currentEvents.length; i++) {
        // console.log(currentEvents[i]);
        const date = new Date(currentEvents[i]['start']);
        let hours = date.getHours();
        let mins = date.getMinutes();
        if(hours < 10) {
            hours = '0' + hours;
        }
        if(mins < 10) {
            mins = '0' + mins;
        }
        today = new Date();
        for (let j = 0; j < 30; j++) {
            if (today.getFullYear() == date.getFullYear() &&
            today.getDate() == date.getDate() &&
            today.getMonth() == date.getMonth()) {
                dailymed[j].push([currentEvents[i]['title'], hours + ':' + mins, currentEvents[i]['taken'], currentEvents[i]]);
            }
            today.setDate(today.getDate() + 1);
        }
        /*
        const Difference_In_Time = date.getTime() - today.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if ( Math.round(Difference_In_Days) == -0) {
            console.log(0);
            dailymed[0].push([currentEvents[i]['title'], hours + ':' + mins]);
        }
        if (Difference_In_Days >= 0) {
            const point = Math.round(Difference_In_Days);
            console.log(point);
            if (point < 30) {
                dailymed[point].push([currentEvents[i]['title'], hours + ':' + mins]);
            }
        }  */    
    }
    /*
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
    console.log(currentEvents); */
    //console.log('_____');
    //console.log(display);
    //console.log(dailymed);
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
                                        <Button variant="contained"
                                            sx = { !item[2] ? {'fontSize': '10px', 'margin': 'auto', 'display': 'flex',
                                            'backgroundColor': '#ff0000', '&:hover': {
                                            backgroundColor: '#00a400'}} : {'fontSize': '10px', 'margin': 'auto', 'display': 'flex',
                                            'backgroundColor': '#00a400', '&:hover': {
                                            backgroundColor: '#ff0000'}}}
                                            onClick={() => taken(item[3])}>
                                        {item[1]}
                                        </Button>
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