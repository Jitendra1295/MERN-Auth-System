import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
}))
function Profile() {

    const classes = useStyles();
    const { logout, ...state } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        await logout();
        navigate('/');
    }
    return (
        <div className={classes.root}>
            <Container className={classes.formContainer}>
                <Typography variant="h5" style={{ color: "#000000" }} component="h1" gutterBottom>
                    Welcome
                </Typography>
                <Typography variant="h5" style={{ color: "#000000" }} component="h1" gutterBottom>
                    You are now Logged In 👏
                </Typography>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => { handleSubmit() }}
                    style={{ width: "150px", marginTop: "15px" }}
                >
                    Logout
                </Button>
            </Container>
        </div>
    )
}

export default Profile
