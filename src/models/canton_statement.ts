import { Course } from "./course";

export type CantonStatement = {
  courses: Course[];
  year: number;
  amountPerParticipant: number;
  canton: string;
}


export function totalAttendanceCount(cantonStatement: CantonStatement): number {
  return cantonStatement.courses.reduce((sum, course) => sum + course.bsvEligibleAttendances, 0.0);
}

export function totalAmount(cantontStatement: CantonStatement): number {
  return totalAttendanceCount(cantontStatement) * cantontStatement.amountPerParticipant;
}
