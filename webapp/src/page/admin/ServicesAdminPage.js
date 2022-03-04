import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import React, {useRef} from "react";
import {TextFieldTableCell} from "../../component/TableCells";
import ServiceService from "../../service/ServiceService";
import {formatCurrency, getCurrency} from "../../utils/Utils";
import {InputAdornment} from "@material-ui/core";

const serviceService = new ServiceService();

export default function ServicesAdminPage({}) {

    const errorRef = useRef();

    const columns = [
        {
            title: 'Name',
            field: 'name',
            editComponent: props => TextFieldTableCell(props, errorRef)
        },
        {
            title: 'Duration (Minutes)',
            field: 'durationInMinutes',
            render: rowData => `${rowData.durationInMinutes} min.`,
            editComponent: props => TextFieldTableCell(props, errorRef, "number", {
                InputProps: {
                    endAdornment: <InputAdornment position="end">min.</InputAdornment>
                }
            }),
            initialEditValue: 0
        },
        {
            title: 'Price',
            field: 'price',
            render: rowData => formatCurrency(rowData.price),
            editComponent: props => TextFieldTableCell(props, errorRef, "number", {
                InputProps: {
                    startAdornment: <InputAdornment position="start">{getCurrency()}</InputAdornment>
                }
            }),
            initialEditValue: 0.00
        },
        {
            title: 'Active',
            type: 'boolean',
            field: 'enabled',
            initialEditValue: true
        }
    ];

    return (
        <CustomMaterialTable
            title="Manage Services"
            columns={columns}
            service={serviceService}
            queryKey={QueryKeys.SERVICES}
            errorRef={errorRef}
        />
    );
} 