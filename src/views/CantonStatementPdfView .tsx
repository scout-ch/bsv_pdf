import React from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { CantonStatementPdf } from "../components/Canton/CantonStatementPdf";
import { CantonStatement } from "../models/canton_statement";
import { useStore } from "../store";
import { getAssociation } from "../models/course_number";
import { useTranslation } from 'react-i18next';
import { cantonLng } from "../models/canton";

export type CantonStatementPdfViewParams = {
  id: string;
}

export function CantonStatementPdfView() {
  const { id } = useParams<CantonStatementPdfViewParams>()
  const { courses, amountPerParticipant, year } = useStore()
  const { t } = useTranslation()
  const lng = cantonLng(id)
  const cantonStatement: CantonStatement = {
    courses: courses.filter(course => getAssociation(course.courseNumber).toUpperCase() === id.toUpperCase()),
    year: year,
    amountPerParticipant: amountPerParticipant,
    canton: id
  }

  return (
    <>
      <div className="no-print">
        <Link to="/">{t('back')}</Link>
        <button onClick={() => window.print()}>Print</button>
      </div>

      {cantonStatement && <CantonStatementPdf lng={lng} statement={cantonStatement}></CantonStatementPdf>}
    </>
  )
}
