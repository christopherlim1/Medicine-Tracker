import * as React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function DailyList() {
    const meds = [
        {'name': 'Advil', 'Description': 'painkillers', 'Frequency': 1, 'time': ['12:00 pm', '2:00 pm'], 'doses': '2mg', 'totalAmount': '44'},
        {'name': 'Tylenol', 'Description': 'painkillers', 'Frequency': 2, 'time': ['1:15pm', '6:30pm'], 'doses': '4mg', 'totalAmount': '42'},
        {'name': 'Codine', 'Description': 'painkillers', 'Frequency': 7, 'time': ['8:00am'], 'doses': '5mg', 'totalAmount': '1'},
        {'name': 'Nyquil', 'Description': 'Sleepymeds', 'Frequency': 1, 'time': ['6:30am', '7:30pm'], 'doses': '6mg', 'totalAmount': '12'},
        {'name': 'DayQuil', 'Description': 'Not so sleepy meds', 'Frequency': 1, 'time': ['12:00pm', '2:00pm', '5:00pm'], 'doses': '67mg', 'totalAmount': '434'},
        ];
      const dow = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
      let today = new Date()
      const display = [['today', today.getMonth() + '/' +today.getDate()]];
      for (let i = 1; i < 30; i++) {
        today.setDate(today.getDate() + 1);
        display.push([dow[today.getDay()], today.getMonth() + '/' +today.getDate()]);
      }
      today = new Date();
      let dailymed = new Array(30);
      for (let i = 0; i < dailymed.length; i++) {
        dailymed[i] = [];
      }
      for (let i = 0; i < meds.length; i++) {
        for (let j = 0; j < 30; j= j + meds[i]['Frequency']){
          dailymed[j].push([meds[i]['name'] + '(' + meds[i]['doses'] + ')', meds[i]['time']])
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
                            {item[1].map((value) => (
                                <div>
                                    <Button>{value}</Button>
                                </div>
                            ))}
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