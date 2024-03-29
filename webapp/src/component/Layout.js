import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Link as RouterLink, Routes, useNavigate} from "react-router-dom";
import {IconButton, Link, Menu, MenuItem} from "@material-ui/core";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import useUser from "../hooks/useUser";
import Avatar from "@material-ui/core/Avatar";
import AppRoutes from "../routes/Routes";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                rosegold.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        background: theme.palette.primary.mainGradient,
        color: "BLACK",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        fontFamily: "monospace",
        fontWeight: "bold",
        color: "wheat",
        textDecoration: "none",
    },
    link: {
        color: "inherit",
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    smallAvatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: "white",
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const footers = [
    {
        title: 'Company',
        description: ['Team', 'About us', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Booking feature', 'Admin feature', 'Team feature'],
    },
];

export default function Layout() {

    const classes = useStyles();
    const theme = useTheme();
    const toggleDarkMode = useDarkMode();
    const {user, setUser} = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isAdmin = user && user.role === "ADMIN";

    function handleIconClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
       setAnchorEl(null)
    };

    function handleSignOut() {
        localStorage.removeItem("user");
        setUser(null);
        handleMenuClose();
        navigate("/sign-in");
    }

    return (
        <>
            <CssBaseline/>
            <AppBar position="static" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}
                                component={RouterLink} to={"/home"}>
                        RoseGold
                    </Typography>
                    <nav>
                        { isAdmin ?
                            <>
                                <Link variant="button" color="textPrimary" to="/admin/appointments" component={RouterLink}
                                      className={classes.link}>
                                    Appointments
                                </Link>
                                <Link variant="button" color="textPrimary" to="/admin/services" component={RouterLink}
                                      className={classes.link}>
                                    Services
                                </Link>
                                <Link variant="button" color="textPrimary" to="/admin/categories" component={RouterLink}
                                      className={classes.link}>
                                    Categories
                                </Link>
                                <Link variant="button" color="textPrimary" to="/admin/schedules" component={RouterLink}
                                      className={classes.link}>
                                    Schedules
                                </Link>
                                <Link variant="button" color="textPrimary" to="/admin/employee" component={RouterLink}
                                      className={classes.link}>
                                    Employees
                                </Link>
                            </> :
                            <>
                                <Link variant="button" color="textPrimary" to="/home" component={RouterLink}
                                      className={classes.link}>
                                    Home
                                </Link>
                                <Link variant="button" color="textPrimary" to="/services" component={RouterLink}
                                      className={classes.link}>
                                    Services
                                </Link>
                                <Link variant="button" color="textPrimary" to="/book" component={RouterLink}
                                      className={classes.link}>
                                    Book
                                </Link>
                            </>
                        }
                        <IconButton color="inherit" onClick={toggleDarkMode}>
                            {theme.palette.type === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
                        </IconButton>
                    </nav>
                    {!user ?
                        <Button color="primary" variant="contained" className={classes.link} component={RouterLink}
                                to={"/sign-in"}>
                            Sign In
                        </Button> :
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleIconClick}
                                color="inherit"
                            >
                                <Avatar className={classes.smallAvatar}>{user.firstName.charAt(0)}</Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Routes>
                {AppRoutes}
            </Routes>
            {/*{!isAdmin && <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="textSecondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>}*/}
        </>
    );
}