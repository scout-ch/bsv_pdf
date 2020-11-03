import React, { ReactElement } from 'react'
import { Course } from '../models/course'

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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
