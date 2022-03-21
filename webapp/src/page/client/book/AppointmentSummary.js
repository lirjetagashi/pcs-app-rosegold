import Typography from "@material-ui/core/Typography";
import {Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {formatCurrency, formatName} from "../../../utils/Utils";
import {intervalToDuration} from "date-fns";
import Box from "@material-ui/core/Box";
import SimpleBar from "simplebar-react";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%"
    },
    description: {
        fontSize: "1rem",
        float: "left",
        margin: theme.spacing(1)
    },
    duration: {
        width: 120,
        textAlign: "center",
        float: "right",
        display: "inline-block",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0),
        border: "1px solid " + theme.palette.divider,
        borderBottomLeftRadius: "30px",
        borderTop: 0,
        borderRight: 0,
    },
    divider: {
        clear: "both",
        backgroundColor: theme.palette.primary.main
    },
    list: {
        height: "calc(100% - 120px)",
    },
    total: {
        marginTop: "auto",
        padding: theme.spacing(1),
        "& span": {
            fontSize: "1rem",
        },
        "& span:first-child": {
            float: "left"
        },
        "& span:nth-child(2)": {
            float: "right"
        }
    },
}))

export default function AppointmentSummary({appointmentLines, onRemove}) {

    const classes = useStyle();
    const services = appointmentLines?.map(x => x.service) || [];
    const durationInMinutes = services.map(x => x.durationInMinutes).reduce((a, b) => a + b, 0);
    const duration = intervalToDuration({start: 0, end: durationInMinutes * 60 * 1000});
    const formattedDuration = duration.hours === 0 ? `${duration.minutes} min` : `${duration.hours} hr ${duration.minutes} min`
    const total = services.map(x => x.price).reduce((a, b) => a + b, 0);

    return (
        <Box className={classes.root} display="flex" flexDirection="column">
            <div style={{width: "100%"}}>
                <Typography variant="overline" component="span" className={classes.description}>Your appointment</Typography>
                <Typography variant="body1" component="span" className={classes.duration}>{formattedDuration}</Typography>
            </div>
            <Divider className={classes.divider} variant="middle"/>
            <SimpleBar className={classes.list}>
                <List>
                    {appointmentLines?.map((appointmentLine, i) => (
                        <React.Fragment key={i}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {appointmentLine.employee.id !== -1 && appointmentLine.employee.firstName.charAt(0) || <PersonIcon/>}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={appointmentLine.service.name}
                                    secondary={
                                        <>
                                            <Typography variant="body1">{formatName(appointmentLine.employee.firstName, appointmentLine.employee.lastName)}</Typography>
                                            {formatCurrency(appointmentLine.service.price)}
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onRemove(appointmentLine.service)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>
            </SimpleBar>
            <Divider className={classes.divider} variant="middle"/>
            <div className={classes.total}>
                <Typography variant="overline" component="span">Total:</Typography>
                <Typography variant="overline" component="span">{formatCurrency(total)}</Typography>
            </div>
        </Box>
    );
}