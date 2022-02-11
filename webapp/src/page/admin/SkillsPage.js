import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import {SkillService} from "../../service/SkillService";
import {useRef} from "react";
import {MultipleCheckboxTableCell, TextFieldTableCell} from "../../component/TableCells";

const skillService = new SkillService();

export default function SkillsPage({}) {

    const errorRef = useRef();

    const columns = [
        {title: 'Name', field: 'name', editComponent: props => TextFieldTableCell(props, errorRef)},
    ];

    return (
        <CustomMaterialTable
            title="Manage Skills"
            columns={columns}
            service={skillService}
            queryKey={QueryKeys.SKILLS}
            errorRef={errorRef}
        />
    );
}