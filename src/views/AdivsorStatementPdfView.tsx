import React from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AdvisorStatementPdf } from "../components/Advisor/AdvisorStatementPdf";
import { useStore } from "../store";

export type AdvisorStatementPdfViewParams = {
  id: string;
}

export function AdvisorStatementPdfView() {
  const { id } = useParams<AdvisorStatementPdfViewParams>()
  const { courses, advisors, amountPerParticipant, year } = useStore()
  const advisor = advisors[id]

  return (
    <>
      <div className="no-print">
        <Link to="/">Back</Link>
        <button onClick={() => window.print()}>Print</button>
      </div>

      {advisor && <AdvisorStatementPdf advisor={advisor} courses={courses.filter(course => course.advisor?.id === advisor.id)} year={year} amountPerParticipant={amountPerParticipant}></AdvisorStatementPdf>}
    </>
  )
}
