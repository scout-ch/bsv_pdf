
export class Attendance {
  days: number
  count: number

  constructor(count: number = 0, days: number = 0) {
    this.count = count
    this.days = days
  }

  total() {
    return this.days * this.count
  }

  static fromAttendanceSummary(participationsString: string): Attendance[] {
    return participationsString.split(',').map(participationString => {
      const values = participationString.split('x')
      return new Attendance(+values[0], +values[1])
    })
  }
}

