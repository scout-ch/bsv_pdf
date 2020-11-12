import React, { ReactElement } from 'react'
import { Advisor } from '../models/advisor'
import { Course } from '../models/course'
import { AdvisorStatementPdfLink } from './AdvisorStatementPdf'

type Props = {
  advisors: Advisor[];
  courses: Course[];
}



export function AdvisorTable({ advisors, courses }: Props): ReactElement {
  return (
    <table>
      <thead></thead>
      <tbody>
        {advisors.map(advisor => (
          <tr key={advisor.id || Math.random() * 10000000}>
            <td>{advisor.toString()} </td>
            <td><AdvisorStatementPdfLink advisor={advisor} year={2020} amountPerCourse={10.0} courses={courses.filter(course => course.advisor?.id === advisor.id)}></AdvisorStatementPdfLink></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
