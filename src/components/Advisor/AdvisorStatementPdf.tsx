import React from "react";
import styles from "./AdvisorStatementPdf.module.css";
import { AdvisorStatement } from "../../models/advisor";
import { Footer } from "../Footer";
import { formatCourseNumber } from "../../models/course_number";
import { useTranslation } from "react-i18next";

interface AdvisorStatementPdfProps extends AdvisorStatement {
  lng: string;
}

export function AdvisorStatementPdf({ advisor, courses, year, amountPerParticipant, lng }: AdvisorStatementPdfProps) {
  const t = useTranslation().i18n.getFixedT(lng)

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
      <h1 className={styles.title}>{t('AdvisorStatementPdf.title', { year })}</h1>
      <p>{advisor.salutation}</p>
      <p>{t('AdvisorStatementPdf.text')}
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t("AdvisorStatementPdf.Kursschluessel")}</th>
            <th>{t("AdvisorStatementPdf.KursartJS")}</th>
            <th>{t("AdvisorStatementPdf.KursartPBS")}</th>
            <th className={styles.right}>{t("AdvisorStatementPdf.Entschaedingung")}</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
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
            <td>{t("AdvisorStatementPdf.Total")}</td>
            <td className={styles.right}>
              {(courses.length * amountPerParticipant).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <p>{t("AdvisorStatementPdf.thank")}
      </p>
      <Footer lng={lng}></Footer>
    </div>
  );
};
