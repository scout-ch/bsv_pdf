import React, { useState, createContext, FunctionComponent } from 'react';
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
  amountPerCourse: number;
  year: number;
}

export const defaultAppState = { courses: [], advisors: {}, amountPerCourse: 10.0, year: (new Date()).getFullYear() }

export const AppContext = createContext<AppState>(defaultAppState)

export const App: FunctionComponent = () => {
  const [state, setState] = useState<AppState>(defaultAppState);
  const handleDataImport = (value: ImportResult) => setState((prev) => ({ ...prev, ...value }));
  const handleYearChange = (value: number) => setState((prev) => ({ ...prev, year: value }));
  const handleAmountChange = (value: number) => setState((prev) => ({ ...prev, amountPerCourse: value }));

  return (
    <AppContext.Provider value={state}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/advisors/:id" children={<AdvisorStatementPdfView></AdvisorStatementPdfView>}></Route>
          <Route children={<MainView onYearChange={handleYearChange} onAmountChange={handleAmountChange} onDataImport={handleDataImport}></MainView>}></Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
