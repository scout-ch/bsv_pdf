import { CantonStatement, totalAttendanceCount, totalAmount } from "../models/canton_statement";
import { totalAttendance } from "../models/attendance";
import { formatCourseNumber } from "../models/course_number";
import { useTranslation } from "react-i18next";
import { calculateAmount, calculateFixcosts } from "../models/course";
import { useStore } from "../store";

interface CantonStatementPdfProps {
  statement: CantonStatement;
  lng: string;
}

export function CantonStatementPdf({ statement, lng }: CantonStatementPdfProps) {
  const { courses, year, canton, amountPerParticipant, fixcostsPerParticipant } = statement;
  const { t } = useTranslation([], { lng });
  const { footer, signature } = useStore();

  return (
    <div className="pdf">
      <header>
        <img src="/pbs.png" width="80" alt="PBS Logo" />
        <p>{t("CantonStatementPdf.locationDateHeader", { date: new Date().toLocaleDateString("de-CH") })}</p>
      </header>
      <h1>{t("CantonStatementPdf.title", { year, canton })}</h1>
      <p>{t("CantonStatementPdf.text", { amountPerParticipant })}</p>
      <table>
        <thead>
          <tr>
            <th>
              {t("CantonStatementPdf.Kursnummer")}
              <br />
              {t("CantonStatementPdf.Kursbezeichnung")}
            </th>
            <th>
              {t("CantonStatementPdf.ersterKurstag")}
              <br />
              {t("CantonStatementPdf.letzterKurstag")}
            </th>
            <th>{t("CantonStatementPdf.AnzTn")}</th>
            <th>{t("CantonStatementPdf.Tage")}</th>
            <th>{t("CantonStatementPdf.TageXTn")}</th>
            <th>
              {t("CantonStatementPdf.TotalTage")}
              <br />
              {t("CantonStatementPdf.Tn")}
            </th>
            <th>
              {t("CantonStatementPdf.BsvBeitrag")}
              <br />
              {t("CantonStatementPdf.fuerTn")}
            </th>
            <th>
              {t("CantonStatementPdf.TotalBsv")}
              <br />
              {t("CantonStatementPdf.Beitrag")}
            </th>
          </tr>
        </thead>
        {courses.map((course) => {
          const attendances = Array.from(course.bsvEligibleAttendance);
          const attendance1 = attendances.shift();
          const attendance2 = attendances.shift();
          const fixcosts = calculateFixcosts(course, fixcostsPerParticipant);
          const amount = calculateAmount(course, amountPerParticipant, fixcostsPerParticipant);
          return (
            <tbody>
              <tr>
                <td>
                  <strong>{formatCourseNumber(course.courseNumber)}</strong>
                </td>
                <td>{course.firstCourseDate}</td>
                <td>{attendance1?.count}</td>
                <td>{attendance1?.days}</td>
                <td>{attendance1 ? totalAttendance(attendance1) : ""}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>{course.kind}</td>
                <td>{course.lastCourseDate}</td>
                <td>{attendance2?.count}</td>
                <td>{attendance2?.days}</td>
                <td>{attendance2 ? totalAttendance(attendance2) : ""}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              {attendances.map((attendance) => (
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>{attendance.count}</td>
                  <td>{attendance.days}</td>
                  <td>{attendance ? totalAttendance(attendance) : ""}</td>
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
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{course.bsvEligibleAttendances}</td>
                <td>{(course.bsvEligibleAttendances * amountPerParticipant).toFixed(2)}</td>
                <td>&nbsp;</td>
              </tr>
              {fixcosts > 0 && (
                <tr>
                  <td>{t("CantonStatementPdf.Kosten", { amount: fixcostsPerParticipant.toFixed() })}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>{(-fixcosts).toFixed(2)}</td>
                </tr>
              )}
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{amount.toFixed(2)}</td>
              </tr>
            </tbody>
          );
        })}
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{t("CantonStatementPdf.Total")}</td>
            <td>{totalAttendanceCount(statement)}</td>
            <td>{totalAmount(statement).toFixed(2)}</td>
            <td>{totalAmount(statement).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <footer>
        <p>{t("Footer.Greeting")}</p>
        <img className="signature" src={signature} alt="Signature" />
        <p>{footer}</p>
      </footer>
    </div>
  );
}
