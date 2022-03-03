import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import {useRef} from "react";
import {TextFieldTableCell} from "../../component/TableCells";
import {CategoryService} from "../../service/CategoryService";

const categoriesService = new CategoryService();

export default function CategoriesPage({}) {

    const errorRef = useRef();

    const columns = [
        {title: 'Name', field: 'name', editComponent: props => TextFieldTableCell(props, errorRef)},
    ];

    return (
        <CustomMaterialTable
            title="Manage Categories"
            columns={columns}
            service={categoriesService}
            queryKey={QueryKeys.CATEGORIES}
            errorRef={errorRef}
        />
    );
} 