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
  leaderCount: number;
  allParticipantsCount: number;
  allParticipantsAttendanceSummary: string;
  allParticipantsAttendances: number;
  allParticipantsAttendance: Attendance[];
  cantonsCount: number;
  languagesCount: number;
  advisor?: Advisor;
}

export function calculateFixcosts(course: Course, fixcostsPerParticipant: number) {
  if (!course.kind.startsWith("Basiskurs") && !course.kind.startsWith("Cours de base")) return 0;
  const participantsCount = (course.allParticipantsCount - course.leaderCount)

  return participantsCount * fixcostsPerParticipant;
}

export function calculateAmount(course: Course, amountPerParticipant: number, fixcostsPerParticipant: number) {
  return course.bsvEligibleAttendances * amountPerParticipant - calculateFixcosts(course, fixcostsPerParticipant)
}
