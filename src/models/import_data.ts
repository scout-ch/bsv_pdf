import { AppState } from "../store";
import { Advisor, AdvisorMap } from "./advisor";
import { getAttendancesFromSummary } from "./attendance";
import { Course } from "./course"
import { parseCourseNumber, getAssociation, NoCourseNumberError } from "./course_number";

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
      courseNumber: parseCourseNumber(tupel[5]),
      firstCourseDate: tupel[6],
      lastCourseDate: tupel[7],
      location: tupel[8],
      trainingDays: parseFloat(tupel[9]),
      bsvDays: parseFloat(tupel[10]),
      bsvEligibleParticipationsCount: parseFloat(tupel[11]),
      bsvEligibleAttendances: parseFloat(tupel[13]),
      bsvEligibleAttendance: getAttendancesFromSummary(tupel[12]),
      leaderCount: tupel[14],
      allParticipantsCount: parseFloat(tupel[15]),
      allParticipantsAttendanceSummary: tupel[16],
      allParticipantsAttendances: parseFloat(tupel[17]),
      allParticipantsAttendance: getAttendancesFromSummary(tupel[16]),
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
  return {
    id: tupel[20],
    firstName: tupel[21],
    lastName: tupel[22],
    scoutName: tupel[23],
    address: tupel[24],
    zipcode: tupel[25],
    town: tupel[26],
    country: tupel[27],
    email: tupel[28],
    salutation: tupel[29]
  };
}

export function transform(data: ImportTupel[]): Partial<AppState> {
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
    console.log(course)

    if (course) {
      result.push({ advisor, ...course })
      const canton = getAssociation(course.courseNumber)
      canton && cantons.add(canton)
    }

    return result
  }, [])

  return { courses, advisors, cantons: Array.from(cantons) }
}
