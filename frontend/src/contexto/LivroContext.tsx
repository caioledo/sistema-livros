import React, { useState, useEffect, useCallback } from 'react';
import axios, {AxiosResponse} from 'axios';
import { Typography, Button, Box, TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import api from '../servicos/api';
import { useStyles } from './assets/styles';
import { PinDropSharp } from '@material-ui/icons';

interface livroProps {
    id: string,
    nome_livro: string,
    nome_autor: string,
    detalhes: string,
    data_cadastro: Date,
    data_update: Date,
    cadastrador: String
};

interface filterData {
    nome_livro: string
};

interface EditData {
    nomeLivro: string,
    nomeAutor: string,
    detalhes: string
}
const editData: EditData = {
    nomeLivro: "",
    nomeAutor: "",
    detalhes: ""
};

const Livro: React.FC<filterData> = (props) => {
    const [obj, setObj] = useState<livroProps[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<string>("");

	const user = localStorage.getItem('@lupa:user');

    const estilos = useStyles();

	useEffect(() => {
	    const nome = props.nome_livro;
        
        try {
		    if (nome == "") {
                api.get('/livro/select').then((response: AxiosResponse) => {
                    setObj(response.data);
                    console.log(response.data);
                });
            } else {
                api.post('/livro/list', {
                    nome
                }).then((response: AxiosResponse) => {
                    setObj(response.data);
                    console.log(response.data);
                });
            }
		} catch (e) {
		    console.log('Erro ao ler registro!\n');
		    console.log(e);
		    return;
		}
	}, []);

    const isAdmin = () =>  {
        if (user) {
            const userD = JSON.parse(user);

            if (userD.user_name == "admin") {
                return true;
            }
        }
        
        return false;
    }

    const handleSubmit = useCallback(async (data: EditData, id: string, currentDetalhes: string) => {
        const nomeLivro = data.nomeLivro;
    	const nomeAutor = data.nomeAutor;
		const detalhes = isAdmin() ? data.detalhes : currentDetalhes;
        const idLivro = 'livro/' + id;

		const res = await api.put(idLivro, {
			nomeLivro,
			nomeAutor,
			detalhes
		});

		console.log(res);
		window.location.reload();
    }, [])

    const handleChange = useCallback(async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const target = event.target;

        if (target.id == "nomeLivro") {
            editData.nomeLivro = target.value;
        }

        if (target.id == "nomeAutor") {
            editData.nomeAutor = target.value;
        }

        if (target.id == "detalhes") {
            editData.detalhes = target.value;
        }
    }, []);

	const deletaLivro = useCallback(async (id, cad) => {
		try {
	    	if (user) {
                const userD = JSON.parse(user);

                if (userD.user_name == "admin" || userD.user_name == cad) {
                    await api.delete('livro/'+id)
                    window.location.reload();
                } else {
                    throw console.error("Erro ao deletar livro, usuário inválido");
                }
            }
		} catch (err) {
			console.log("Erro ao deletar livro")
		}
	}, []);

    const mapa = obj.map(function(item) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            {item.id}
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            {item.nome_livro}
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            {item.nome_autor}
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            {item.detalhes}
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            {item.data_cadastro}
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            {item.data_update}
                        </Typography >
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Button
                            type="button"
                            color="primary"
                            onClick={() => {
                                if (edit == true && (currentId == item.id)) {
                                    setEdit(false);
                                    setCurrentId("")
                                } else {
                                    setEdit(true);
                                    setCurrentId(item.id);
                                }
                                    
                                editData.nomeLivro = "";
                                editData.nomeAutor = "";
                                editData.detalhes = "";
                            }}
                        >
                            editar
                        </Button>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Button
                            type="button"
                            color="secondary"
                            onClick={() => {deletaLivro(item.id, item.cadastrador)}}
                        >
                            excluir
                        </Button>
                    </TableCell>
                </TableRow>

                {
                    (edit && (item.id == currentId)) &&
                    <TableRow>
                        <TableCell>
                            <Button
                                type="button"
                                color="primary"
								variant="contained"
                                className={estilos.button}
                                onClick={() => {handleSubmit(editData, item.id, item.detalhes)}}
                            >
                                Confirmar
                            </Button>
                        </TableCell>

                        <TableCell>
                            <TextField
                                margin="normal"
                                required
                                name="nomeLivro"
                                label="Título"
                                id="nomeLivro"
                                onChange={(e) => {handleChange(e)}}
                                className={estilos.textfield}
                            />
                        </TableCell>

                        <TableCell>
                            <TextField
                                margin="normal"
                                required
                                name="nomeAutor"
                                label="Autor"
                                id="nomeAutor"
                                onChange={(e) => {handleChange(e)}}
                                className={estilos.textfield}
                            />
                        </TableCell>

                        {
                            isAdmin() &&
                            <TableCell>
                                <TextField
                                    margin="normal"
                                    name="detalhes"
                                    label="Detalhes"
                                    id="detalhes"
                                    onChange={(e) => {handleChange(e)}}
                                    className={estilos.textfield}
                                />
                            </TableCell>
                        }
                    </TableRow>
                }
            </TableBody>
        );
    });

    return(
        <div className={estilos.container}>
            <Table className={estilos.table}>
                <TableHead>
                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            Id
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            Título
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            Autor
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            Detalhes
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            Data do Cadastro
                        </Typography>
                    </TableCell>

                    <TableCell  className={estilos.cell}>
                        <Typography className={estilos.typography}>
                            Data do Update
                        </Typography >
                    </TableCell>
                </TableHead>

                {mapa}
            </Table>
        </div>
    );
}

export default Livro;
