import React from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { CantonStatementPdf } from "../components/Canton/CantonStatementPdf";
import { CantonStatement } from "../models/canton_statement";
import { useStore } from "../store";
import { getAssociation } from "../models/course_number";

export type CantonStatementPdfViewParams = {
  id: string;
}

export function CantonStatementPdfView() {
  const { id } = useParams<CantonStatementPdfViewParams>()
  const { courses, amountPerParticipant, year } = useStore()
  const cantonStatement: CantonStatement = {
    courses: courses.filter(course => getAssociation(course.courseNumber).toLocaleUpperCase() === id.toUpperCase()),
    year: year,
    amountPerParticipant: amountPerParticipant,
    canton: id
  }

  return (
    <>
      <div className="no-print">
        <Link to="/">Back</Link>
        <button onClick={() => window.print()}>Print</button>
      </div>

      {cantonStatement && <CantonStatementPdf statement={cantonStatement}></CantonStatementPdf>}
    </>
  )
}
