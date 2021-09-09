import React, { useCallback, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import { Button, TextField, Link, Grid, Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as Yup from "yup";

import { useStyles } from "./styles";
import api from '../../servicos/api';
//import { useAuth } from '../../contexto/AuthContext';

interface SignInFormData {
    userName: string;
    userPassword: string;
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Nome é obrigatório'),
    userPassword: Yup.string().required('Senha é obrigatória'),
});

const dots = (text: {} | null | undefined) => {
    return (
        <div className="running">{text}<span>.</span><span>.</span><span>.</span></div>
    );
}

const Cadastro: React.FC = () => {
    const [customErrorMessage, setCustomErrorMessage] = useState('');
    const [isAccessing, setIsAccessing] = useState(false);

    const classes = useStyles();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        setIsAccessing(true);

        try {
            const userName = data.userName;
            const userPassword = data.userPassword;

            const res = await api.post('user', {
                userName,
                userPassword
            });

            setCustomErrorMessage("");
            setIsAccessing(false);

            history.push('/');
        } catch (err) {
            setIsAccessing(false);
            console.log(err)
            setCustomErrorMessage('Ocorreu um erro ao fazer o cadastro. Cheque suas credenciais.');
        }
    }, [, history]);

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
            {
                ({
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
                                        Cadastro
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
                                    { isAccessing === true ? dots('Cadastrando') : 'Cadastrar' }
                                </Button>

                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Voltar
                                    </Link>
                                </Grid>
                            </Form>
                        </Box>  
                    </Grid>
                )
            }
        </Formik>
    );
}

export default Cadastro;
