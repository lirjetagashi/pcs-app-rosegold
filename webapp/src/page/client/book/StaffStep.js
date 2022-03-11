import Grid from "@material-ui/core/Grid";
import React from "react";
import StaffServiceTile from "./StaffServiceTile";
import {EmployeeService} from "../../../service/EmployeeService";
import {useQuery} from "react-query";
import {QueryKeys} from "../../../service/QueryKeys";
import {makeStyles} from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        "& > :not(:last-child)": {
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(2)
        }
    },
    scrollBar: {
        height: "100%",
        width: "100%",
    },
}))

const employeeService = new EmployeeService();

export default function StaffStep({appointmentLines, onStaffChange}) {

    const classes = useStyles();

    const {data} = useQuery(QueryKeys.EMPLOYEES, () => employeeService.findAll());

    return (
        <SimpleBar className={classes.scrollBar} >
            <Box display="flex" flexWrap="wrap" className={classes.root}>
                {appointmentLines.map((al, i) => (
                    <div key={i}>
                        <StaffServiceTile appointmentLine={al} employees={data} onStaffChange={onStaffChange}/>
                    </div>
                ))}
            </Box>
        </SimpleBar>
    )
}

