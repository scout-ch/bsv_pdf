import { PDFDownloadLink } from '@react-pdf/renderer'
import React, { ReactElement } from 'react'
import { Course } from '../../models/course'
import { AdvisorStatementPdf } from '../AdvisorStatement/AdvisorStatementPdf'

type CourseTableProps = {
  courses: Course[];
}

export const CourseTable = ({ courses }: CourseTableProps): ReactElement => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.courseNumber.toString()}>
            <td>{course.courseNumber.toString()}</td>
            <td>{course.courseNumber.cantonalAssociation}</td>
            <td>{course.kind}</td>
            <td>
              {course.advisor && <PDFDownloadLink document={
                <AdvisorStatementPdf
                  amountPerCourse={100.0}
                  year={2020}
                  advisor={course.advisor}
                  courses={courses.filter(c => c.advisor?.id === course.advisor?.id)}
                ></AdvisorStatementPdf>
              }
              >{course.advisor?.toString()}</PDFDownloadLink>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
