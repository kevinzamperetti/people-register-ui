import React from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
//import { Media } from 'reactstrap';

export default class Util extends React.Component {

    optionsMUIDataTableWithOutPrintAndFilter = {
        filterType: "dropdown",
        responsive: 'stacked',
        selectableRows: "none",
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        textLabels: {
            body: {
              noMatch: "Nenhum registro encontrado",
              toolTip: "Ordernar",
              columnHeaderTooltip: column => `Ordernar por ${column.label}`
            },
            pagination: {
              next: "Próxima página",
              previous: "Página anterior",
              rowsPerPage: "Linhas por página:",
              displayRows: "do",
            },
            toolbar: {
              search: "Procurar",
              downloadCsv: "Download CSV",
              print: "Imprimir",
              viewColumns: "Exibir Colunas",
              filterTable: "Tabela de Filtro",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "REDEFINIR",
            },
            viewColumns: {
              title: "Mostrar Colunas",
              titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
            selectedRows: {
              text: "linha(s) selecionada(s)",
              delete: "Excluir",
              deleteAria: "Excluir linhas selecionadas",
            },
          }
    };

    optionsMUIDataTableForHistory = {
        filterType: "dropdown",
        responsive: 'stacked',
        selectableRows: "none",
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        pagination: false,
        selectableRowsOnClick: false,
        search: false,
        sort: false,
        textLabels: {
            body: {
              noMatch: "Nenhum registro encontrado",
              toolTip: "Ordernar",
              columnHeaderTooltip: column => `Ordernar por ${column.label}`
            },
            pagination: {
              next: "Próxima página",
              previous: "Página anterior",
              rowsPerPage: "Linhas por página:",
              displayRows: "do",
            },
            toolbar: {
              search: "Procurar",
              downloadCsv: "Download CSV",
              print: "Imprimir",
              viewColumns: "Exibir Colunas",
              filterTable: "Tabela de Filtro",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "REDEFINIR",
            },
            viewColumns: {
              title: "Mostrar Colunas",
              titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
            selectedRows: {
              text: "linha(s) selecionada(s)",
              delete: "Excluir",
              deleteAria: "Excluir linhas selecionadas",
            },
          }
    };

	logout() {
    localStorage.removeItem('Authorization')
    this.props.history.push("/")
  }
  
  
  /* eslint no-restricted-globals:0 */
  goPreviousPage() {
    history.go(-1);
  }
  
// ========== Toast Contents: ============
// eslint-disable-next-line react/prop-types
contentSuccess(message) {
  return (
    <Snackbar open={true} autoHideDuration={2000} >
      <Alert autoHideDuration={2000} severity="success">Successo!</Alert>
    </Snackbar>
  )
}

// eslint-disable-next-line react/prop-types
contentError( message ) {
  return (
    <Snackbar open={true} autoHideDuration={2000} >
        <Alert autoHideDuration={2000} severity="error">
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
    </Snackbar>
  )
}

// eslint-disable-next-line react/prop-types
errorFillFields() {
  return (
    <Snackbar open={true} autoHideDuration={2000} >
      <Alert autoHideDuration={2000} severity="error">
        <AlertTitle>Error</AlertTitle>
        Existem campos não preenchidos.
      </Alert>
    </Snackbar>
  )
}

	render() {
		return (
			<React.Fragment>
				{ this.logout.bind( this ) }
				<Link to="/" className="ml-auto text-decoration-none"/>
			</React.Fragment>
		)
	}
}

