import * as React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Calendar from './Calendar';
import DailyList from './DailyList';
function Schedule() {
    const [viewtype, setviewtype] = React.useState('Calendar');
    //width: '100vw', height: '100vh'
    return(
        <Box className='schedule'sx={{position: 'relative', top: '60px', width: '100vw'}}>
            <Stack spacing={0} direction="row" sx={{display: 'flex', justifyContent:'center',
            alignItems:'center',margin: 'auto', width: '70vw'}}>
                <Button onClick={() => {
                setviewtype('List');
                }}>List</Button>
                <Button onClick={() => {
                setviewtype('Calendar');
                }}>Calendar</Button>
            </Stack>
            <hr></hr>
            {viewtype === 'Calendar' ? (
            <Calendar/>
          ) : viewtype === 'List' ? (
            <DailyList/>
          ) : null}
        </Box>
    );
}

export default Schedule;