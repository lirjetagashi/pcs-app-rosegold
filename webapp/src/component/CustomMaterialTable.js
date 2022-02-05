import {useTheme} from "@material-ui/core";
import {useMutation, useQuery} from "react-query";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";

export default function CustomMaterialTable({title, queryKey, service, columns, errorRef}) {

    const theme = useTheme();

    const {isLoading, data, refetch} = useQuery(queryKey, () => service.findAll());
    const {
        mutateAsync: create,
        reset: resetCreateErrors
    } = useMutation(payload => service.create(payload),
        {
            onSuccess: refetch,
            onError: e => errorRef.current = e
        });

    function resetErrors() {
        errorRef.current = null;
        resetCreateErrors()
    }

    function updateRow(emp) {
        return service.update(emp)
            .then(x => {
                errorRef.current = null;
                refetch();
                return x;
            }).catch(e => {
                errorRef.current = e;
                throw e;
            })
    }

    return (
        <MaterialTable
            style={{
                margin: '2em 8em'
            }}
            isLoading={isLoading}
            localization={{
                header: {
                    actions: ''
                }
            }}
            title={
                <Typography
                    variant={"h4"}
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "0.5em",
                    }}
                >
                    {title}
                </Typography>
            }
            columns={columns}
            data={data}
            options={{
                actionsColumnIndex: -1,
                pageSize: 10,
                headerStyle: {
                    backgroundColor: theme.palette.secondary.main,
                    color: "black",
                    "&:hover": {}
                },
                paginationType: "stepped"
            }}
            editable={{
                onRowAdd: create,
                onRowUpdate: updateRow,
                onRowUpdateCancelled: resetErrors,
                onRowAddCancelled: resetErrors
            }}
        />
    )
}