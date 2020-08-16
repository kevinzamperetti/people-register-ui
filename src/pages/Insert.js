import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import moment from 'moment';

import Util from '../Util/Util';
import api from '../services/api';

export default class Insert extends React.Component {

  constructor( props ){
    super( props )
    this.util = new Util();
    this.state = {
      authorization: "Basic " + btoa("admin" + ":" + "admin")
    }
    // this.trocaValoresState = this.trocaValoresState.bind( this )
  }

  changeValuesState( evt ) {
    const { name, value } = evt.target
		this.setState( {
			[name]: value
    } )
  }

  save( evt ) {
    evt.preventDefault();
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const { name, gender, email, dateBirth, naturalFrom, nationality, cpf } = this.state
    const dateBirthFormatted = moment(dateBirth).format("DD/MM/YYYY");
    console.log(dateBirthFormatted)
    api.post( '/api/v1/person', {
            name: name,
            gender: gender == '' ? 'N' : gender,
            email: email,
            dateBirth: dateBirthFormatted,
            naturalFrom: naturalFrom,
            nationality: nationality,
            cpf: cpf.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        }, header ).then( response => {
            toast.success(this.util.contentSuccess());
            document.getElementById("form-opportunity").reset();
        // this.props.history.push("/pages/key-word")
            // console.log( response.data )
        } )
        .catch( error => {
            toast.error(this.util.contentError(error.response.data.message));
        } )
  }

  render() {
    const { cpf } = this.state
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h6" align={"center"} style={{margin: '20px'}} >
              Cadastrar Pessoa
            </Typography>
            <form id="form-opportunity" onBlur={ this.changeValuesState.bind( this ) }> {/* noValidate */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="dateBirth"
                    name="dateBirth"
                    type="date"
                    autoComplete="dateBirth"
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
                    Cadastrar
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