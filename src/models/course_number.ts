export class NoCourseNumberError extends Error {
}

export type CourseNumber = {
  cantonalAssociation?: string;
  regionalAssociation: string;
  year: number
  kind: number
  countNumber: number
}

export function parseCourseNumber(courseNumberString: string): CourseNumber {
  const regex = new RegExp(/PBS\s?(CH)?\s([a-zA-Z]{2})?\s?(?<kind>\d)(?<regionalAssociation>\d)(?<countNumber>\d)-(?<year>\d{2})/, 'i')
  const match = regex.exec(courseNumberString)
  if (!match) throw new NoCourseNumberError('Not a course number')

  return {
    cantonalAssociation: match[2]?.toUpperCase(),
    kind: +match[3],
    regionalAssociation: match[4],
    countNumber: +match[5],
    year: +match[6],
  }
}

export function getAssociation(courseNumber: CourseNumber): string {
  if (!courseNumber.cantonalAssociation || courseNumber.cantonalAssociation === '') return 'CH';
  if (courseNumber.cantonalAssociation === 'ZH') return `ZH-${courseNumber.regionalAssociation}`;
  return courseNumber.cantonalAssociation || '';
}

export function formatCourseNumber(courseNumber: CourseNumber): string {
  const cantonalAssociation = courseNumber.cantonalAssociation ? `${courseNumber.cantonalAssociation} ` : ''
  return `PBS CH ${cantonalAssociation}${courseNumber.kind}${courseNumber.regionalAssociation}${courseNumber.countNumber}-${courseNumber.year}`
}
