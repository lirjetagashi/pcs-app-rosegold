import {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Divider, List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DatePicker} from "@material-ui/pickers";
import CustomToggleButton from "../../../component/CustomToggleButton";
import {AvailabilityService} from "../../../service/AvailabilityService";
import {useMutation} from "react-query";
import {QueryKeys} from "../../../service/QueryKeys";
import {getISODate} from "../../../utils/Utils";
import SimpleBar from "simplebar-react";
import {addDays, parseISO, startOfDay, subDays} from "date-fns";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
    },
    datePanel: {
        flex: 0.5,
    },
    datePicker: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
    },
    timePanel: {
        flex: 1,
        height: "100%"
    },
    timeFrames: {
        flex: 1,
        marginTop: theme.spacing(2),
        "& hr": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    list: {
        margin: theme.spacing(2),
        "& > button:not(:last-child)": {
            marginBottom: theme.spacing(2)
        }
    }
}))

function Header({title}) {
    return (
        <>
            <Typography variant="overline" component="h6" style={{textAlign: "center", fontSize: "0.8rem"}}>{title}</Typography>
            <Divider variant="middle"/>
        </>
    )
}

function TimeToggleButton({value, selected, onChange}) {
    return (
        <CustomToggleButton
            value={value}
            selected={selected === value}
            onChange={onChange}
            style={{width: "100%"}}
        >
            {value}
        </CustomToggleButton>
    )
}

const availabilityService = new AvailabilityService();

export default function DateTimeStep({appointmentLines}) {

    console.log("DateTimeStep");

    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('08:00 AM');
    const [selectedDateAvailability, setSelectedDateAvailability] = useState({date: getISODate(new Date()), noAvailability: true});
    const {mutate, data} = useMutation(QueryKeys.AVAILABILITY(appointmentLines), al => availabilityService.getAvailability(al), {
        onSuccess: selectFirstAvailableDate
    });

    useEffect(() => {
        mutate(appointmentLines);
    }, [appointmentLines]);

    function handleTimeChange(event) {
        setSelectedTime(event.target.textContent);
    }

    function shouldDisableDate(date) {
        const isoDate = getISODate(date);
        if (!data) {
            return true;
        }

        return !data.some(availability => availability.date === isoDate) ||
            data.some(availability => availability.date === isoDate && availability.noAvailability);
    }

    function selectFirstAvailableDate(availabilities) {
        if (!availabilities || availabilities.length === 0) {
            return;
        }
        
        const firstAvailable = availabilities.find(x => !x.noAvailability);
        setSelectedDateAvailability(firstAvailable);
        setDate(parseISO(firstAvailable.date));
    }

    function handleDateChange(newDate) {
        const isoDate = getISODate(newDate);
        const availability = data?.find(x => x.date === isoDate) || {date: isoDate, noAvailability: true}
        setSelectedDateAvailability(availability);
        setDate(newDate);
    }

    return (
        <Box display="flex" className={classes.root}>
            <div className={classes.datePanel}>
                <Header title="Pick a date"/>
                <div className={classes.datePicker}>
                    <DatePicker
                        autoOk
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={handleDateChange}
                        shouldDisableDate={shouldDisableDate}
                    />
                </div>
            </div>
            <SimpleBar className={classes.timePanel}>
                <Header title="Pick a time"/>
                <Box display="flex">
                    <div className={classes.timeFrames}>
                        <Header title="Morning"/>
                        <List component="nav" className={classes.list}>
                            {!selectedDateAvailability.noAvailability && selectedDateAvailability.availableTimesByDayPeriod.Morning?.map(time =>
                                <TimeToggleButton key={time} value={time.substring(0, 5)} selected={selectedTime} onChange={handleTimeChange}/>
                            )}
                        </List>
                    </div>
                    <div className={classes.timeFrames}>
                        <Header title="Afternoon"/>
                        <List component="nav" className={classes.list}>
                            {!selectedDateAvailability.noAvailability && selectedDateAvailability.availableTimesByDayPeriod.Afternoon?.map(time =>
                                <TimeToggleButton key={time} value={time.substring(0, 5)} selected={selectedTime} onChange={handleTimeChange}/>
                            )}
                        </List>
                    </div>
                    <div className={classes.timeFrames}>
                        <Header title="Evening"/>
                        <List component="nav" className={classes.list}>
                            {!selectedDateAvailability.noAvailability && selectedDateAvailability.availableTimesByDayPeriod.Evening?.map(time =>
                                <TimeToggleButton key={time} value={time.substring(0, 5)} selected={selectedTime} onChange={handleTimeChange}/>
                            )}
                        </List>
                    </div>
                </Box>
            </SimpleBar>
        </Box>
    );
}
