import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#007bff',
        color: '#fff',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: theme.spacing(4),
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[5],
        width: '100%',
        maxWidth: 400,
    },
    Typography: {
        color: "#000000"
    },
    form: {
        marginTop: "20px",
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    error: {
        color: 'red',
        marginBottom: theme.spacing(2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, ...state } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login({ email, password });
        console.log("register res::", res);
        if (res.status === 200) {
            setError('');
            console.log('Login successful');
            navigate("/profile")
        } else {
            setError(res?.response?.data?.msg);
        }
    };

    return (
        <div className={classes.root}>
            <Container className={classes.formContainer}>
                <Typography variant="h5" style={{ color: "#000000" }} component="h1" gutterBottom>
                    Login
                </Typography>
                <Typography variant="body2" style={{ color: "#A9A9A9" }} gutterBottom>
                    Don't have an account? <Link to="/signup">Register</Link>.
                </Typography>
                {error && <Typography className={classes.error}>{error}</Typography>}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        className={classes.textField}
                        label="E-mail"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textField}
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default Login;
