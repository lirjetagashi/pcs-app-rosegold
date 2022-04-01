import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useUser from "../../../hooks/useUser";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export default function AppointmentDonePage() {

    const {user} = useUser();

    return (
        <>
            <Container justifyContent={"center"} style={{marginTop: "5em"}}>
                    <Paper variant="outlined">
                        <Typography component={"h2"} variant={"h2"} align={"center"} style={{marginTop: "2em"}}>Your appointment is booked!</Typography>
                        <Typography component={"h4"} variant={"h4"} align={"center"} style={{marginTop: "3em", marginBottom: "2em"}}>Thank you for booking with us, {user.firstName}.</Typography>
                        <Grid container justifyContent={"center"} spacing={3} style={{margin: "2em"}}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                >
                                    Print Appointment
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                >
                                    Email Appointment
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
            </Container>
        </>
    );
}