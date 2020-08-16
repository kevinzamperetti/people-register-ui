import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import InputMask from 'react-input-mask';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";

import Util from '../Util/Util';
import api from '../services/api';

export default class Insert extends React.Component {

  constructor( props ){
    super( props )
    this.util = new Util();
    this.state = {
      authorization: "Basic " + btoa("admin" + ":" + "admin"),
      id: '',
      name: '',
      gender: '',
      email: '',
      dateBirth: '',
      naturalFrom: '',
      nationality: '',
      cpf: ''
    }
  }

  componentDidMount() {
    this.findById();
  }

  changeValuesState( evt ) {
		const { name, value } = evt.target
		this.setState( {
			[name]: value
    } )
  }

  findById = async () => {
    const { id } = this.props.match.params
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( `api/v1/person/${id}`, header )
    this.setState( { 
        id: response.data.id,
        name: response.data.name,
        gender: response.data.gender,
        email: response.data.email,
        dateBirth: response.data.dateBirth,
        naturalFrom: response.data.naturalFrom,
        nationality: response.data.nationality,
        cpf: response.data.cpf
     } )
}

  save( evt ) {
    evt.preventDefault();
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const { id, name, gender, email, dateBirth, naturalFrom, nationality, cpf } = this.state
    api.put( `/api/v1/person/${id}`, {
            id: id,
            name: name,
            gender: gender == '' ? 'N' : gender,
            email: email,
            dateBirth: dateBirth,
            naturalFrom: naturalFrom,
            nationality: nationality,
            cpf: cpf.replace(/[^\d]/g, "")
        }, header ).then( response => {
            toast.success(this.util.contentSuccess());
            document.getElementById("form-edit").reset();
        } )
        .catch( error => {
            toast.error(this.util.contentError(error.response.data.message));
        } )
  }

  render() {
    const { name, gender, email, dateBirth, naturalFrom, nationality, cpf } = this.state
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h6" align={"center"} style={{margin: '20px'}} >
              Alterar Cadastro de Pessoa
            </Typography>
            <form id="form-edit" onBlur={ this.changeValuesState.bind( this ) }>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    // autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    autoFocus
                    value={name} 
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="dateBirth"
                    name="dateBirth"
                    autoComplete="dateBirth"
                    value={dateBirth.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="gender"
                    label="Gênero"
                    name="gender"
                    autoComplete="gender"
                    value={gender} 
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email} 
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="naturalFrom"
                    label="Naturalidade"
                    name="naturalFrom"
                    autoComplete="naturalFrom"
                    value={naturalFrom} 
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="nationality"
                    label="Nacionalidade"
                    name="nationality"
                    autoComplete="nationality"
                    value={nationality} 
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    autoComplete="cpf"
                    value={cpf} 
                    onChange={ this.changeValuesState.bind( this ) }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={ this.save.bind( this ) }
                  >
                    Alterar
                  </Button>
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/home" variant="body2">
                    Voltar
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        <ToastContainer 
          position='top-right'
          autoClose={1000}
          draggable={false}
          hideProgressBar={true}
        />
      </React.Fragment>
    )
  }
}