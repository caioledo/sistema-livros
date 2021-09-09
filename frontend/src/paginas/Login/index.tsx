import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Link, Grid, Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Formik, Form } from 'formik';
import * as Yup from "yup";

import { useStyles } from "./styles";
import { useAuth } from '../../contexto/AuthContext';

interface SignInFormData {
	userName: string;
	userPassword: string;
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Nome de usuário é obrigatório'),
    userPassword: Yup.string().required('Senha é obrigatória'),
});

const dots = (text: {} | null | undefined) => {
    return (
        <div className="running">{text}<span>.</span><span>.</span><span>.</span></div>
    );
}

const Login: React.FC = () => {
    const [customErrorMessage, setCustomErrorMessage] = useState('');
    const [isAccessing, setIsAccessing] = useState(false);

	const { login } = useAuth();
    const classes = useStyles();

	const history = useHistory();

	const handleSubmit = useCallback(async (data: SignInFormData) => {
        setIsAccessing(true);

		try {
	    	await login({
		    	userName: data.userName,
				userPassword: data.userPassword
		    });

            setCustomErrorMessage('');
            setIsAccessing(false);

			if (data.userName == "admin") {
                history.push('/admin');
            } else {
                history.push('/client');
            }
		} catch (err) {
            setIsAccessing(false);
            setCustomErrorMessage('Ocorreu um erro ao fazer login. Cheque suas credenciais.');
		}
	}, [login, history]);

    return (
        <Formik 
            initialValues={{ 
                userName: "", 
                userPassword: ""
            }}
            
            validationSchema={ validationSchema }
            onSubmit={(values: SignInFormData, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            {}
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting 
            }) => (
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh', width: '100%' }}
                >
                    <Box className={classes.paper} boxShadow={4}>
                        <Form className={classes.form} noValidate>
                            <div className={classes.messages}>
                                <Typography 
                                    component="h1" 
                                    variant="h4" 
                                    className={classes.title} 
                                    style={ customErrorMessage === '' ? { display:'block'} : {display : 'none'} }
                                >
                                    Acesso
                                </Typography>

                                <Alert 
                                    variant="filled" 
                                    severity="error"
                                    style={ customErrorMessage !== '' ? {} : {display : 'none'} }
                                >
                                    {customErrorMessage}
                                </Alert>
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="Nome de usuário"
                                name="userName"
                                autoComplete="userName"
                                onChange={handleChange}
                                onBlur={handleBlur}                    
                                value={values.userName} 
                                helperText={touched.userName ? errors.userName : ""}
                                error={touched.userName && Boolean(errors.userName)}
                                autoFocus
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="userPassword"
                                label="Senha"
                                type="password"
                                id="userPassword"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}                    
                                value={values.userPassword} 
                                helperText={touched.userPassword ? errors.userPassword : ""}
                                error={touched.userPassword && Boolean(errors.userPassword)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                { isAccessing === true ? dots('Acessando') : 'Acessar' }
                            </Button>

                            <Grid item>
                                <Link href="/cadastro" variant="body2">
                                    Cadastre-se
                                </Link>
                            </Grid>
                        </Form>
                    </Box> 
                </Grid>
            )}
        </Formik>
    );
}

export default Login;
