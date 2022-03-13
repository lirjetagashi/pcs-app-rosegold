import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ServiceStep from "./ServiceStep";
import Box from "@material-ui/core/Box";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import DateIcon from '@material-ui/icons/Today';
import clsx from "clsx";
import {Paper, StepConnector, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import AppointmentSummary from "./AppointmentSummary";
import StaffStep from "./StaffStep";
import DateTimeStep from "./DateTimeStep";

const CustomStepConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(90deg, #d274a1 0%, #B76E79 40%, #d79d7a 60%, #ffc400 100%)'
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(90deg, #d274a1 0%, #B76E79 40%, #d79d7a 60%, #ffc400 100%)'
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient(90deg, #d274a1 0%, #B76E79 40%, #d79d7a 60%, #ffc400 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient(90deg, #d274a1 0%, #B76E79 40%, #d79d7a 60%, #ffc400 100%)',
    },
});

function StepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <SettingsIcon/>,
        2: <PersonIcon/>,
        3: <DateIcon/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

StepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

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

function getSteps() {
    return ['Service', 'Staff', 'Date and time'];
}

export const defaultStaff = {id: -1, firstName: "Any available staff"};
const initialAppointmentLines = JSON.parse(localStorage.getItem("appointmentLines"));
const initialActiveStep = Number(localStorage.getItem("appointmentStep") || "0");

export default function BookPage({}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(initialActiveStep);
    const [appointmentLines, setAppointmentLines] = useState(initialAppointmentLines);
    const steps = getSteps();

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ServiceStep appointmentLines={appointmentLines} onAdd={addService}/>;
            case 1:
                return <StaffStep appointmentLines={appointmentLines} onStaffChange={changeStaff}/>
            case 2:
                return <DateTimeStep />;
            default:
                return 'Unknown step';
        }
    }

    useEffect(() => {
        localStorage.setItem("appointmentLines", JSON.stringify(appointmentLines));
        if (appointmentLines.length === 0) {
            setActiveStep(0);
        }
    }, [appointmentLines]);

    useEffect(() => {
        localStorage.setItem("appointmentStep", activeStep);
    }, [activeStep]);

    function changeStaff(appointmentLine, employee) {
        setAppointmentLines(prev => prev.map(al => {
            if (al.service.id === appointmentLine.service.id) {
                return {...al, employee: employee};
            }

            return al
        }))
    }

    function addService(category, service) {
        setAppointmentLines(prev => [...prev, {order: prev.length + 1, service: {...service, category: category}, employee: defaultStaff}]);
    }

    function removeService(service) {
        setAppointmentLines(prev => prev.filter(al => al.service.id !== service.id))
    }

    function handleNext() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (
        <Box display="flex" className={classes.root} flexWrap="wrap">
            <Box display="flex" flexDirection="column" className={classes.leftPanel}>
                <Paper variant="outlined" className={classes.stepper}>
                    <Stepper activeStep={activeStep} connector={<CustomStepConnector/>}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>
                <Paper variant="outlined" className={classes.content}>{getStepContent(activeStep)}</Paper>
                <div className={classes.stepButtons}>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        disabled={appointmentLines.length === 0}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </Box>
            <div className={classes.rightPanel}>
                <Paper variant="outlined">
                    <AppointmentSummary appointmentLines={appointmentLines} onRemove={removeService}/>
                </Paper>
            </div>
        </Box>
    );
}