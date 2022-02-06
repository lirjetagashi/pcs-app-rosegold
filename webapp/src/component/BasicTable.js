import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import {resolveField} from "../utils/Utils";

export default function BasicTable({
                                       data,
                                       columns,
                                       tableContainerProps,
                                       headerCellProps = {style: {fontWeight: 'bold'}},
                                       rowsCellProps
                                   }) {

    return (
        <TableContainer {...tableContainerProps}>
            <Table aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((x, i) => (
                            <TableCell key={i} {...headerCellProps} align={x.align ? x.align : "left"}>{x.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && (Array.isArray(data) ? data : [data]).map((row, i) => (
                        <TableRow key={i}>
                            {columns.map(col => (
                                <TableCell {...rowsCellProps} key={col.field + i} component="th" scope="row"
                                           align={col.align ? col.align : "left"}>
                                    {col.renderValue ? col.renderValue(resolveField(row, col.field)) : resolveField(row, col.field)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}