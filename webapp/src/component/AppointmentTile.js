import {Card, CardActionArea, CardContent, IconButton, Zoom} from "@material-ui/core";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import BasicTable from "./BasicTable";
import {getTime} from "../utils/Utils";
import Container from "@material-ui/core/Container";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
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
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        filter: props => props.blur,
        "& > .MuiCardContent-root": {
            height: "inherit",
            padding: 0,
        }
    },
    overlay: {
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        opacity: "0.6",
        "& *.MuiIconButton-root": {
            float: "right"
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
    },
}));

export default function AppointmentTile({appointment, className, onClick}) {
    const [clicked, setClicked] = useState(false);
    const classes = useStyles({blur: `blur(${clicked ? "4px" : "0px"})`});

    const tableColumns = [
        {title: "Service", field: "service.name"},
        {title: "Employee", field: "employee.firstName"},
    ];

    return (
        <Card className={clsx(classes.root, className)}>
            <CardActionArea className={classes.actionArea} onClick={() => setClicked(true)}>
                <CardContent>
                    <Box display="flex" className={classes.header}>
                        <Typography variant="h5" component="h2" style={{color: "lightgoldenrodyellow"}}>
                            {appointment?.user.firstName + " " + appointment?.user.lastName}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="h1" style={{color: "darkslategray"}}>
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
                                            color="textPrimary">{appointment.total}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
            {clicked &&
                <Zoom in={clicked}>
                    <div className={classes.overlay}>
                        <IconButton aria-label="close" onClick={() => setClicked(false)}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </div>
                </Zoom>
            }
        </Card>
    );
}