import { Course } from "./course"

export type Advisor = {
  id: string;
  firstName: string;
  lastName: string;
  scoutName: string;
  address: string;
  zipcode: string;
  town: string;
  country: string;
  email: string;
  salutation: string;
}

export function advisorName(advisor: Advisor) {
  return `${advisor.firstName} ${advisor.lastName} / ${advisor.scoutName}`
}

export type AdvisorStatement = {
  advisor: Advisor;
  courses: Course[];
  year: number;
  amountPerParticipant: number;
}
