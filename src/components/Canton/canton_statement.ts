import { Advisor } from "./advisor";
import { Course } from "./course";


export type AdvisorStatement = {
  advisor: Advisor;
  courses: Course[];
  year: number;
  amountPerCourse: number;
}
