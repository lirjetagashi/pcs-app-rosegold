import BasicTable from "./BasicTable";
import {ImageListItem, ImageListItemBar} from '@material-ui/core'
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import ImageList from "@material-ui/core/ImageList";
import {resolveField} from "../utils/Utils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: "100%",
        padding: theme.spacing(1)
    },
    gridListTile: {
        minWidth: '25em',
        maxWidth: '30em',
        '& .MuiImageListItem-item': {
            borderStyle: "solid",
            borderRadius: "5px",
            borderWidth: "1px",
            borderColor: theme.palette.text.primary,
            cursor: "pointer",
            transition: 'transform .2s',
            padding: theme.spacing(2, 0, 0, 1),
            '&:hover': {
                borderWidth: "2px",
                borderColor: theme.palette.primary.main,
                transform: 'scale(1.05)'
            }
        },
    },
    disabledTile: {
        opacity: 0.6,
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
        transition: 'transform .2s',
        paddingLeft: '0.6em',
    },
    titleBar: {
        background: 'linear-gradient(90deg, rgba(103,96,150,1) 0%, rgba(78,159,181,1) 50%)',
    }
}));

export default function GridListTiles({tileColumns, tileTitle, data, pathToColumns, loading, onTileClick}) {

    const classes = useStyles();

    const finalData = loading ? new Array(6).fill(undefined) : data || [];

    return (
        <ImageList rowHeight={250} gap={40} className={classes.root}>
            {finalData.map((x, i) => x ?
                (<ImageListItem key={i} className={classes.gridListTile} onClick={() => onTileClick(x)}>
                    <BasicTable data={resolveField(x, pathToColumns, [])} columns={tileColumns}
                                tableContainerProps={{style: {marginTop: "2.4em"}}}
                                headerCellProps={{style: {fontSize: '0.6rem', padding: 1}}}
                                rowsCellProps={{style: {fontSize: '0.6rem', padding: 1}}}
                    />
                    <ImageListItemBar
                        title={tileTitle((field) => resolveField(x, field, ''))}
                        position="top"
                        className={classes.titleBar}
                    />
                </ImageListItem>)
                :
                (<Box key={i} maxWidth={"30em"} maxHeight={250} margin={2}>
                    <Skeleton width="60%"/>
                    <Skeleton/>
                    <Skeleton variant="rect" height={"10em"}/>
                </Box>)
            )}
        </ImageList>
    );
}