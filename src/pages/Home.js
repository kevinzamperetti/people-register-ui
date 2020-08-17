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

export default class Home extends React.Component {

  constructor( props ){
    super( props )
    this.util = new Util();
    this.state = {
      user : 'admin',
      password : 'admin',
      authorization: "Basic " + btoa("admin" + ":" + "admin"),
      personList: [],
      columns:["Nome", "E-mail", "Data de Nascimento", "CPF",
               "Data de Inclusão", "Data de Alteração", "", ""],
      options: this.util.optionsMUIDataTableWithOutPrintAndFilter
    }
  }

  componentDidMount() {
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    if (header != null) {
      this.listAll()
    }
  }

  signIn(evt) {
    evt.preventDefault();
    const { user, password, authorization } = this.state
    this.setState( { authorization: "Basic " + btoa(user + ":" + password) }  )
    localStorage.setItem( 'Authorization' , authorization )
  }

  listAll = async () => {
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    await api.get( '/api/v1/person', header )
    .then( response => {
      this.setState( { personList: response.data }  )
    }).catch( error => {
      toast.error(this.util.contentError(error.response.data.message))
    })
  }

  insert() {
    this.props.history.push('/insert')
  }

  edit( evt ) {
    this.props.history.push(`/edit/${evt.id}`)
  }

  delete( evt, p ) {
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    api.delete( `/api/v1/person/${evt.id}`, header)
    .then( response => {
      toast.success(this.util.contentSuccess());
      this.listAll();
    } )
    .catch( error => {
      toast.error(this.util.contentError(error.response.data.message))
    } )
  }

  render() {
    const { user, password, personList, columns, options } = this.state
    const data = personList.length > 0
                  ? personList.map( ( person ) => 
                      [ person.name, person.email, person.dateBirth, person.cpf,
                        person.createdAt, person.updatedAt,
                        <EditIcon onClick={ this.edit.bind( this, person ) } />,
                        <DeleteIcon onClick={ this.delete.bind( this, person ) } />                            
                      ] )
                  : []
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <form noValidate autoComplete="off">
            <Button style={{margin: '30px 10px'}} variant="contained"
                    color="primary" onClick={this.listAll.bind(this)}>
              Listar Pessoas
            </Button>
            <Button style={{margin: '30px 10px'}} variant="contained"
                    color="primary" onClick={this.insert.bind(this)}>
              Cadastrar Pessoa
            </Button>
            <Button style={{margin: '30px 10px'}} variant="contained"
                    color="primary" onClick={this.util.logout.bind(this)}>
              Sair
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