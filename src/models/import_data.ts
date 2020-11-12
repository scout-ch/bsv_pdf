import { Advisor } from "./advisor";
import { Attendance } from "./attendance";
import { Course, CourseNumber, NoCourseNumberError } from "./course";

export function getAdvisorId(tupel: ImportTupel): string {
  return tupel[20]
}

export type ImportTupel = [
  string, string, string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string, string, string
]

export function extractCourse(tupel: ImportTupel): Course | null {
  try {
    return {
      agreementIdFiver: tupel[0],
      courseIdFiver: tupel[1],
      kind: tupel[2],
      courseNumber: new CourseNumber(tupel[5]),
      firstCourseDate: tupel[6],
      lastCourseDate: tupel[7],
      location: tupel[8],
      trainingDays: tupel[9],
      bsvDays: tupel[10],
      bsvEligibleParticipationsCount: tupel[11],
      bsvEligibleAttendances: tupel[13],
      bsvEligibleAttendance: Attendance.fromAttendanceSummary(tupel[12]),
      leaderCount: tupel[14],
      allParticipantsCount: tupel[15],
      allParticipantsAttendanceSummary: tupel[16],
      allParticipantsAttendances: tupel[17],
      allParticipantsAttendance: Attendance.fromAttendanceSummary(tupel[16]),
      cantonsCount: tupel[18],
      languagesCount: tupel[19]
    }
  } catch (e) {
    if (e instanceof NoCourseNumberError) {
      return null;
    }
    else {
      throw e;
    }
  }
}

export function extractAdvisor(tupel: ImportTupel): Advisor {
  return new Advisor(
    tupel[20],
    tupel[21],
    tupel[22],
    tupel[23],
    tupel[24],
    tupel[25],
    tupel[26],
    tupel[27],
    tupel[28],
    tupel[29]);
}
