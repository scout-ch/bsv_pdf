import { Course } from "./course";


export class CantonStatement {
  courses: Course[];
  year: number;
  amountPerParticipant: number;
  canton: string;

  constructor(courses: Course[], year: number, amountPerParticipant: number, canton: string) {
    this.courses = courses;
    this.year = year;
    this.amountPerParticipant = amountPerParticipant;
    this.canton = canton
  }

  totalAttendanceCount(): number {
    return this.courses.reduce((sum, course) => sum + course.bsvEligibleAttendances, 0.0);
  }

  totalAmount(): number {
    return this.totalAttendanceCount() * this.amountPerParticipant;
  }
}
