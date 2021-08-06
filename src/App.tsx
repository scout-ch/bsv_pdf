import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainView from './views/MainView';
import { CantonStatementPdfView } from './views/CantonStatementPdfView ';
import './App.css'

export function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/cantons/:id" children={<CantonStatementPdfView></CantonStatementPdfView>}></Route>
        <Route children={<MainView></MainView>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
