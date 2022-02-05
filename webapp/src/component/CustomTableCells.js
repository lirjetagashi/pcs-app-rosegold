import ValidTextField from "./ValidTextField";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {KeyboardTimePicker} from "@material-ui/pickers";

export const TextFieldTableCell = (props, errorRef) =>
    <ValidTextField fullWidth label={props.columnDef.title} value={props.value} onChange={e => props.onChange(e.target.value)}
                    error={errorRef.current && errorRef.current[props.columnDef.field]}
    />

export const ChoiceBoxTableCell = (props, errorRef, menuItems) => {

    const hasError = !!(errorRef.current && errorRef.current[props.columnDef.field])

    return <FormControl fullWidth variant="standard" sx={{m: 1, minWidth: 120}} error={hasError}>
        <InputLabel id="select-standard-label">{props.columnDef.title}</InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            label={props.columnDef.title}
        >
            {menuItems.map((item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
        </Select>
        <FormHelperText>{errorRef.current && errorRef.current[props.columnDef.field]?.message}</FormHelperText>
    </FormControl>
}

export const TimeTableCell = (props) => {
    const value = typeof props.value === "string" ?
        new Date("01/01/1970 " + props.value) : props.value;

    return <KeyboardTimePicker
        label={props.columnDef.title}
        placeholder="08:00 AM"
        minutesStep={5}
        mask="__:__ _M"
        value={value}
        onChange={date => props.onChange(date)}
    />
}