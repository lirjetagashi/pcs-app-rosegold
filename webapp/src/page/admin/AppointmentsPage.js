import React, {useEffect, useRef, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../../component/TabPanel";
import AppointmentList from "../../component/AppointmentList";
import {useMutation} from "react-query";
import {AppointmentService} from "../../service/AppointmentService";
import PendingIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import InProgressIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Box from "@material-ui/core/Box";
import {InputAdornment, Paper, TextField} from "@material-ui/core";
import DateFilter from "../../component/DateFilter";
import Button from "@material-ui/core/Button";
import {format} from "date-fns";
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

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
    },
    swipeableViews: {
        backgroundColor: theme.palette.background.default
    },
    filter: {
        padding: theme.spacing(2),
        "& > *": {
            marginRight: theme.spacing(3)
        }
    },
    searchButton: {
        marginLeft: "auto"
    }
}));

const statusByIndex = new Map([[0, "PENDING"], [1, "IN_PROGRESS"], [2, "COMPLETED"]]);
const appointmentService = new AppointmentService();

export default function AppointmentsPage() {
    const theme = useTheme();
    const rangeRef = useRef();
    const [value, setValue] = useState(0);
    const [user, setUser] = useState('');
    const {mutate: searchAppointments, data, isLoading} = useMutation(({status, user, from, to}) => appointmentService.findByDateBetweenAndStatusAndUser(status, user, from, to));
    const {mutate: moveToProgress} = useMutation(appointment => appointmentService.moveToProgress(appointment), {
        onSuccess: handleSearch
    });
    const {mutate: moveToCompleted} = useMutation(appointment => appointmentService.moveToCompleted(appointment), {
        onSuccess: handleSearch
    });
    const classes = useStyles(getTabColor(value, theme));

    useEffect(() => {
        handleSearch()
    }, [value]);

    function handleMoveToProgress(appointment) {
        return moveToProgress(appointment);
    }

    function handleMoveToCompleted(appointment) {
        return moveToCompleted(appointment);
    }

    function handleSearch() {
        const filters = {
            status: statusByIndex.get(value),
            user: user,
            from: format(rangeRef.current.from, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
            to: format(rangeRef.current.to, "yyyy-MM-dd'T'HH:mm:ss.SSS")
        }
        searchAppointments(filters)
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
                slideClassName={classes.swipeableViews}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Paper variant="outlined" style={{marginBottom: theme.spacing(2)}}>
                        <Box display="flex" className={classes.filter} flexWrap="wrap">
                            <TextField value={user} onChange={(e) => setUser(e.target.value)} label="User" variant="outlined" InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon/>
                                    </InputAdornment>
                                ),
                            }}/>
                            <DateFilter rangeRef={rangeRef}/>
                            <Button className={classes.searchButton} variant="outlined" color="primary" onClick={handleSearch}
                                    startIcon={<SearchIcon/>}>Search</Button>
                        </Box>
                    </Paper>
                    <Paper variant="outlined">
                        <AppointmentList
                            data={data}
                            loading={isLoading}
                            onMoveClick={handleMoveToProgress}
                            moveLabel={"In Progress"}
                        />
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Paper variant="outlined" style={{marginBottom: theme.spacing(2)}}>
                        <Box display="flex" className={classes.filter} flexWrap="wrap">
                            <TextField label="User" variant="outlined" InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon/>
                                    </InputAdornment>
                                ),
                            }}/>
                            <DateFilter rangeRef={rangeRef}/>
                            <Button className={classes.searchButton} variant="outlined" color="primary" onClick={handleSearch}
                                    startIcon={<SearchIcon/>}>Search</Button>
                        </Box>
                    </Paper>
                    <Paper variant="outlined">
                        <AppointmentList
                            data={data}
                            loading={isLoading}
                            onMoveClick={handleMoveToCompleted}
                            moveLabel={"Completed"}
                        />
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Paper variant="outlined" style={{marginBottom: theme.spacing(2)}}>
                        <Box display="flex" className={classes.filter} flexWrap="wrap">
                            <TextField label="User" variant="outlined" InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon/>
                                    </InputAdornment>
                                ),
                            }}/>
                            <DateFilter rangeRef={rangeRef}/>
                            <Button className={classes.searchButton} variant="outlined" color="primary" onClick={handleSearch}
                                    startIcon={<SearchIcon/>}>Search</Button>
                        </Box>
                    </Paper>
                    <Paper variant="outlined">
                        <AppointmentList
                            disableMove
                            data={data}
                            loading={isLoading}
                        />
                    </Paper>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}