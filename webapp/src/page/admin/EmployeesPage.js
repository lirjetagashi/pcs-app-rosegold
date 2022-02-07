import {EmployeeService} from "../../service/EmployeeService";
import {useRef} from "react";
import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import {MultipleCheckboxTableCell, TextFieldTableCell} from "../../component/TableCells";
import {ScheduleService} from "../../service/ScheduleService";
import {useQuery} from "react-query";
import {SkillService} from "../../service/SkillService";

const employeeService = new EmployeeService();
const scheduleService = new ScheduleService();
const skillService = new SkillService();

export default function EmployeesPage() {

    const errorRef = useRef();
    const {data: allSchedules} = useQuery(QueryKeys.SCHEDULES, () => scheduleService.findAll());
    const {data: allSkills} = useQuery(QueryKeys.SKILLS, () => skillService.findAll());

    const columns = [
        {title: 'First Name', field: 'firstName', editComponent: props => TextFieldTableCell(props, errorRef)},
        {title: 'Last Name', field: 'lastName', editComponent: props => TextFieldTableCell(props, errorRef)},
        {
            title: 'Schedules',
            field: 'schedules',
            render: rowData => rowData.schedules?.map(x => x.dayOfWeek).join(", "),
            editComponent: props => MultipleCheckboxTableCell(props, allSchedules, item => `${item.dayOfWeek} (${item.startTime} - ${item.endTime})`)
        },
        {
            title: 'Skills',
            field: 'skills',
            render: rowData => rowData.skills?.map(x => x.name).join(", "),
            editComponent: props => MultipleCheckboxTableCell(props, allSkills, item => item.name)
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