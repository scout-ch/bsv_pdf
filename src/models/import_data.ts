import { Advisor, AdvisorMap } from "./advisor";
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

export type ImportResult = {
  courses: Course[];
  advisors: AdvisorMap;
  cantons: Set<string>;
}

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
      trainingDays: parseInt(tupel[9]),
      bsvDays: parseInt(tupel[10]),
      bsvEligibleParticipationsCount: parseInt(tupel[11]),
      bsvEligibleAttendances: parseInt(tupel[13]),
      bsvEligibleAttendance: Attendance.fromAttendanceSummary(tupel[12]),
      leaderCount: tupel[14],
      allParticipantsCount: parseInt(tupel[15]),
      allParticipantsAttendanceSummary: tupel[16],
      allParticipantsAttendances: parseInt(tupel[17]),
      allParticipantsAttendance: Attendance.fromAttendanceSummary(tupel[16]),
      cantonsCount: parseInt(tupel[18]),
      languagesCount: parseInt(tupel[19])
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

export function extractAdvisor(tupel: ImportTupel): Advisor | null {
  if (!tupel[20]) return null;
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

export const transform = (data: ImportTupel[]): ImportResult => {
  const advisors: AdvisorMap = {}
  const cantons: Set<string> = new Set<string>();
  const courses: Course[] = data.reduce((result: Course[], tupel) => {
    const advisorId = tupel[20]
    if (!advisors[advisorId]) {
      const newAdvisor = extractAdvisor(tupel);
      newAdvisor && (advisors[advisorId] = newAdvisor)
    }
    const advisor = advisors[advisorId];
    const course = extractCourse(tupel)
    const canton = course && course.courseNumber.association()
    course && result.push({ advisor, ...course })
    canton && cantons.add(canton)
    return result
  }, [])

  return { courses, advisors, cantons }
}
