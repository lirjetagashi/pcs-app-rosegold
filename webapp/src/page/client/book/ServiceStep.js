import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ServiceTile from "./ServiceTile";
import {CategoryService} from "../../../service/CategoryService";
import {useQuery} from "react-query";
import {QueryKeys} from "../../../service/QueryKeys";
import Grid from "@material-ui/core/Grid";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Grid container
              spacing={2}
              role="tabpanel"
              hidden={value !== index}
              id={`vertical-tabpanel-${index}`}
              aria-labelledby={`vertical-tab-${index}`}
              style={{margin: 0, width: "100%"}}
              {...other}
        >
            {value === index && children}
        </Grid>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: "100%",
    },
    tabs: {
        flexGrow: 0,
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabPanel: {
        flexGrow: 1,
        margin: theme.spacing(1)
    }
}));

const categoryService = new CategoryService();

export default function ServiceStep({onAdd, selectedServices}) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const {data} = useQuery(QueryKeys.CATEGORIES, () => categoryService.findAll())

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {data?.map((category, i) => <Tab key={i} label={category.name} {...a11yProps(i)} />)}
            </Tabs>
            <div className={classes.tabPanel}>
                {data?.map((category, i) =>
                    <TabPanel key={i} value={value} index={i}>
                        {category?.services.map(service =>
                            <Grid key={service.id} item>
                                <ServiceTile category={category} service={service} onAdd={onAdd} disabled={!!selectedServices.find(x => x.id === service.id)}/>
                            </Grid>
                        )}
                    </TabPanel>
                )}
            </div>
        </div>
    );
}
