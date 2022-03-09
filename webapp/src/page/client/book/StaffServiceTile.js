import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {formatCurrency, formatName} from "../../../utils/Utils";
import {MenuItem, Select, TextField} from "@material-ui/core";
import {defaultStaff} from "./BookPage";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 350,
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey["700"] : theme.palette.grey["100"],
        padding: theme.spacing(1)
    },
    title: {
        float: "left",
        marginRight: theme.spacing(1)
    },
    price: {
        float: "right",
        display: "inline-block",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(-1),
        border: "1px solid " + theme.palette.divider,
        borderBottomLeftRadius: "30px",
        borderTop: 0,
        borderRight: 0,
    }
}));

export default function StaffServiceTile({appointmentLine, employees, onStaffChange}) {

    const classes = useStyles();
    const service = appointmentLine.service;
    const employeesWithServiceSkill = employees?.filter(e => e.categories.map(c => c.id).includes(service.category.id)) || [];
    const selectedEmployee = employeesWithServiceSkill.find(e => e.id === appointmentLine.employee.id) || defaultStaff;

    return (
        <Card className={classes.root} variant="outlined">
            <div>
                <Typography className={classes.title} variant="h5" component="h2">{service.name}</Typography>
                <Typography className={classes.price} variant="body1" component="span">{formatCurrency(service.price)}</Typography>
                <Typography style={{clear: "both"}} color="textSecondary" >{service.durationInMinutes} min.</Typography>
            </div>
            <div>
                <Select
                    id="select"
                    fullWidth
                    value={selectedEmployee}
                    onChange={e => onStaffChange(appointmentLine, e.target.value)}
                    label={"Select Staff"}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}
                >
                    {[...employeesWithServiceSkill, defaultStaff].map((e) => <MenuItem key={e.id} value={e}>{formatName(e.firstName, e.lastName)}</MenuItem>)}
                </Select>
            </div>
        </Card>
    );
}