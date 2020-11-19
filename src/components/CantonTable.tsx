import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

type CourseTableProps = {
  cantons: Set<string>;
}

export const CantonTable: FunctionComponent<CourseTableProps> = ({ cantons }) => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {Array.from(cantons).map(canton => (
          <tr key={canton}>
            <td>{canton}</td>
            <td><Link to={`/cantons/${canton}`}>PDF</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
