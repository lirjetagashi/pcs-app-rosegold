import Grid from "@material-ui/core/Grid";
import React from "react";
import StaffServiceTile from "./StaffServiceTile";
import {EmployeeService} from "../../../service/EmployeeService";
import {useQuery} from "react-query";
import {QueryKeys} from "../../../service/QueryKeys";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))

const employeeService = new EmployeeService();

export default function StaffStep({appointmentLines, onStaffChange}) {

    const classes = useStyles();

    const {data} = useQuery(QueryKeys.EMPLOYEES, () => employeeService.findAll());

    return (
        <Grid container spacing={2} className={classes.root}>
            {appointmentLines.map((al, i) => (
                <Grid key={i} item>
                    <StaffServiceTile appointmentLine={al} employees={data} onStaffChange={onStaffChange}/>
                </Grid>
            ))}
        </Grid>
    )
}

