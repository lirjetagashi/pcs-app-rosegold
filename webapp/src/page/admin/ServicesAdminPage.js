import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import React, {useRef} from "react";
import {SelectTableCell, TextFieldTableCell} from "../../component/TableCells";
import ServiceService from "../../service/ServiceService";
import {formatCurrency, getCurrency} from "../../utils/Utils";
import {InputAdornment} from "@material-ui/core";
import {useQuery} from "react-query";
import {CategoryService} from "../../service/CategoryService";

const serviceService = new ServiceService();
const categoryService = new CategoryService();

export default function ServicesAdminPage({}) {

    const errorRef = useRef();
    const {data: allCategories} = useQuery(QueryKeys.CATEGORIES, () => categoryService.findAll());

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
            title: 'Category',
            field: 'category',
            render: rowData => rowData.category.name,
            editComponent: props => SelectTableCell(props, errorRef, allCategories?.map(x => ({value: x, label: x.name})) || [], "id")
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