import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../../component/TabPanel";
import AppointmentList from "../../component/AppointmentList";
import {useQuery} from "react-query";
import {QueryKeys} from "../../service/QueryKeys";
import {AppointmentService} from "../../service/AppointmentService";
import PendingIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import InProgressIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function getTabColor(value, theme) {
    switch (value) {
        case 0:
            return {color: theme.palette.primary.main}
        case 1:
            return {color: theme.palette.secondary.main}
        case 2:
            return {color: theme.palette.success.main}
        default:
            throw new Error("Tab color not specified!");
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    tabs: {
        "& *.Mui-selected": {
            color: props => props.color,
        }
    },
    tabIndicator: {
        backgroundColor: props => props.color
    }
}));

const appointmentService = new AppointmentService();

export default function AppointmentsPage() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const {data, isLoading} = useQuery(QueryKeys.APPOINTMENTS, () => appointmentService.findAll());
    const classes = useStyles(getTabColor(value, theme));

    function handleAppointmentClick(appointment) {
        console.log("Appointment clicked: ", appointment);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    TabIndicatorProps={{className: classes.tabIndicator}}
                    className={classes.tabs}
                >
                    <Tab label="Pending" icon={<PendingIcon/>} {...a11yProps(0)} />
                    <Tab label="In Progress" icon={<InProgressIcon/>} {...a11yProps(1)} className={classes.inProgressTab}/>
                    <Tab label="Completed" icon={<CompletedIcon/>} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={setValue}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <AppointmentList
                        data={data}
                        loading={isLoading}
                        onTileClick={handleAppointmentClick}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    In Progress
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Completed
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}