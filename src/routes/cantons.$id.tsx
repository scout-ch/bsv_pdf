import { useStore } from '../store';
import { Link, createFileRoute } from '@tanstack/react-router'
import { CantonStatementPdf } from "../components/Canton/CantonStatementPdf";
import { CantonStatement } from "../models/canton_statement";
import { getAssociation } from "../models/course_number";
import { useTranslation } from 'react-i18next';
import { cantonLng } from "../models/canton";

export type CantonStatementPdfViewParams = {
  id: string;
}

export const Route = createFileRoute("/cantons/$id")({
  component: Canton,
})

function Canton() {
  const { id } = Route.useParams()
  const { courses, amountPerParticipant, fixcostsPerParticipant, year } = useStore()
  const { t } = useTranslation()
  const lng = cantonLng(id)
  const cantonStatement: CantonStatement = {
    courses: courses.filter(course => getAssociation(course.courseNumber).toUpperCase() === id.toUpperCase()),
    year: year,
    amountPerParticipant: amountPerParticipant,
    fixcostsPerParticipant: fixcostsPerParticipant,
    canton: id
  }

  return (
    <main className="prose">
      <div className="no-print">
        <Link to="/">{t('back') as string}</Link>
        <button onClick={() => window.print()}>Print</button>
      </div>

      {cantonStatement && <CantonStatementPdf lng={lng} statement={cantonStatement}></CantonStatementPdf>}
    </main>
  )
}
