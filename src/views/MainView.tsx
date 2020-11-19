import React, { FunctionComponent, useContext } from 'react';
import { DSVImport } from '../components/DSVImport';
import { CourseTable } from '../components/CourseTable';
import { AdvisorTable } from '../components/AdvisorTable';
import { AppContext } from '../App';
import { Container } from '../components/Layout';
import { CantonTable } from '../components/CantonTable';
import { ImportResult } from '../models/import_data';

export interface MainViewProps {
  onDataImport?(value: ImportResult): void
  onAmountChange?(value: number): void
  onYearChange?(value: number): void
}

export const MainView: FunctionComponent<MainViewProps> = ({ onDataImport, onAmountChange, onYearChange }) => {
  const { courses, advisors, amountPerParticipant, year, cantons } = useContext(AppContext);

  return (
    <Container>
      <div>
        <h1>BSV PDF</h1>
        <div className="space-between">
          <label>
            <div>Datei</div>
            <DSVImport onChange={(value) => onDataImport && onDataImport(value)}></DSVImport>
          </label>

          <label>
            <div>Betrag pro Tn</div>
            <input type="number" step="0.1" value={amountPerParticipant} onChange={(event) => onAmountChange && onAmountChange(parseFloat(event.target.value))} />
          </label>
          <label>
            <div>Jahr</div>
            <input type="number" step="1" value={year} onChange={(event) => onYearChange && onYearChange(parseInt(event.target.value))} />
          </label>
        </div>
        <h2>Kurse</h2>
        <CourseTable courses={courses}></CourseTable>
        <h2>Kantone</h2>
        <CantonTable cantons={cantons}></CantonTable>
        <h2>LKB</h2>
        <AdvisorTable advisors={Object.values(advisors)}></AdvisorTable>
      </div>
    </Container >
  );
}

export default MainView;
