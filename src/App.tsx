import React, { ReactElement, useState } from 'react';
import { DSVImport, ImportResult } from './components/DSVImport';
import './App.css';
import { CourseTable } from './components/CourseTable';
import { AdvisorMap } from './models/advisor';
import { Course } from './models/course';
import { AdvisorTable } from './components/AdvisorTable';
import styles from './App.module.css'

type AppState = {
  courses: Course[];
  advisors: AdvisorMap;
}

function App(): ReactElement {
  const [state, setState] = useState<AppState>({ courses: [], advisors: {} });
  const handleChange = (value: ImportResult) => setState({ courses: value.courses, advisors: value.advisors });
  const { courses } = state;

  return (
    <div className={styles.container}>
      <div>
        <h1>BSV PDF</h1>
        <DSVImport onChange={handleChange} ></DSVImport>
        <h2>Kurse</h2>
        <CourseTable courses={courses}></CourseTable>
        <h2>LKB</h2>
        <AdvisorTable advisors={Object.values(state.advisors)} courses={courses}></AdvisorTable>
      </div >
    </div>
  );
}

export default App;
