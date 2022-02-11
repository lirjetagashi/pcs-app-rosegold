import CustomMaterialTable from "../../component/CustomMaterialTable";
import {QueryKeys} from "../../service/QueryKeys";
import {ServiceService} from "../../service/ServiceService";
import {useRef} from "react";
import {TextFieldTableCell} from "../../component/TableCells";

const serviceService = new ServiceService();

export default function ServicesAdminPage({}) {

    const errorRef = useRef();

    const columns = [
        {title: 'Name', field: 'name', editComponent: props => TextFieldTableCell(props, errorRef)},
        {title: 'Duration (Minutes)', field: 'durationInMinutes', editComponent: props => TextFieldTableCell(props, errorRef), initialEditValue: 0},
        {title: 'Price', field: 'price', editComponent: props => TextFieldTableCell(props, errorRef),initialEditValue: 0.00},
        {title: 'Enabled', type: 'boolean', field: 'enabled', initialEditValue: true}
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