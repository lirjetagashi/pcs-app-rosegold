import TabPanel from "./TabPanel";
import {InputAdornment, Paper, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import DateFilter from "./DateFilter";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AppointmentList from "./AppointmentList";
import SimpleBar from "simplebar-react";
import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    filter: {
        padding: theme.spacing(2),
        "& > *": {
            marginRight: theme.spacing(3)
        }
    },
    searchButton: {
        marginLeft: "auto"
    }
}));

export default function AppointmentTab({index, label, value, data, isLoading, handleMove, handleSearch, rangeRef, user, setUser, disableMove = false}) {

    const theme = useTheme();
    const classes = useStyles();

    return (
        <SimpleBar style={{ maxHeight: "100%" }} autoHide={false}>
            <TabPanel value={value} index={index} dir={theme.direction}>
                <Paper variant="outlined" style={{marginBottom: theme.spacing(2)}}>
                    <Box display="flex" className={classes.filter} flexWrap="wrap">
                        <TextField value={user} onChange={(e) => setUser(e.target.value)} label="User" variant="outlined" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon/>
                                </InputAdornment>
                            ),
                        }}/>
                        <DateFilter rangeRef={rangeRef}/>
                        <Button className={classes.searchButton} variant="outlined" color="primary" onClick={handleSearch}
                                startIcon={<SearchIcon/>}>Search</Button>
                    </Box>
                </Paper>
                <Paper variant="outlined">
                    <AppointmentList
                        data={data}
                        loading={isLoading}
                        onMoveClick={handleMove}
                        moveLabel={label}
                        disableMove={disableMove}
                    />
                </Paper>
            </TabPanel>
        </SimpleBar>
    );
}