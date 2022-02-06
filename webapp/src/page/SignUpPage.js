import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {useMutation} from "react-query";
import {QueryKeys} from "../service/QueryKeys";
import {UserService} from "../service/UserService";
import ValidTextField from "../component/ValidTextField";
import useUser from "../hooks/useUser";
import {red} from "@material-ui/core/colors";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const userService = new UserService();


export default function SignUpPage() {
    const classes = useStyles();
    let navigate = useNavigate();
    const {setUser} = useUser();

    const [userAccount, setUserAccount] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: new Date(),
        phoneNumber: '',
        address: {
            line1: '',
            line2: '',
            postalCode: '',
            city: '',
            province: '',
            country: ''
        }
    });

    // use this to insert data to database
    const {mutate: createUser, isLoading, error} = useMutation(QueryKeys.USER_BY_EMAIL(userAccount.email),
        user => userService.create(user), {
            onSuccess: data => {
                setUser(data);
                navigate('/home');
            }
        });

    function handleSubmit() {
        createUser(userAccount);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            autoComplete="fname"
                            name="firstName"
                            variant="standard"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={userAccount.firstName}
                            onChange={e => setUserAccount(prev => ({...prev, firstName: e.target.value}))}
                            autoFocus
                            error={error?.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={userAccount.lastName}
                            onChange={e => setUserAccount(prev => ({...prev, lastName: e.target.value}))}
                            autoComplete="lname"
                            error={error?.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <KeyboardDatePicker
                            autoOk
                            required
                            variant="inline"
                            inputVariant="standard"
                            label="Date of birth"
                            format="MM/dd/yyyy"
                            value={userAccount.dateOfBirth}
                            InputAdornmentProps={{position: "start"}}
                            onChange={date => setUserAccount(prev => ({...prev, dateOfBirth: date}))}
                            error={!!error?.dateOfBirth}
                            helperText={error?.dateOfBirth?.message}
                            maxDate={new Date(Date.now())}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={userAccount.email}
                            onChange={e => setUserAccount(prev => ({...prev, email: e.target.value}))}
                            error={error?.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userAccount.password}
                            onChange={e => setUserAccount(prev => ({...prev, password: e.target.value}))}
                            error={error?.password}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            value={userAccount.phoneNumber}
                            onChange={e => setUserAccount(prev => ({...prev, phoneNumber: e.target.value}))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="line1"
                            label="Address Line 1"
                            name="line1"
                            autoComplete="line1"
                            value={userAccount.address?.line1}
                            onChange={e => setUserAccount(prev => ({
                                ...prev,
                                address: {...prev.address, line1: e.target.value}
                            }))}
                            error={error?.address?.line1}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            fullWidth
                            id="line2"
                            label="Address Line 2"
                            name="line2"
                            autoComplete="line2"
                            value={userAccount.address?.line2}
                            onChange={e => setUserAccount(prev => ({
                                ...prev,
                                address: {...prev.address, line2: e.target.value}
                            }))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="postalCode"
                            label="Postal Code"
                            name="postalCode"
                            autoComplete="postalCode"
                            value={userAccount.address?.postalCode}
                            onChange={e => setUserAccount(prev => ({
                                ...prev,
                                address: {...prev.address, postalCode: e.target.value}
                            }))}
                            error={error?.address?.postalCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                            value={userAccount.address?.city}
                            onChange={e => setUserAccount(prev => ({
                                ...prev,
                                address: {...prev.address, city: e.target.value}
                            }))}
                            error={error?.address?.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="province"
                            label="Province"
                            name="province"
                            autoComplete="province"
                            value={userAccount.address?.province}
                            onChange={e => setUserAccount(prev => ({
                                ...prev,
                                address: {...prev.address, province: e.target.value}
                            }))}
                            error={error?.address?.province}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ValidTextField
                            variant="standard"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            autoComplete="country"
                            value={userAccount.address?.country}
                            onChange={e => setUserAccount(prev => ({
                                ...prev,
                                address: {...prev.address, country: e.target.value}
                            }))}
                            error={error?.address?.country}
                        />
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <FormControlLabel*/}
                    {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                    {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link variant="body2" component={RouterLink} to="/sign-in">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}