import {Card, CardActionArea, CardContent} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import BasicTable from "./BasicTable";
import {getTime} from "../utils/Utils";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 450,
        backgroundColor: theme.palette.background.default,
        border: "1px solid",
        borderRadius: "5px",
        transition: 'transform .2s',
        '&:hover': {
            borderWidth: "2px",
            borderColor: theme.palette.primary.main,
            transform: 'scale(1.05)'
        }
    },
    actionArea: {
        height: "100%",
        "& > .MuiCardContent-root": {
            height: "inherit",
            padding: 0,
        }
    },
    header: {
        height: "25%",
        padding: theme.spacing(2),
        background: theme.palette.primary.mainGradient,
        "& > h2": {
            flex: 1
        },
        "& > body1": {
            flex: 1,
            color: theme.palette.text.dark,
            textAlign: "right",
            marginLeft: "auto"
        }
    },
    content: {
        padding: theme.spacing(1),
        height: "75%",
    },
    container: {
        textAlign: "justify"
    },
    total: {
        marginTop: "auto"
    },
    label: {
        display: "inline-block",
        width: "3em"
    },
    value: {
        marginLeft: theme.spacing(1)
    }
}));

export default function AppointmentTile({appointment, className, onClick}) {
    const classes = useStyles();

    console.log("Data: ", appointment);

    const tableColumns = [
        {title: "Service", field: "service.name"},
        {title: "Employee", field: "employee.firstName"},
    ]

    return (
        <Card className={clsx(classes.root, className)} onClick={onClick}>
            <CardActionArea className={classes.actionArea}>
                <CardContent>
                    <Box display="flex" className={classes.header}>
                        <Typography variant="h5" component="h2" style={{color: "white"}}>
                            {appointment?.user.firstName + " " + appointment?.user.lastName}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="body1">
                            {getTime(appointment?.dateTime)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" className={classes.content}>
                        <BasicTable data={appointment.appointmentLines} columns={tableColumns}/>
                        <Box style={{paddingLeft: "1.5em"}} display="flex" flexDirection="column" alignItems="baseline">
                            <Box display="flex" alignItems="baseline">
                                <Typography noWrap className={classes.label} variant="body2" component="span">From:</Typography>
                                <Typography noWrap className={classes.value} variant="body2" component="span"
                                            color="textSecondary">{getTime(appointment?.startDateTime)}</Typography>
                            </Box>
                            <Box display="flex" alignItems="baseline">
                                <Typography noWrap className={classes.label} variant="body2" component="span">To:</Typography>
                                <Typography noWrap className={classes.value} variant="body2" component="span"
                                            color="textSecondary">{getTime(appointment?.endDateTime)}</Typography>
                            </Box>
                            <Box display="flex" alignItems="baseline" className={classes.total}>
                                <Typography noWrap variant="h6" component="span">Total:</Typography>
                                <Typography noWrap className={classes.value} variant="h6" component="span"
                                            color="textSecondary">{appointment.total}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}