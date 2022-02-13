import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import AppointmentTile from "./AppointmentTile";
import Box from "@material-ui/core/Box";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    tile: {
        width: "30em",
        height: "15em",
        margin: theme.spacing(4),
    }
}));

export default function AppointmentList({data, loading, moveLabel, onMoveClick, disableMove}) {

    const classes = useStyles();

    const finalData = loading ? new Array(6).fill(undefined) : data || [];

    return (
        <Grid container justifyContent="center" className={classes.root}>
            {finalData.map((appointment, i) => (appointment ?
                    <Grid key={i} item>
                        <AppointmentTile className={classes.tile} appointment={appointment} moveLabel={moveLabel} onMoveClick={onMoveClick} disableMove={disableMove}/>
                    </Grid>
                    :
                    <Box key={i} className={classes.tile}>
                        <Skeleton width="60%"/>
                        <Skeleton/>
                        <Skeleton variant="rect" height={"10em"}/>
                    </Box>
            ))}
        </Grid>
    );
}

/*
*/
