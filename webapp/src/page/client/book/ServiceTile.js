import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {format, parseISO} from "date-fns";
import {SuccessLoadingButton} from "../../../component/LoadingButton";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 350,
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey["700"] : theme.palette.grey["100"],
        padding: theme.spacing(1)
    },
    title: {
        float: "left",
        marginRight: theme.spacing(1)
    },
    price: {
        float: "right",
        display: "inline-block",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(-1),
        border: "1px solid " + theme.palette.divider,
        borderBottomLeftRadius: "30px",
        borderTop: 0,
        borderRight: 0,
    }
}));

export default function ServiceTile({}) {

    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <div>
                <Typography className={classes.title} variant="h5" component="h2">Fenirim i brendshem</Typography>
                <Typography className={classes.price} variant="body1" component="span">$40 CAD</Typography>
                <Typography style={{clear: "both"}} color="textSecondary" >20 min</Typography>
            </div>
            <div>
                <Button variant="outlined" color="secondary" style={{float: "right"}}>Add</Button>
            </div>
        </Card>
    );
}