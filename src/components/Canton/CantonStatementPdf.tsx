import React from 'react'
import styles from "./CantonStatementPdf.module.css";
import { CantonStatement, totalAttendanceCount, totalAmount } from "../../models/canton_statement";
import { Footer } from "../Footer";
import { totalAttendance } from "../../models/attendance"
import { formatCourseNumber } from "../../models/course_number";
import { useTranslation } from 'react-i18next'
import { calculateAmount, calculateFixcosts } from '../../models/course';

interface CantonStatementPdfProps {
  statement: CantonStatement;
  lng: string;
}

export function CantonStatementPdf({
  statement, lng
}: CantonStatementPdfProps) {
  const { courses, year, canton, amountPerParticipant, fixcostsPerParticipant } = statement;
  const t = useTranslation().i18n.getFixedT(lng)

  return (
    <div className={styles.document}>
      <p>{t('CantonStatementPdf.locationDateHeader', { date: new Date().toLocaleDateString("de-CH") })}</p>
      <h1 className={styles.title}>{t('CantonStatementPdf.title', { year, canton })}</h1>
      <p>{t('CantonStatementPdf.text', { amountPerParticipant })}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              {t('CantonStatementPdf.Kursnummer')}
              <br />
              {t('CantonStatementPdf.Kursbezeichnung')}
            </th>
            <th>
              {t('CantonStatementPdf.ersterKurstag')}
              <br />
              {t('CantonStatementPdf.letzterKurstag')}
            </th>
            <th className={styles.center}>{t('CantonStatementPdf.AnzTn')}</th>
            <th className={styles.center}>{t('CantonStatementPdf.Tage')}</th>
            <th className={styles.center}>{t('CantonStatementPdf.TageXTn')}</th>
            <th className={styles.center}>
              {t('CantonStatementPdf.TotalTage')}
              <br />
              {t('CantonStatementPdf.Tn')}
            </th>
            <th className={styles.right}>
              {t('CantonStatementPdf.BsvBeitrag')}
              <br />
              {t('CantonStatementPdf.fuerTn')}
            </th>
            <th className={styles.right}>
              {t('CantonStatementPdf.TotalBsv')}
              <br />
              {t('CantonStatementPdf.Beitrag')}
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const attendances = Array.from(course.bsvEligibleAttendance);
            const attendance1 = attendances.shift();
            const attendance2 = attendances.shift();
            const fixcosts = calculateFixcosts(course, fixcostsPerParticipant)
            const amount = calculateAmount(course, amountPerParticipant, fixcostsPerParticipant)

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
                <tr>
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
                  <td>&nbsp;</td>
                </tr>
                {fixcosts > 0 && <tr>
                  <td>
                    {t('CantonStatementPdf.Kosten', { amount: fixcostsPerParticipant.toFixed() })}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td className={styles.right}>{(-fixcosts).toFixed(2)}</td>
                </tr>}
                <tr className={styles.separator}>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td className={styles.right}>
                    {amount.toFixed(2)}
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
            <td className={styles.center}>{t("CantonStatementPdf.Total")}</td>
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
      <Footer lng={lng}></Footer>
    </div >
  );
};
