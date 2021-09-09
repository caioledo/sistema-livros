import React, { useCallback } from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';

import { useStyles } from "./styles";
import api from '../../servicos/api';
import { useAuth } from '../../contexto/AuthContext';
import Livro from '../../contexto/LivroContext';

interface FilterFormData {
    nomeLivro: string;
    nomeAutor: string;
}

const Cliente: React.FC = () => {
	const classes = useStyles();
	const { signOut } = useAuth();
	const user = localStorage.getItem('@lupa:user');

	const logoff = useCallback(async () => {
		try {
	    	await signOut();
		} catch (err) {
			console.log("Error at signing out")
		}
	}, [signOut]);

	const handleSubmit = useCallback(async (data: FilterFormData) => {
        const nomeLivro = data.nomeLivro;
    	const nomeAutor = data.nomeAutor;
		const detalhes = "";
		
		if (user) {
			const userD = JSON.parse(user);
			const cadastrador = userD.user_name;

			const res = await api.post('livro', {
				nomeLivro,
				nomeAutor,
				detalhes,
				cadastrador
			});

			console.log(res);
		}

		window.location.reload();
    }, []);

	if (user) {
		const userD = JSON.parse(user)

		if (userD.user_name == "admin") {
			return <Redirect to="/admin" />;
		}
	}

	return (
		<Formik 
			initialValues={{ 
				nomeLivro: "",
				nomeAutor: ""
			}}

			onSubmit={(values: FilterFormData, {setSubmitting, resetForm}) => {
				setSubmitting(true);
				handleSubmit(values);
				setSubmitting(false);
			}}
		>
			{}
			{
				({
                    values,
					handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
					<Form>
						<Box className={classes.header}>
							<Button
								type="button"
								variant="contained"
								color="primary"
								onClick={() => {logoff()}}
								className={classes.button}
							>
								Logoff
							</Button>
						</Box>

						<Box className={classes.tablebox}>
							<Livro nome_livro={""}/>
						</Box>

						<Box className={classes.paper}>
							<TextField
								margin="normal"
								required
								name="nomeLivro"
								label="Título"
								id="nomeLivro"
								onChange={handleChange}
								onBlur={handleBlur}                    
								value={values.nomeLivro}
								className={classes.textfield}
							/>

							<TextField
								margin="normal"
								required
								name="nomeAutor"
								label="Autor"
								id="nomeAutor"
								onChange={handleChange}
								onBlur={handleBlur}                    
								value={values.nomeAutor}
								className={classes.textfield}
							/>
							
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.button}
							>
								Cadastrar Livro
							</Button>
						</Box>
					</Form>
				)
			}
		</Formik>
	);
};

export default Cliente;
