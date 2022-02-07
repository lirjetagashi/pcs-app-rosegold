import {useTheme} from "@material-ui/core";
import {useMutation, useQuery} from "react-query";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "@material-table/core";

export default function CustomMaterialTable({title, queryKey, service, columns, errorRef}) {

    const theme = useTheme();

    const {isLoading, data, refetch} = useQuery(queryKey, () => service.findAll());
    const {mutateAsync: createRecord} = useMutation(payload => service.create(payload),
        {
            onSuccess: onSuccessReset,
            onError: e => errorRef.current = e
        });
    const {mutateAsync: updateRecord} = useMutation(payload => service.update(payload),
        {
            onSuccess: onSuccessReset,
            onError: e => errorRef.current = e
        })

    function onSuccessReset () {
        refetch();
        resetErrors();
    }

    function resetErrors() {
        errorRef.current = null;
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
                    backgroundColor: 'transparent'
                },
                paginationType: "stepped"
            }}
            editable={{
                onRowAdd: createRecord,
                onRowUpdate: updateRecord,
                onRowUpdateCancelled: resetErrors,
                onRowAddCancelled: resetErrors
            }}
        />
    )
}