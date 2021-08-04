import React from 'react';
import { DSVImport } from '../components/DSVImport';
import { CourseTable } from '../components/CourseTable';
import { AdvisorTable } from '../components/AdvisorTable';
import { Container } from '../components/Layout';
import { CantonTable } from '../components/CantonTable';
import { useStore } from '../store';

export function MainView() {
  const { courses, advisors, amountPerParticipant, year, cantons, importData, setAmountPerParticipant, setYear } = useStore();

  return (
    <Container>
      <div>
        <h1>BSV PDF</h1>
        <div className="space-between">
          <label>
            <div>Datei</div>
            <DSVImport onChange={(value) => importData(value)}></DSVImport>
          </label>

          <label>
            <div>Betrag pro Tn</div>
            <input type="number" step="0.1" value={amountPerParticipant} onChange={(event) => setAmountPerParticipant(parseFloat(event.target.value))} />
          </label>
          <label>
            <div>Jahr</div>
            <input type="number" step="1" value={year} onChange={(event) => setYear(parseInt(event.target.value))} />
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
