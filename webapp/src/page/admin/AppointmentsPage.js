import React, {useEffect, useRef, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useMutation} from "react-query";
import {AppointmentService} from "../../service/AppointmentService";
import PendingIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import InProgressIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import {format} from "date-fns";
import AppointmentTab from "../../component/AppointmentTab";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AppointmentEditDialog from "../../component/AppointmentEditDialog";

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
        height: `calc(100% - 65px)`,
        "& > div": {
            height: "calc(100% - 54px) !important"
        },
        "& .react-swipeable-view-container": {
            height: "100%",
        }
    },
    tabHeader: {
        height: 54,
        "& *.Mui-selected": {
            color: props => props.color,
        },
        "& *.MuiTab-wrapper": {
            flexDirection: "row",
            "& :first-child": {
                marginRight: theme.spacing(1)
            }
        },
        "& *.MuiTab-labelIcon": {
            minHeight: 54,
        }
    },
    tabIndicator: {
        backgroundColor: props => props.color
    },
    swipeableViews: {
        height: "100%",
        overflow: "hidden !important",
        backgroundColor: theme.palette.background.default
    }
}));

const statusByIndex = new Map([[0, "PENDING"], [1, "IN_PROGRESS"], [2, "COMPLETED"]]);
const appointmentService = new AppointmentService();

export default function AppointmentsPage() {
    const theme = useTheme();
    const rangeRef = useRef();
    const [appointment, setAppointment] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [value, setValue] = useState(0);
    const [user, setUser] = useState('');
    const {mutate: searchAppointments, data, isLoading} = useMutation(({
                                                                           status,
                                                                           user,
                                                                           from,
                                                                           to
                                                                       }) => appointmentService.findByDateBetweenAndStatusAndUser(status, user, from, to));
    const {mutate: moveToProgress} = useMutation(appointment => appointmentService.moveToProgress(appointment), {
        onSuccess: handleSearch
    });
    const {mutate: moveToCompleted} = useMutation(appointment => appointmentService.moveToCompleted(appointment), {
        onSuccess: handleSearch
    });
    const {mutate: deleteAppointment} = useMutation(id => appointmentService.delete(id), {
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

    function handleEditClick(appointment) {
        setAppointment(appointment);
        setOpenEdit(true);
    }

    function handleDeleteClick(appointment) {
        console.log("Deleting appointment: ", appointment);
        deleteAppointment(appointment.id)
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
                    className={classes.tabHeader}
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
                <AppointmentTab index={0}
                                label="In Progress"
                                value={value}
                                rangeRef={rangeRef}
                                data={data}
                                user={user}
                                setUser={setUser}
                                isLoading={isLoading}
                                onMoveClick={handleMoveToProgress}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDeleteClick}
                                handleSearch={handleSearch}
                />
                <AppointmentTab index={1}
                                label="Completed"
                                value={value}
                                rangeRef={rangeRef}
                                data={data}
                                user={user}
                                setUser={setUser}
                                isLoading={isLoading}
                                onMoveClick={handleMoveToCompleted}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDeleteClick}
                                handleSearch={handleSearch}
                />
                <AppointmentTab index={2}
                                disableMove
                                value={value}
                                rangeRef={rangeRef}
                                data={data}
                                user={user}
                                setUser={setUser}
                                isLoading={isLoading}
                                handleSearch={handleSearch}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDeleteClick}
                />
            </SwipeableViews>
            {openEdit && <AppointmentEditDialog appointment={appointment} setAppointment={setAppointment} open={openEdit} setOpen={setOpenEdit} refetch={handleSearch} />}
        </div>
    );
}