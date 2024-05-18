import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../context/AuthContext';

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
    success: {
        color: 'green',
        marginBottom: theme.spacing(2),
    },
    error: {
        color: 'red',
        marginBottom: theme.spacing(2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { register, ...state } = useAuth();
    console.log("State:", state);
    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        try {
            const res = await register({ name, email, password });
            if (res.status === 200) {
                setSuccess(true)
            }
            else if (res?.response?.status === 400 || res?.response?.status === 500) {
                console.log("error res::", res.response.data.Error);
                setError(res.response.data.Error)
            }
        } catch (err) {
            console.log("register err::", err);
        }
    };

    return (
        <div className={classes.root}>
            <Container className={classes.formContainer}>
                <Typography variant="h5" style={{ color: "#000000" }} component="h1" gutterBottom>
                    Register
                </Typography>
                <Typography variant="body2" style={{ color: "#A9A9A9" }} gutterBottom>
                    Already have an account? <Link to="/login">Login</Link>.
                </Typography>
                {error && <Typography className={classes.error}>{error}</Typography>}
                {success && <Typography className={classes.success}>{"Successfully Registered..."}</Typography>}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        className={classes.textField}
                        label="User Name"
                        variant="outlined"
                        type="text"
                        value={name}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                        required
                    />
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
                        Register
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default SignUp;
