import React, { FunctionComponent, useContext } from 'react';
import { DSVImport, ImportResult } from '../components/DSVImport';
import { CourseTable } from '../components/CourseTable';
import { AdvisorTable } from '../components/AdvisorTable';
import { AppContext } from '../App';
import { Container } from '../components/Layout';

export interface MainViewProps {
  onDataImport?(value: ImportResult): void
  onAmountChange?(value: number): void
  onYearChange?(value: number): void
}

export const MainView: FunctionComponent<MainViewProps> = ({ onDataImport, onAmountChange, onYearChange }) => {
  const { courses, advisors, amountPerCourse, year } = useContext(AppContext);

  return (
    <Container>
      <div>
        <h1>BSV PDF</h1>
        <DSVImport onChange={(value) => onDataImport && onDataImport(value)}></DSVImport>
        <input type="number" step="0.1" value={amountPerCourse} onChange={(event) => onAmountChange && onAmountChange(parseFloat(event.target.value))} />
        <input type="number" step="1" value={year} onChange={(event) => onYearChange && onYearChange(parseInt(event.target.value))} />
        <h2>Kurse</h2>
        <CourseTable courses={courses}></CourseTable>
        <h2>LKB</h2>
        <AdvisorTable advisors={Object.values(advisors)}></AdvisorTable>
      </div>
    </Container >
  );
}

export default MainView;
