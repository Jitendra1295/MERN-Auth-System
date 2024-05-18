// src/components/LandingPage.js

import React from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'center',
    },
    content: {
        maxWidth: '600px',
    },
    button: {
        margin: theme.spacing(1),
    },
}));



const LandingPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleRoute = (route) => {
        navigate(route);
    }

    return (
        <div className={classes.root}>
            <Container className={classes.content}>
                <Typography variant="h3" component="h1" gutterBottom>
                    MERN Sessions Auth App
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Minimalistic Token based authentication app 🔒
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Built with React + Context API, NodeJS, Express, MongoDB
                    <br />
                    Material-ui 🍪
                </Typography>
                <div>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        onClick={() => {
                            handleRoute("/login");
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        onClick={() => {
                            handleRoute("/signup");
                        }}
                    >
                        Register
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;
