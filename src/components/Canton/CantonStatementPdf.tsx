import React from "react";
import styles from "./CantonStatementPdf.module.css";
import { CantonStatement, totalAttendanceCount, totalAmount } from "../../models/canton_statement";
import { Footer } from "../Footer";
import { totalAttendance } from "../../models/attendance"
import { formatCourseNumber } from "../../models/course_number";

interface CantonStatementPdfProps {
  statement: CantonStatement;
}

export function CantonStatementPdf({
  statement,
}: CantonStatementPdfProps) {
  const { courses, year, canton, amountPerParticipant } = statement;

  return (
    <div className={styles.document}>
      <p>{`Bern, ${new Date().toLocaleDateString("de-CH")}`}</p>
      <h1
        className={styles.title}
      >{`Auszahlung der Kurs-Subventionen des KV ${canton} ${year}`}</h1>
      <p>
        {
          "In diesen Tagen können wir Euch die Kurs-Subventionen des BSV für die bis heute abgerechneten Kurse überweisen. Wir bitten Euch, Euren Kassierer darüber zu informieren."
        }
      </p>
      <p>{`Der Tagesansatz ist aktuell CHF ${amountPerParticipant} / TN`}</p>
      <p>
        {
          "Ohne Euren Gegenbericht innert 20 Tagen gehen wir davon aus, dass Ihr mit den unten aufgeführten Angaben einverstanden seid."
        }
      </p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              {"Kursnummer"}
              <br />
              {"Kursbezeichnung"}
            </th>
            <th>
              {"erster Kurstag"}
              <br />
              {"letzter Kurstag"}
            </th>
            <th className={styles.center}>{"# Tn"}</th>
            <th className={styles.center}>{"Tage"}</th>
            <th className={styles.center}>{"Tage\nx Tn"}</th>
            <th className={styles.center}>
              {"Total Tage"}
              <br />
              {"Tn"}
            </th>
            <th className={styles.right}>
              {"BSV Beitrag"}
              <br />
              {"für Tn"}
            </th>
            <th className={styles.right}>
              {"Total BSV"}
              <br />
              {"Beitrag"}
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const attendances = Array.from(course.bsvEligibleAttendance);
            const attendance1 = attendances.shift();
            const attendance2 = attendances.shift();
            return (
              <>
                <tr>
                  <td>
                    <strong>{formatCourseNumber(course.courseNumber)}</strong>
                  </td>
                  <td>{course.firstCourseDate}</td>
                  <td className={styles.center}>{attendance1?.count}</td>
                  <td className={styles.center}>{attendance1?.days}</td>
                  <td className={styles.center}>{attendance1 ? totalAttendance(attendance1) : ''}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>{course.kind}</td>
                  <td>{course.lastCourseDate}</td>
                  <td className={styles.center}>{attendance2?.count}</td>
                  <td className={styles.center}>{attendance2?.days}</td>
                  <td className={styles.center}>{attendance2 ? totalAttendance(attendance2) : ''}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                {attendances.map((attendance) => (
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className={styles.center}>{attendance.count}</td>
                    <td className={styles.center}>{attendance.days}</td>
                    <td className={styles.center}>{attendance ? totalAttendance(attendance) : ''}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                ))}
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className={styles.separator}>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td className={styles.center}>
                    {course.bsvEligibleAttendances}
                  </td>
                  <td className={styles.right}>
                    {(
                      course.bsvEligibleAttendances * amountPerParticipant
                    ).toFixed(2)}
                  </td>
                  <td className={styles.right}>
                    {(
                      course.bsvEligibleAttendances * amountPerParticipant
                    ).toFixed(2)}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className={styles.center}>{"Total"}</td>
            <td className={styles.center}>{totalAttendanceCount(statement)}</td>
            <td className={styles.right}>
              {totalAmount(statement).toFixed(2)}
            </td>
            <td className={styles.right}>
              {totalAmount(statement).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <Footer></Footer>
    </div>
  );
};
