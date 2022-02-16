import ValidTextField from "./ValidTextField";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";
import {KeyboardTimePicker} from "@material-ui/pickers";
import {isValid} from "date-fns";
import {useState} from "react";

export const TextFieldTableCell = (props, errorRef) =>
    <ValidTextField fullWidth label={props.columnDef.title} value={props.value} onChange={e => props.onChange(e.target.value)}
                    error={errorRef.current && errorRef.current[props.columnDef.field]}
    />

export const SelectTableCell = (props, errorRef, menuItems) => {

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

export const TimeTableCell = (props, errorRef) => {
    const value = typeof props.value === "string" ? new Date("01/01/1970 " + props.value) : props.value;
    const [dateFormatError, setDateFormatError] = useState("");

    function handleDateChange(value) {
        if (!isValid(value)) {
            setDateFormatError("Invalid date")
        } else {
            setDateFormatError("")
        }

        props.onChange(value);
    }

    const error = errorRef.current && errorRef.current[props.columnDef.field];

    return <KeyboardTimePicker
        label={props.columnDef.title}
        placeholder="08:00 AM"
        required
        minutesStep={5}
        mask="__:__ _M"
        value={value}
        onChange={handleDateChange}
        error={!!error || !!dateFormatError}
        helperText={error?.message || dateFormatError}
    />
}

export const MultipleCheckboxTableCell = (props, allItems, renderLabel) => {

    const values = props.value || [];
    const valueIds = values.map(x => x.id);

    return (
        <FormGroup row>
            {allItems.map(item => (
                <FormControlLabel
                    key={item.id}
                    control={
                        <Checkbox
                            key={item.id}
                            checked={valueIds.includes(item.id)}
                            onChange={() => {
                                const newValues = valueIds.includes(item.id) ? values.filter(x => x.id !== item.id) : [...values, item];
                                props.onChange(newValues);
                            }}
                            name={props.columnDef.title}
                            color="secondary"
                        />
                    }
                    label={renderLabel(item)}
                />
            ))}
        </FormGroup>
    )
}