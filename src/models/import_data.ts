import { Advisor } from "./advisor";
import { Attendance } from "./attendance";
import { Course, CourseNumber } from "./course";

export type ImportData = {
  agreementIdFiver: string;
  courseIdFiver: string;
  kind: string;
  cantonalAssociation: string;
  regionalAssociation: string;
  courseNumberString: string;
  firstCourseDate: string;
  lastCourseDate: string;
  location: string;
  trainingDays: string;
  bsvDays: string;
  bsvEligibleParticipationsCount: string;
  bsvEligibleAttendanceSummary: string;
  bsvEligibleAttendances: string;
  leaderCount: string;
  allParticipantsCount: string;
  allParticipantsAttendanceSummary: string;
  allParticipantsAttendances: string;
  cantonsCount: string;
  languagesCount: string;
  advisor_id: string;
  advisor_firstName: string;
  advisor_lastName: string;
  advisor_scoutName: string;
  advisor_address: string;
  advisor_zipcode: string;
  advisor_place: string;
  advisor_country: string;
  advisor_email: string;
  advisor_salutation: string;
};

export function extractCourse(data: ImportData): Course {
  return {
    agreementIdFiver: data.agreementIdFiver,
    courseIdFiver: data.courseIdFiver,
    kind: data.kind,
    courseNumber: new CourseNumber(data.courseNumberString),
    firstCourseDate: data.firstCourseDate,
    lastCourseDate: data.lastCourseDate,
    location: data.location,
    trainingDays: data.trainingDays,
    bsvDays: data.bsvDays,
    bsvEligibleParticipationsCount: data.bsvEligibleParticipationsCount,
    bsvEligibleAttendances: data.bsvEligibleAttendances,
    bsvEligibleAttendance: Attendance.fromAttendanceSummary(data.bsvEligibleAttendanceSummary),
    leaderCount: data.leaderCount,
    allParticipantsCount: data.allParticipantsCount,
    allParticipantsAttendanceSummary: data.allParticipantsAttendanceSummary,
    allParticipantsAttendances: data.allParticipantsAttendances,
    allParticipantsAttendance: Attendance.fromAttendanceSummary(data.allParticipantsAttendanceSummary),
    cantonsCount: data.cantonsCount,
    languagesCount: data.languagesCount
  }
}

export function extractAdvisor(data: ImportData): Advisor {
  return new Advisor(
    data.advisor_id,
    data.advisor_firstName,
    data.advisor_lastName,
    data.advisor_scoutName,
    data.advisor_address,
    data.advisor_zipcode,
    data.advisor_place,
    data.advisor_country,
    data.advisor_email,
    data.advisor_salutation)
}
