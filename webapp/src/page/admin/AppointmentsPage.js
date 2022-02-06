import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../../component/TabPanel";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
}));

export default function AppointmentsPage() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

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
                >
                    <Tab label="Pending" {...a11yProps(0)} />
                    <Tab label="In Progress" {...a11yProps(1)} />
                    <Tab label="Completed" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={setValue}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {/*<GridListTiles></GridListTiles>*/}
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