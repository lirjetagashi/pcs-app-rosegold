import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import {CategoryService} from "../../service/CategoryService";
import {useRef} from "react";
import {MultipleCheckboxTableCell, TextFieldTableCell} from "../../component/TableCells";

const categoryService = new CategoryService();

export default function CategoriesPage({}) {

    const errorRef = useRef();

    const columns = [
        {title: 'Name', field: 'name', editComponent: props => TextFieldTableCell(props, errorRef)},
    ];

    return (
        <CustomMaterialTable
            title="Manage Categories"
            columns={columns}
            service={categoryService}
            queryKey={QueryKeys.CATEGORIES}
            errorRef={errorRef}
        />
    );
}