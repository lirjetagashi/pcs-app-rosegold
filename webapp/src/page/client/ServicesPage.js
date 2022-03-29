import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ServiceStep from "./book/ServiceStep";
import Box from "@material-ui/core/Box";
import {Paper} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        height: "calc(100% - 65px)",
    },
    leftPanel: {
        height: "100%",
        flexBasis: "75%",
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    rightPanel: {
        flexShrink: 0,
        height: "100%",
        minWidth: 250,
        flexGrow: 1,
        padding: theme.spacing(2),
        "& .MuiPaper-root": {
            height: "100%",
        }
    },
    stepper: {
        flexGrow: 0,
        marginBottom: theme.spacing(2)
    },
    content: {
        height: "100%",
        overflowY: "auto",
        flexGrow: 1,
        marginBottom: theme.spacing(2)
    },
    stepButtons: {
        flexGrow: 0,
        marginTop: "auto",
        marginLeft: "auto",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function ServicesPage({}) {

    const classes = useStyles();
    return (
        <>
            <Box display="flex" className={classes.root} flexWrap="wrap">
                <Box display="flex" flexDirection="column" className={classes.leftPanel}>
                    <Paper variant="outlined" className={classes.content}>
                        <ServiceStep hideAddButton={true}/>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}