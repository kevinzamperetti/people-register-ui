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
      user : '',
      password : '',
      authorization: '',
      urlBackEnd: [],
      urlFrontEnd: [],
      columns:["Back-End", "Front-End"],
      options: this.util.optionsMUIDataTableWithOutPrintAndFilter
    }
  }

  changeValuesState( evt ) {
    const { name, value } = evt.target
		this.setState( {
			[name]: value
    } )
  }

  signIn(evt) {
    evt.preventDefault();
    const { user, password, authorization } = this.state
    console.log( user, password )
    this.setState( { authorization: "Basic " + btoa(user + ":" + password) }  )
    if (user === 'admin' && password === 'admin') {
      localStorage.setItem( 'Authorization' , "Basic " + btoa( user + ":" + password ) )
    }
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
              <Input id="user" name="user" value={user} onChange={ this.changeValuesState.bind( this ) }/>
            </FormControl>
            <FormControl style={{margin: '30px 10px'}}>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input type="password" name="password" id="password" value={password} onChange={ this.changeValuesState.bind( this ) }/>
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
              data={data}
              columns={columns}
              options={options}
            />
          </Container>
      </React.Fragment>
    )
  }
}