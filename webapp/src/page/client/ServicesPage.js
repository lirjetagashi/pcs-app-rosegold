import {CategoryService} from "../../service/CategoryService";
import {useQuery} from "react-query";
import {QueryKeys} from "../../service/QueryKeys";

export default function ServicesPage({}) {
    const categoryService = new CategoryService();

    const {data} = useQuery(QueryKeys.CATEGORIES, () => categoryService.findAll());

    return (
        <div>

        </div>
    );
}