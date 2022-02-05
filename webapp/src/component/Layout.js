import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Link as RouterLink, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "../page/HomePage";
import BookPage from "../page/BookPage";
import SignInPage from "../page/SignInPage";
import SignUpPage from "../page/SignUpPage";
import {IconButton, Link, Menu, MenuItem} from "@material-ui/core";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import useUser from "../hooks/useUser";
import Avatar from "@material-ui/core/Avatar";
import EmployeesPage from "../page/EmployeesPage";
import SkillsPage from "../page/SkillsPage";
import SchedulesPage from "../page/SchedulesPage";
import ServicesPage from "../page/ServicesPage";
import ServicesAdminPage from "../page/ServicesAdminPage";

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const isAdmin = user && user.role === "ADMIN";

    function handleSignOut() {
        localStorage.removeItem("user");
        setUser(null);
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
                                <Link variant="button" color="textPrimary" to="/bookings" component={RouterLink}
                                      className={classes.link}>
                                    Bookings
                                </Link>
                                <Link variant="button" color="textPrimary" to="/services-admin" component={RouterLink}
                                      className={classes.link}>
                                    Services
                                </Link>
                                <Link variant="button" color="textPrimary" to="/skills" component={RouterLink}
                                      className={classes.link}>
                                    Skills
                                </Link>
                                <Link variant="button" color="textPrimary" to="/schedules" component={RouterLink}
                                      className={classes.link}>
                                    Schedules
                                </Link>
                                <Link variant="button" color="textPrimary" to="/employee" component={RouterLink}
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
                                onClick={event => setAnchorEl(event.currentTarget)}
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
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" exact element={<Navigate replace to={"/home"}/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/book" element={<BookPage/>}/>
                <Route path="/employee" element={<EmployeesPage/>}/>
                <Route path="/skills" element={<SkillsPage/>}/>
                <Route path="/schedules" element={<SchedulesPage/>}/>
                <Route path="/services" element={<ServicesPage/>}/>
                <Route path="/services-admin" element={<ServicesAdminPage/>}/>
                <Route path="/sign-in" element={<SignInPage/>}/>
                <Route path="/sign-up" element={<SignUpPage/>}/>
            </Routes>
            {!isAdmin && <Container maxWidth="md" component="footer" className={classes.footer}>
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
            </Container>}
        </>
    );
}