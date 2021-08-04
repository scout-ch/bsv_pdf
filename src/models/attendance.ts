
export type Attendance = {
  days: number
  count: number
}

export function totalAttendance(attendance: Attendance) {
  return attendance.days * attendance.count
}

export function getAttendancesFromSummary(participationsString: string): Attendance[] {
  return participationsString.split(',').map(participationString => {
    const values = participationString.split('x')
    return {
      count: parseFloat(values[0]), days: parseFloat(values[1])
    }
  })
}

