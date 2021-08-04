import { Advisor } from './advisor'
import { Attendance } from './attendance';
import { CourseNumber } from './course_number';

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
