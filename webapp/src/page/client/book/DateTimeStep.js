import {useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Divider, List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DatePicker, KeyboardDatePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import CustomToggleButton from "../../../component/CustomToggleButton";

const useStyles = makeStyles(theme => ({
    datePanel: {
        flex: 0.5,
    },
    datePicker: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
    },
    timePanel: {
        flex: 1,
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

export default function DateTimeStep({}) {

    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('08:00 AM');

    function handleTimeChange(event) {
        console.log("Event: ", event);
        setSelectedTime(event.target.textContent);
    }

    return (
        <Box display="flex">
            <div className={classes.datePanel}>
                <Header title="Pick a date"/>
                <div className={classes.datePicker}>
                    <DatePicker
                        autoOk
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={setDate}
                    />
                </div>
            </div>
            <div className={classes.timePanel}>
                <Header title="Pick a time"/>
                <Box display="flex">
                    <div className={classes.timeFrames}>
                        <Header title="Morning"/>
                        <List component="nav" className={classes.list}>
                            <TimeToggleButton value="08:00 AM" selected={selectedTime} onChange={handleTimeChange}/>
                            <TimeToggleButton value="09:00 AM" selected={selectedTime} onChange={handleTimeChange}/>
                        </List>
                    </div>
                    <div className={classes.timeFrames}>
                        <Header title="Afternoon"/>
                        <List component="nav" className={classes.list}>
                            <TimeToggleButton value="01:00 PM" selected={selectedTime} onChange={handleTimeChange}/>
                            <TimeToggleButton value="02:00 PM" selected={selectedTime} onChange={handleTimeChange}/>
                        </List>
                    </div>
                    <div className={classes.timeFrames}>
                        <Header title="Evening"/>
                        <List component="nav" className={classes.list}>
                            <TimeToggleButton value="06:00 PM" selected={selectedTime} onChange={handleTimeChange}/>
                            <TimeToggleButton value="07:00 PM" selected={selectedTime} onChange={handleTimeChange}/>
                        </List>
                    </div>
                </Box>
            </div>
        </Box>
    );
}