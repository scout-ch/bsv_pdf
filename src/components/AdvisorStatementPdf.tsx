import { jsPDF } from "jspdf";
import jspdfTable from 'jspdf-autotable'
import React, { ReactElement } from 'react';
import { Advisor } from '../models/advisor';
import { Course } from '../models/course';
import signature from '../images/signature.png'

export type AdvisorStatement = {
  advisor: Advisor;
  courses: Course[];
  year: number;
  amountPerCourse: number;
}

export function generatePdf({ advisor, courses, year, amountPerCourse }: AdvisorStatement): void {
  const document = new jsPDF();
  const pageMargin = 20
  const innerWidth = document.internal.pageSize.getWidth() - (2 * pageMargin)
  let cursor = pageMargin

  document.setFontSize(10)
  document.text([
    `${advisor.firstName} ${advisor.lastName}`,
    `${advisor.address}`,
    `${advisor.zipcode} ${advisor.town} ${advisor.country}`
  ], pageMargin, cursor)
  cursor += 60
  document.setFontSize(14)
  document.text(`LKB Entschädigung ${year}`, pageMargin, cursor)
  cursor += 10
  document.setFontSize(10)
  document.text([
    `${advisor.salutation}\n`,
    `Im vergangenen Jahr hast Du die unten aufgeführten Kurse betreut. Dafür erhälst Du heute die LKB Entschädigung.`
  ], pageMargin, cursor, { maxWidth: innerWidth })
  cursor += 20
  jspdfTable(document, {
    // head: {
    //   key: 'Kursschlüssel', kind: 'Kursart J+S LS/T', pbs_kind: 'PBS Kursart', amount: 'Entschädigung'
    // },
    body: courses.map<string[]>(course => {
      return [course.courseNumber.toString(), course.kind, course.kind, amountPerCourse.toFixed(2)]
    })
  })
  // + [[null, null, "Total", format('%0.2f', courses.length * amountPerCourse)]]

  // @document.table table_data, column_widths: [110, 150, 150, 80, 80], cell_style: { padding: [2, 4, 2, 4] } do
  //   cells.style(size: 8, border_width: 1)
  //       column(-1).style(align: : right)
  //       column(0).style(font_style: : bold)
  // row(0).style(font_style: : bold)
  // row(-1).style(borders: [: top], font_style: : bold)
  // end

  document.text([
    "Nochmals besten Dank für Deinen Einsatz als Leiterkursbetreuer sowie für die Begeisterung und die Zeit, die Du dafür einsetzt. Ich hoffe sehr, dass wir auch in Zukunft auf Deine Hilfe zählen können.\n\n",
    "Mit herzlichen Pfadigrüssen"], pageMargin, cursor, { maxWidth: innerWidth })
  cursor += 10
  document.addImage(signature, 'PNG', pageMargin, cursor, 30, 10)

  cursor += 10
  document.text([`Sonja Dietrich`,
    "Ausbildungssekretariat PBS",
    "Direktwahl: 031 328 05 42",
    "E-Mail: sonja.dietrich@pbs.ch"], pageMargin, cursor)

  document.output('datauri')
}

export function AdvisorStatementPdfLink(advisorStatement: AdvisorStatement): ReactElement {
  return (<button onClick={() => generatePdf(advisorStatement)}>PDF</button>)
}

