import React, { FunctionComponent, ReactElement } from "react";
import styles from "./AdvisorStatementPdf.module.css";
import { AdvisorStatement } from "../../models/advisor";
import { Footer } from "../Footer";
import { formatCourseNumber } from "../../models/course_number";

export const AdvisorStatementPdf: FunctionComponent<AdvisorStatement> = ({
  advisor,
  courses,
  year,
  amountPerParticipant,
}) => {
  return (
    <div className={styles.document}>
      <p>
        {`${advisor.firstName} ${advisor.lastName}`}
        <br />
        {`${advisor.address}`}
        <br />
        {`${advisor.zipcode} ${advisor.town} ${advisor.country}`}
        <br />
      </p>
      <h1 className={styles.title}>{`LKB Entschädigung ${year}`}</h1>
      <p>{advisor.salutation}</p>
      <p>
        {
          "Im vergangenen Jahr hast Du die unten aufgeführten Kurse betreut. Dafür erhälst Du heute die LKB Entschädigung."
        }
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{"Kursschlüssel"}</th>
            <th>{"Kursart J+S LS/T"}</th>
            <th>{"PBS Kursart"}</th>
            <th className={styles.right}>{"Entschädigung"}</th>
          </tr>
        </thead>
        <tbody>
          {courses.map<ReactElement>((course) => {
            return (
              <tr>
                <td>{formatCourseNumber(course.courseNumber)}</td>
                <td>{course.kind}</td>
                <td>{course.kind}</td>
                <td className={styles.right}>
                  {amountPerParticipant.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>{"Total"}</td>
            <td className={styles.right}>
              {(courses.length * amountPerParticipant).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <p>
        {
          "Nochmals besten Dank für Deinen Einsatz als Leiterkursbetreuer sowie für die Begeisterung und die Zeit, die Du dafür einsetzt. Ich hoffe sehr, dass wir auch in Zukunft auf Deine Hilfe zählen können."
        }
      </p>
      <Footer></Footer>
    </div>
  );
};
