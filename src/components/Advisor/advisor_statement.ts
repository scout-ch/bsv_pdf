import { Advisor } from "../../models/advisor";
import { Course } from "../../models/course";

export type AdvisorStatement = {
  advisor: Advisor;
  courses: Course[];
  year: number;
  amountPerParticipant: number;
}
