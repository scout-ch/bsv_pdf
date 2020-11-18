import React, { ReactElement } from 'react';
import signature from '../../images/signature.png'
import styles from './AdvisorStatementPdf.module.css'
import { AdvisorStatement } from '../../models/advisor_statement'

export function AdvisorStatementPdf({ advisor, courses, year, amountPerCourse }: AdvisorStatement): ReactElement {
  return (
    <div className={styles.document}>
      <p>
        {`${advisor.firstName} ${advisor.lastName}`}<br />
        {`${advisor.address}`}<br />
        {`${advisor.zipcode} ${advisor.town} ${advisor.country}`}<br />
      </p>
      <h1 className={styles.title}>{`LKB Entschädigung ${year}`}</h1>
      <p>{advisor.salutation}</p>
      <p>{"Im vergangenen Jahr hast Du die unten aufgeführten Kurse betreut. Dafür erhälst Du heute die LKB Entschädigung."}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{'Kursschlüssel'}</th>
            <th>{'Kursart J+S LS/T'}</th>
            <th>{'PBS Kursart'}</th>
            <th className={styles.right}>{'Entschädigung'}</th>
          </tr>
        </thead>
        <tbody>
          {courses.map<ReactElement>(course => {
            return (<tr>
              <td>{course.courseNumber.toString()}</td>
              <td>{course.kind}</td>
              <td>{course.kind}</td>
              <td className={styles.right}>{amountPerCourse.toFixed(2)}</td>
            </tr>)
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>{'Total'}</td>
            <td className={styles.right}>{(courses.length * amountPerCourse).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p>{"Nochmals besten Dank für Deinen Einsatz als Leiterkursbetreuer sowie für die Begeisterung und die Zeit, die Du dafür einsetzt. Ich hoffe sehr, dass wir auch in Zukunft auf Deine Hilfe zählen können."}</p>
      <p>{"Mit herzlichen Pfadigrüssen"}</p>
      <img className={styles.signature} src={signature} alt="Signature" />
      <p>
        {`Sonja Dietrich`}<br />
        {"Ausbildungssekretariat PBS"}<br />
        {"Direktwahl: 031 328 05 42"}<br />
        {"E-Mail: sonja.dietrich@pbs.ch"}
      </p>
    </div >
  )
}


