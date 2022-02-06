import {EmployeeService} from "../../service/EmployeeService";
import {useRef} from "react";
import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import {MultipleCheckboxTableCell, TextFieldTableCell} from "../../component/TableCells";
import {ScheduleService} from "../../service/ScheduleService";
import {useQuery} from "react-query";

const employeeService = new EmployeeService();
const scheduleService = new ScheduleService();

export default function EmployeesPage() {

    const errorRef = useRef();
    const {data: allSchedules} = useQuery(QueryKeys.SCHEDULES, () => scheduleService.findAll());

    const columns = [
        {title: 'First Name', field: 'firstName', editComponent: props => TextFieldTableCell(props, errorRef)},
        {title: 'Last Name', field: 'lastName', editComponent: props => TextFieldTableCell(props, errorRef)},
        {
            title: 'Schedules',
            field: 'schedules',
            render: rowData => rowData.schedules?.map(x => x.dayOfWeek).join(", "),
            editComponent: props => MultipleCheckboxTableCell(props, allSchedules, item => `${item.dayOfWeek} (${item.startTime} - ${item.endTime})`)
        },
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