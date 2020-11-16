import React, { ReactElement } from 'react'
import { Advisor } from '../models/advisor'
import { Link } from 'react-router-dom'

type Props = {
  advisors: Advisor[];
}

export function AdvisorTable({ advisors }: Props): ReactElement {
  return (
    <table>
      <thead></thead>
      <tbody>
        {advisors.map(advisor => (
          <tr key={advisor.id || Math.random() * 10000000}>
            <td>{advisor.toString()}</td>
            <td><Link to={`/advisors/${advisor.id}`}>PDF</Link></td>
          </tr>
        ))}
      </tbody>
    </table >
  )
}
