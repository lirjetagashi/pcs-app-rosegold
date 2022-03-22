import {Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, useMediaQuery} from "@material-ui/core";
import React, {useRef} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import MaterialTable from "@material-table/core";
import {formatCurrency, formatName, formatter, getCurrency} from "../utils/Utils";
import {useMutation, useQuery} from "react-query";
import {QueryKeys} from "../service/QueryKeys";
import {EmployeeService} from "../service/EmployeeService";
import ServiceService from "../service/ServiceService";
import {AppointmentService} from "../service/AppointmentService";
import LoadingButton, {SuccessLoadingButton} from "./LoadingButton";
import {SelectTableCell, TextFieldTableCell} from "./TableCells";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SaveIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import {AppointmentLineService} from "../service/AppointmentLineService";

const employeeService = new EmployeeService();
const serviceService = new ServiceService();
const appointmentService = new AppointmentService();
const appointmentLineService = new AppointmentLineService();

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2)
    },
    divider: {
        backgroundColor: theme.palette.primary.main
    },
    dialogTitle: {
        backgroundColor: theme.palette.background.paper,
    },
    dialogContent: {
        backgroundColor: theme.palette.background.default,
        overflowY: "hidden",
    }
}))

export default function AppointmentEditDialog({appointment, setAppointment, open, setOpen, refetch}) {

    const errorRef = useRef();
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {data: services} = useQuery(QueryKeys.SERVICES, () => serviceService.findAll());
    const {data: employees} = useQuery(QueryKeys.EMPLOYEES, () => employeeService.findAll());
    const {mutateAsync: validateAppointment} = useMutation(appointment => appointmentLineService.validateOnCreate(appointment), {
        onError: e => errorRef.current = e
    });
    const {mutateAsync: updateAppointment, isLoading} = useMutation(appointment => appointmentService.update(appointment), {
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: e => errorRef.current = e
    });
    const columns = [
        {
            title: 'Service',
            field: 'service',
            render: rowData => rowData.service?.name,
            editComponent: props => SelectTableCell(props, errorRef, services?.map(x => ({value: x, label: x.name})) || [], "id")
        },
        {
            title: 'Employee',
            field: 'employee',
            render: rowData => formatName(rowData.employee.firstName, rowData.employee.lastName),
            editComponent: props => SelectTableCell(props, errorRef, employees?.map(x => ({value: x, label: x.firstName})) || [], "id")
        },
        {
            title: 'Price',
            field: 'service.price',
            render: rowData => formatCurrency(rowData.service.price),
            editComponent: props => TextFieldTableCell(props, errorRef, "number", {
                InputProps: {
                    readOnly: true,
                    startAdornment: <InputAdornment position="start">{getCurrency()}</InputAdornment>
                }
            })
        },
        {
            title: 'Duration',
            field: 'service.durationInMinutes',
            render: rowData => `${rowData.service.durationInMinutes} min.`,
            editComponent: props => TextFieldTableCell(props, errorRef, "number", {
                InputProps: {
                    readOnly: true,
                    endAdornment: <InputAdornment position="end">min.</InputAdornment>
                }
            })
        },
    ];

    function handleSave() {
        return updateAppointment(appointment);
    }

    function handleUpdate(rowData) {
        return new Promise(resolve => {
            setAppointment(prev => ({
                ...prev,
                appointmentLines: prev.appointmentLines.map(line => {
                    if (line.id === rowData.id) {
                        return rowData;
                    }

                    return line;
                })
            }));

            resolve();
        })
    }

    function handleAdd(rowData) {
        const appointmentLine = {...rowData, order: appointment?.appointmentLines?.length || 1}
        return validateAppointment(appointmentLine)
            .then(() => setAppointment(prev => ({
                ...prev,
                appointmentLines: [...prev.appointmentLines, appointmentLine]
            })));
    }

    function handleDelete(rowData) {
        return new Promise(resolve => {
            setAppointment(prev => ({...prev, appointmentLines: prev.appointmentLines.filter(x => x.id !== rowData.id)}));
            resolve()
        })
    }

    function resetErrors() {
        errorRef.current = null;
    }

    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            fullScreen={fullScreen}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title" className={classes.dialogTitle}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <EditIcon className={classes.icon}/>
                    Edit Appointment
                </Box>
            </DialogTitle>
            <Divider className={classes.divider}/>
            <DialogContent className={classes.dialogContent}>
                <MaterialTable
                    style={{
                        margin: theme.spacing(2)
                    }}
                    isLoading={isLoading}
                    localization={{
                        header: {
                            actions: ''
                        }
                    }}
                    title={
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <PersonIcon fontSize={"large"} color={"primary"}/>
                            <Typography
                                variant={"h5"}
                                style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    padding: "0.5em",
                                }}
                            >
                                {`${appointment.user.firstName} ${appointment.user.lastName}`}
                            </Typography>
                        </Box>
                    }
                    columns={columns}
                    data={appointment.appointmentLines}
                    options={{
                        search: false,
                        paging: false,
                        actionsColumnIndex: -1,
                        minBodyHeight: "50vh",
                        headerStyle: {
                            backgroundColor: 'transparent',
                        }
                    }}
                    editable={{
                        onRowAdd: handleAdd,
                        onRowAddCancelled: resetErrors,
                        onRowUpdate: handleUpdate,
                        onRowDelete: handleDelete
                    }}
                />
            </DialogContent>
            <DialogActions style={{backgroundColor: theme.palette.background.default, padding: theme.spacing(2, 4)}}>
                <LoadingButton variant="outlined" color={"primary"} autoFocus onClick={() => setOpen(false)} icon={<CancelIcon/>}>
                    Cancel
                </LoadingButton>
                <SuccessLoadingButton variant="outlined" onClick={handleSave} autoFocus loading={isLoading} style={{marginLeft: theme.spacing(2)}}
                                      icon={<SaveIcon/>}>
                    Save
                </SuccessLoadingButton>
            </DialogActions>
        </Dialog>
    );
}