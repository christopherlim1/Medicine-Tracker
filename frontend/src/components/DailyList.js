import * as React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
function DailyList() {
    return(
        <Grid container>
            <Grid item xs={6}>
                <Typography align="left" variant="h5">Medication</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align="right" variant="h5">Doses</Typography>
            </Grid>
        </Grid>
    );
}

export default DailyList;