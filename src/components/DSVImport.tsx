import React from 'react';
import { extractAdvisor, extractCourse, ImportTupel } from '../models/import_data'
import { AdvisorMap } from '../models/advisor';
import { Course } from '../models/course';
import { parse } from 'papaparse';

export type ImportResult = {
  courses: Course[];
  advisors: AdvisorMap;
}

const transform = (data: ImportTupel[]): ImportResult => {
  const advisors: AdvisorMap = {}
  const courses: Course[] = data.reduce((result: Course[], tupel) => {
    const advisorId = tupel[21]
    if (!advisors[advisorId]) advisors[advisorId] = extractAdvisor(tupel);
    const advisor = advisors[advisorId];
    const course = extractCourse(tupel)
    course && result.push({ advisor, ...course })
    return result
  }, [])

  return { courses, advisors }
}

export interface Props {
  onChange?: (value: ImportResult) => void;
}

export const DSVImport = ({ onChange }: Props): React.ReactElement<Props> => {

  const reader = new FileReader()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files && event.target.files[0]
    file && reader.readAsText(file, 'iso88591');
  };
  reader.onload = (event) => {
    parse(event.target?.result as string, {
      complete: ({ data }: { data: ImportTupel[] }) => {
        onChange && onChange(transform(data));
      }
    });
  }

  return <input type="file" onChange={handleChange} />;
};

