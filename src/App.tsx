import React, { ReactElement, useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainView from './views/MainView';
import { AdvisorMap } from "./models/advisor"
import { Course } from "./models/course"
import { ImportResult } from './components/DSVImport';
import { AdvisorStatementPdfView } from './views/AdivsorStatementPdfView';
import './App.css'

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
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/advisors/:id" children={<AdvisorStatementPdfView></AdvisorStatementPdfView>}></Route>
          <Route children={<MainView onImport={handleImport}></MainView>}></Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
