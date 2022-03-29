import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {formatCurrency} from "../../../utils/Utils";

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

export default function ServiceTile({category, service, onAdd, disabled, order, hideAddButton}) {

    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <div>
                <Typography className={classes.title} variant="h5" component="h2">{service.name}</Typography>
                <Typography className={classes.price} variant="body1" component="span">{formatCurrency(service.price)}</Typography>
                <Typography style={{clear: "both"}} color="textSecondary" >{service.durationInMinutes} min.</Typography>
            </div>
            <div>
                {hideAddButton ?(<div></div>) :
                                (<Button variant="outlined" color="secondary" style={{float: "right"}} onClick={() => onAdd(category, service)} disabled={disabled}>{order || "Add"}</Button>)}

            </div>
        </Card>
    );
}