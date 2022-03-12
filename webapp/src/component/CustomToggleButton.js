import {alpha, withStyles} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";

const CustomToggleButton = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0.6),
        color: theme.palette.primary.main,
        borderColor: alpha(theme.palette.primary.main, 0.5),
        "&.MuiToggleButton-root.Mui-selected": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.main
        },
        "&:hover": {
            borderColor: theme.palette.primary.main,
        }
    }
}))(ToggleButton);

export default CustomToggleButton;
