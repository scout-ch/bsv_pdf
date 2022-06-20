import { calculateAmount, Course } from "./course";

export type CantonStatement = {
  courses: Course[];
  year: number;
  amountPerParticipant: number;
  fixcostsPerParticipant: number;
  canton: string;
}


export function totalAttendanceCount(cantonStatement: CantonStatement): number {
  return cantonStatement.courses.reduce((sum, course) => sum + course.bsvEligibleAttendances, 0.0);
}

export function totalAmount(cantontStatement: CantonStatement): number {
  const { amountPerParticipant, fixcostsPerParticipant, courses } = cantontStatement
  return courses.reduce((sum, course) => sum + calculateAmount(course, amountPerParticipant, fixcostsPerParticipant), 0.0);
}
