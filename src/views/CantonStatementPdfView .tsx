import React, { FunctionComponent, useContext } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AppState, AppContext } from "../App";
import { CantonStatementPdf } from "../components/Canton/CantonStatementPdf";
import { CantonStatement } from "../models/canton_statement";

export type CantonStatementPdfViewParams = {
  id: string;
}

export const CantonStatementPdfView: FunctionComponent = () => {
  const { id } = useParams<CantonStatementPdfViewParams>()
  const { courses, amountPerParticipant, year } = useContext<AppState>(AppContext)
  const cantonStatement = new CantonStatement(courses.filter(course => course.courseNumber?.association() === id.toUpperCase()), year, amountPerParticipant, id)

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
