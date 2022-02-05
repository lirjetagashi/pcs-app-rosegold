import {EmployeeService} from "../service/EmployeeService";
import {useRef} from "react";
import CustomMaterialTable from "../component/CustomMaterialTable";
import {QueryKeys} from "../service/QueryKeys";
import {TextFieldTableCell} from "../component/CustomTableCells";

const employeeService = new EmployeeService();

export default function EmployeesPage() {

    const errorRef = useRef();

    const columns = [
        {title: 'First Name', field: 'firstName', editComponent: props => TextFieldTableCell(props, errorRef)},
        {title: 'Last Name', field: 'lastName', editComponent: props => TextFieldTableCell(props, errorRef)},
        {title: 'Enabled', type: 'boolean', field: 'enabled', initialEditValue: true}
    ];

    return (
        <CustomMaterialTable
            title="Manage Employees"
            columns={columns}
            service={employeeService}
            queryKey={QueryKeys.EMPLOYEES}
            errorRef={errorRef}
        />
    )

}