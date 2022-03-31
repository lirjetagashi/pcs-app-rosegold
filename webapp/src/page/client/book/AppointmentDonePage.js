import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useUser from "../../../hooks/useUser";

const useStyle = makeStyles(theme => ({
    main: {
       display: "flex",
       justifyContent: 'center',
       alignItems: 'center',
       height:  '90vh'
    },
    paper: {
        width: '50%',
        height: '50%'
    }
}))

export default function AppointmentDonePage() {

    const classes = useStyle();
    const {user} = useUser();

    return (
        <>
            <div className={classes.main}>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography component={"h2"} variant={"h2"} align={"center"} style={{marginTop: "2em"}}>Your appointment is booked!</Typography>
                    <Typography component={"h4"} variant={"h4"} align={"center"} style={{marginTop: "4em"}}>Thank you for booking with us, {user.firstName}.</Typography>
                </Paper>
            </div>
        </>
    );
}