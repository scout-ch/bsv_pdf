import React, { ReactElement, useContext } from "react";
import { useParams } from "react-router-dom"
import { AppState, AppContext } from "../App";
import { AdvisorStatementPdf } from "../components/Advisor/AdvisorStatementPdf";

export type AdvisorStatementPdfViewParams = {
  id: string;
}

export function AdvisorStatementPdfView(): ReactElement {
  const { id } = useParams<AdvisorStatementPdfViewParams>()
  const { courses, advisors } = useContext<AppState>(AppContext)
  const advisor = advisors[id]
  if (!advisor) return (<></>)

  return (<AdvisorStatementPdf advisor={advisor} courses={courses.filter(course => course.advisor?.id === advisor.id)} year={2020} amountPerCourse={10.0}></AdvisorStatementPdf>)
}
