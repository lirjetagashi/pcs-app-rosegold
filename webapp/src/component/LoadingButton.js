import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";
import React from "react";

export default function LoadingButton(props) {

    const {loading, children, icon} = props;

    return (
        <Button {...{...props, loading: undefined, icon: undefined}} startIcon={loading ? <CircularProgress size={'1em'}/> : icon} disabled={loading}>{children}</Button>
    );
}