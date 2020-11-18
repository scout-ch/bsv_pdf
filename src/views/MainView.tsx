import React, { ReactElement, useContext } from 'react';
import { DSVImport, ImportResult } from '../components/DSVImport';
import { CourseTable } from '../components/CourseTable';
import { AdvisorTable } from '../components/AdvisorTable';
import { AppContext } from '../App';
import { Container } from '../components/Layout';

export interface MainViewProps {
  onImport?(value: ImportResult): void
}

function MainView({ onImport }: MainViewProps): ReactElement {
  const { courses, advisors } = useContext(AppContext);

  return (
    <Container>
      <div>
        <h1>BSV PDF</h1>
        <DSVImport onChange={(value) => onImport && onImport(value)} ></DSVImport>
        <h2>Kurse</h2>
        <CourseTable courses={courses}></CourseTable>
        <h2>LKB</h2>
        <AdvisorTable advisors={Object.values(advisors)}></AdvisorTable>
      </div>
    </Container>
  );
}

export default MainView;
