import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import Login from "../src/pages/Login"
import Home from "../src/pages/Home"
import Edit from "../src/pages/Edit"
import Insert from "../src/pages/Insert"

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ Home } />      
      <Route exact path="/edit/:id" component={ Edit } />
      <Route exact path="/insert" component={ Insert } />
    </Router>
  );
}
