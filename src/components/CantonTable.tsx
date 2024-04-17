import { Link } from '@tanstack/react-router'

type CourseTableProps = {
  cantons: string[];
}

export function CantonTable({ cantons }: CourseTableProps) {
  return (
    <table>
      <thead></thead>
      <tbody>
        {cantons.map(canton => (
          <tr key={canton}>
            <td>{canton}</td>
            <td><Link to="/cantons/$id" params={{ id: canton}}>PDF</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
