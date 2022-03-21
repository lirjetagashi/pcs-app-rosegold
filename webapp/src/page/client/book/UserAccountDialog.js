import Button from "@material-ui/core/Button";
import React from "react";
import {useTheme} from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery} from "@material-ui/core";
import SignInPage from "../../SignInPage";

export default function UserAccountDialog({open, setOpen}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
                <SignInPage/>
            {/*<DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>*/}
        </Dialog>
    );
}