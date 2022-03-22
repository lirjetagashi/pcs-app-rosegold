import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import {QueryKeys} from "../service/QueryKeys";
import {UserService} from "../service/UserService";
import useUser from "../hooks/useUser";
import ValidTextField from "../component/ValidTextField";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const userService = new UserService();

export default function SignInPage({onSuccess, hideSignUpLink}) {
    const classes = useStyles();
    const {setUser} = useUser();
    const navigate = useNavigate();
    const [userAccount, setUserAccount] = useState({
        email: '',
        password: ''
    });

    // useMutation when we need to use it for example when clicking a button
    const {mutate, isLoading, error} = useMutation(QueryKeys.USER_BY_EMAIL(userAccount.email), (user) => userService.logIn(user), {
        onSuccess: data => {
            setUser(data);
            !!onSuccess ? onSuccess() : navigate("/home");
        }
    });

    function handleLogin() {
        mutate(userAccount);
    }

    function handleKeyPress(event) {
        if(event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <ValidTextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={userAccount.email}
                    onChange={e => setUserAccount(prev => ({...prev, email: e.target.value}))}
                    autoComplete="email"
                    autoFocus
                    error={error?.email}
                />
                <ValidTextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={userAccount.password}
                    onChange={e => setUserAccount(prev => ({...prev, password: e.target.value}))}
                    onKeyDown={handleKeyPress}
                    autoComplete="current-password"
                    error={error?.password}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    Sign In
                </Button>
                <Grid container>
                    {!hideSignUpLink &&
                        <Grid item>
                            <Link href="#" variant="body2" to="/sign-up" component={RouterLink}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    }
                </Grid>
            </div>
        </Container>
    );
}