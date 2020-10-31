export class Advisor {
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

  constructor(id: string, firstName: string, lastName: string, scoutName: string, address: string, zipcode: string, town: string, country: string, email: string, salutation: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.scoutName = scoutName
    this.address = address
    this.zipcode = zipcode
    this.town = town
    this.country = country
    this.email = email
    this.salutation = salutation
  }

  toString() {
    return `${this.firstName} ${this.lastName} / ${this.scoutName}`
  }
}


export type AdvisorMap = { [key: string]: Advisor }
