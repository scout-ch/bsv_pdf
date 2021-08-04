import React from 'react'
import { Course } from '../models/course'
import { formatCourseNumber } from "../models/course_number"

type CourseTableProps = {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <table>
      <thead></thead>
      <tbody>
        {courses.map(course => (
          <tr key={formatCourseNumber(course.courseNumber)}>
            <td>{formatCourseNumber(course.courseNumber)}</td>
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
