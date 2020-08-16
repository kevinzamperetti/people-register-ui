import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from "mui-datatables";

import Util from '../Util/Util';
import api from '../services/api';

export default class Login extends React.Component {

  constructor( props ){
    super( props )
    this.util = new Util();
    this.state = {
      user : 'admin',
      password : 'admin',
      authorization: "Basic " + btoa("admin" + ":" + "admin"),
      urlBackEnd: [],
      urlFrontEnd: [],
      columns:["Back-End", "Front-End"],
      options: this.util.optionsMUIDataTableWithOutPrintAndFilter
    }
  }

  signIn(evt) {
    evt.preventDefault();
    const { user, password, authorization } = this.state
    console.log( user, password )
    this.setState( { authorization: "Basic " + btoa(user + ":" + password) }  )
    localStorage.setItem( 'Authorization' , authorization )
    this.props.history.push("/home")
  }

  
  listSource = async () => {
    await api.get( '/source' )
    .then( response => {
      this.setState( { 
        urlBackEnd: [ response.data.urlBackEnd],
        urlFrontEnd: [ response.data.urlFrontEnd]
      } )
    }).catch( error => {
      toast.error(this.util.contentError(error.response.data.message))
    })
  }

  render() {
    const { user, password, columns, options, urlBackEnd, urlFrontEnd} = this.state
    const data = urlBackEnd.length > 0
                  ? urlBackEnd.map( ( source ) => 
                      [ urlBackEnd, urlFrontEnd ] )
                  : []
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <form noValidate autoComplete="off">
            <FormControl style={{margin: '30px 10px'}}>
              <InputLabel htmlFor="user">Usuário</InputLabel>
              <Input id="user" value={user} readOnly />
            </FormControl>
            <FormControl style={{margin: '30px 10px'}}>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input id="password" value={password} readOnly />
            </FormControl>
            <Button style={{margin: '30px 10px'}} variant="contained"
                    color="primary" onClick={this.signIn.bind(this)}>
              Autenticar
            </Button>
            <Button style={{margin: '30px 10px'}} variant="contained"
                    color="primary" onClick={this.listSource.bind(this)}>
              Ver Source
            </Button>
          </form>
          </Container>
          <Container>
            <MUIDataTable
              title={"Pessoas"}
              data={data}
              columns={columns}
              options={options}
            />
          </Container>
      </React.Fragment>
    )
  }
}