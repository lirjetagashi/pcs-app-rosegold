import {useRef} from "react";
import CustomMaterialTable from "../component/CustomMaterialTable";
import {QueryKeys} from "../service/QueryKeys";
import {ScheduleService} from "../service/ScheduleService";
import {ChoiceBoxTableCell, TimeTableCell} from "../component/CustomTableCells";

const menuItems = [
    {value: "MONDAY", label: "Monday"},
    {value: "TUESDAY", label: "Tuesday"},
    {value: "WEDNESDAY", label: "Wednesday"},
    {value: "THURSDAY", label: "Thursday"},
    {value: "FRIDAY", label: "Friday"},
    {value: "SATURDAY", label: "Saturday"},
    {value: "SUNDAY", label: "Sunday"},
];
const initialStartTime = "08:00";
const initialEndTime = "16:00";
const scheduleService = new ScheduleService();

export default function SchedulesPage({}) {

    const errorRef = useRef();

    const columns = [
        {title: 'Day of week', field: 'dayOfWeek', initialEditValue: "MONDAY", editComponent: props => ChoiceBoxTableCell(props, errorRef, menuItems)},
        {title: 'Start time', field: 'startTime', initialEditValue: initialStartTime, editComponent: props => TimeTableCell(props, errorRef)},
        {title: 'End time', field: 'endTime', initialEditValue: initialEndTime, editComponent: props => TimeTableCell(props, errorRef)}
    ];

    return (
        <CustomMaterialTable
            title="Manage Schedules"
            columns={columns}
            service={scheduleService}
            queryKey={QueryKeys.SCHEDULES}
            errorRef={errorRef}
        />
    )

}