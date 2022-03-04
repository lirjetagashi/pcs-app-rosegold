import React from 'react';
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
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: "calc(100% - 65px)",
        padding: theme.spacing(2),
    },
    stepper: {
        flexGrow: 0,
        marginBottom: theme.spacing(2)
    },
    content: {
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

function getStepContent(step) {
    switch (step) {
        case 0:
            return <ServiceStep/>;
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

export default function BookPage({}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    function handleNext() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (
        <Box display="flex" flexDirection="column" className={classes.root}>
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
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </Box>
    );
}