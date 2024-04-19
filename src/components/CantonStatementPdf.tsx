import { CantonStatement, totalAttendanceCount, totalAmount } from "../models/canton_statement";
import signature from "../images/signature.png";
import { totalAttendance } from "../models/attendance";
import { formatCourseNumber } from "../models/course_number";
import { useTranslation } from "react-i18next";
import { calculateAmount, calculateFixcosts } from "../models/course";

interface CantonStatementPdfProps {
  statement: CantonStatement;
  lng: string;
}

export function CantonStatementPdf({ statement, lng }: CantonStatementPdfProps) {
  const { courses, year, canton, amountPerParticipant, fixcostsPerParticipant } = statement;
  const { t } = useTranslation([], { lng });

  return (
    <div className="pdf">
      <p>{t("CantonStatementPdf.locationDateHeader", { date: new Date().toLocaleDateString("de-CH") })}</p>
      <h1 className="text-2xl fw-bold">{t("CantonStatementPdf.title", { year, canton })}</h1>
      <p>{t("CantonStatementPdf.text", { amountPerParticipant })}</p>
      <table className="table">
        <thead>
          <tr>
            <th className=" border-solid border-2 border-black">
              {t("CantonStatementPdf.Kursnummer")}
              <br />
              {t("CantonStatementPdf.Kursbezeichnung")}
            </th>
            <th className=" border-solid border-2 border-black">
              {t("CantonStatementPdf.ersterKurstag")}
              <br />
              {t("CantonStatementPdf.letzterKurstag")}
            </th>
            <th className="text-center border-solid border-2 border-black">{t("CantonStatementPdf.AnzTn")}</th>
            <th className="text-center border-solid border-2 border-black">{t("CantonStatementPdf.Tage")}</th>
            <th className="text-center border-solid border-2 border-black">{t("CantonStatementPdf.TageXTn")}</th>
            <th className="text-center border-solid border-2 border-black">
              {t("CantonStatementPdf.TotalTage")}
              <br />
              {t("CantonStatementPdf.Tn")}
            </th>
            <th className="text-right border-solid border-2 border-black">
              {t("CantonStatementPdf.BsvBeitrag")}
              <br />
              {t("CantonStatementPdf.fuerTn")}
            </th>
            <th className="text-right border-solid border-2 border-black">
              {t("CantonStatementPdf.TotalBsv")}
              <br />
              {t("CantonStatementPdf.Beitrag")}
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const attendances = Array.from(course.bsvEligibleAttendance);
            const attendance1 = attendances.shift();
            const attendance2 = attendances.shift();
            const fixcosts = calculateFixcosts(course, fixcostsPerParticipant);
            const amount = calculateAmount(course, amountPerParticipant, fixcostsPerParticipant);

            return (
              <>
                <tr>
                  <td>
                    <strong>{formatCourseNumber(course.courseNumber)}</strong>
                  </td>
                  <td>{course.firstCourseDate}</td>
                  <td className="text-center">{attendance1?.count}</td>
                  <td className="text-center">{attendance1?.days}</td>
                  <td className="text-center">{attendance1 ? totalAttendance(attendance1) : ""}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>{course.kind}</td>
                  <td>{course.lastCourseDate}</td>
                  <td className="text-center">{attendance2?.count}</td>
                  <td className="text-center">{attendance2?.days}</td>
                  <td className="text-center">{attendance2 ? totalAttendance(attendance2) : ""}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                {attendances.map((attendance) => (
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="text-center">{attendance.count}</td>
                    <td className="text-center">{attendance.days}</td>
                    <td className="text-center">{attendance ? totalAttendance(attendance) : ""}</td>
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
                  <td className="text-center">{course.bsvEligibleAttendances}</td>
                  <td className="text-right">{(course.bsvEligibleAttendances * amountPerParticipant).toFixed(2)}</td>
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
                    <td className="text-right">{(-fixcosts).toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black">&nbsp;</td>
                  <td className="border-none border-top-solid border-top-2 border-top-black text-right">
                    {amount.toFixed(2)}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="border-top-solid border-top-2 border-top-black font-bold py-2 px-1"></td>
            <td className=" border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1"></td>
            <td className=" border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1"></td>
            <td className=" border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1"></td>
            <td className="text-center border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1">
              {t("CantonStatementPdf.Total")}
            </td>
            <td className="text-center border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1">
              {totalAttendanceCount(statement)}
            </td>
            <td className="text-right border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1">
              {totalAmount(statement).toFixed(2)}
            </td>
            <td className="text-right border-none border-top-solid border-top-2 border-top-black font-bold py-2 px-1">
              {totalAmount(statement).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <footer>
        <p>{t("Footer.Greeting")}</p>
        <img className="signature" src={signature} alt="Signature" />
        <p>{t("Footer.Address")}</p>
      </footer>
    </div>
  );
}
