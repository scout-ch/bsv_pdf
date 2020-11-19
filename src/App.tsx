import React, { useState, createContext, FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainView from './views/MainView';
import { AdvisorMap } from "./models/advisor"
import { Course } from "./models/course"
import { ImportResult } from './models/import_data';
import { AdvisorStatementPdfView } from './views/AdivsorStatementPdfView';
import './App.css'
import { CantonStatementPdfView } from './views/CantonStatementPdfView ';

export type AppState = {
  courses: Course[];
  cantons: Set<string>;
  advisors: AdvisorMap;
  amountPerParticipant: number;
  year: number;
}

export const defaultAppState = { cantons: (new Set<string>()), courses: [], advisors: {}, amountPerParticipant: 25.0, year: (new Date()).getFullYear() }

export const AppContext = createContext<AppState>(defaultAppState)

export const App: FunctionComponent = () => {
  const [state, setState] = useState<AppState>(defaultAppState);
  const handleDataImport = (value: ImportResult) => setState((prev) => ({ ...prev, ...value }));
  const handleYearChange = (value: number) => setState((prev) => ({ ...prev, year: value }));
  const handleAmountChange = (value: number) => setState((prev) => ({ ...prev, amountPerParticipant: value }));

  return (
    <AppContext.Provider value={state}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/advisors/:id" children={<AdvisorStatementPdfView></AdvisorStatementPdfView>}></Route>
          <Route path="/cantons/:id" children={<CantonStatementPdfView></CantonStatementPdfView>}></Route>
          <Route children={<MainView onYearChange={handleYearChange} onAmountChange={handleAmountChange} onDataImport={handleDataImport}></MainView>}></Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
