import { Advisor } from './advisor'
import { Attendance } from './attendance';

export class NoCourseNumberError extends Error {
}

export class CourseNumber {
  cantonalAssociation?: string;
  regionalAssociation: string;
  year: number
  kind: number
  countNumber: number

  constructor(courseNumberString: string) {
    const regex = new RegExp(/PBS\s?(CH)?\s([a-zA-Z]{2})?\s?(?<kind>\d)(?<regionalAssociation>\d)(?<countNumber>\d)-(?<year>\d{2})/, 'i')
    const match = regex.exec(courseNumberString)
    if (!match) throw new NoCourseNumberError('Not a course number')

    this.cantonalAssociation = match[2]?.toUpperCase()
    this.kind = +match[3]
    this.regionalAssociation = match[4]
    this.countNumber = +match[5]
    this.year = +match[6]
  }

  association(): string {
    if (!this.cantonalAssociation || this.cantonalAssociation === '') return 'CH';
    if (this.cantonalAssociation === 'ZH') return `ZH-${this.regionalAssociation}`;
    return this.cantonalAssociation || '';
  }

  toString(): string {
    const cantonalAssociation = this.cantonalAssociation ? `${this.cantonalAssociation} ` : ''
    return `PBS CH ${cantonalAssociation}${this.kind}${this.regionalAssociation}${this.countNumber}-${this.year}`
  }
}

export type Course = {
  agreementIdFiver: string;
  courseIdFiver: string;
  kind: string;
  courseNumber: CourseNumber;
  firstCourseDate: string;
  lastCourseDate: string;
  location: string;
  trainingDays: number;
  bsvDays: number;
  bsvEligibleParticipationsCount: number;
  bsvEligibleAttendances: number;
  bsvEligibleAttendance: Attendance[];
  leaderCount: string;
  allParticipantsCount: number;
  allParticipantsAttendanceSummary: string;
  allParticipantsAttendances: number;
  allParticipantsAttendance: Attendance[];
  cantonsCount: number;
  languagesCount: number;
  advisor?: Advisor;
}
