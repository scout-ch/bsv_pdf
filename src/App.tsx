import React, { ReactElement, useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import MainView from './views/MainView';
import { AdvisorMap } from "./models/advisor"
import { Course } from "./models/course"
import { ImportResult } from './components/DSVImport';
import { AdvisorStatementPdfView } from './views/AdivsorStatementPdfView';

export type AppState = {
  courses: Course[];
  advisors: AdvisorMap;
}

export const defaultAppState = { courses: [], advisors: {} }

export const AppContext = createContext<AppState>(defaultAppState)

function App(): ReactElement {
  const [state, setState] = useState<AppState>(defaultAppState);
  const handleImport = (value: ImportResult) => setState({ courses: value.courses, advisors: value.advisors });

  return (
    <AppContext.Provider value={state}>
      <Router>
        <Switch>
          <Route exact path="/" children={<MainView onImport={handleImport}></MainView>}></Route>
          <Route path="/advisors/:id" children={<AdvisorStatementPdfView></AdvisorStatementPdfView>}></Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
