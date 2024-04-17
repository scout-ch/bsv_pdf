import { DSVImport } from '../components/DSVImport';
import { CourseTable } from '../components/CourseTable';
import { CantonTable } from '../components/CantonTable';
import { useStore } from '../store';
import { useTranslation } from 'react-i18next';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { courses, amountPerParticipant, fixcostsPerParticipant, year, cantons, importData, setAmountPerParticipant, setFixcostsPerParticipant, setYear } = useStore();
  const { t } = useTranslation([], { lng: "de"})

  return (
    <main className="container mx-auto max-w-screen-md p-4 leading-relaxed h-screen flex flex-col">
      <div>
        <h1>{t("Index.title")}</h1>
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
            <div>Fixkosten pro Tn</div>
            <input type="number" step="0.1" value={fixcostsPerParticipant} onChange={(event) => setFixcostsPerParticipant(parseFloat(event.target.value))} />
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
      </div>
    </main>
  );
}
