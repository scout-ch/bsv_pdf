import React from 'react';
import { extractAdvisor, extractCourse, ImportData } from '../models/import_data'
import {
  DSVImport as Import,
  ColumnType,
  useDSVImport,
} from 'react-dsv-import';
import { AdvisorMap } from '../models/advisor';
import { Course } from '../models/course';

export type ImportResult = {
  courses: Course[];
  advisors: AdvisorMap;
}

const FileInput: React.FC = () => {
  const [, dispatch] = useDSVImport();
  const reader = new FileReader();
  // const decoder = new TextDecoder("utf-8");
  reader.onload = () => {
    const result = reader.result as string
    result && dispatch({ type: 'setRaw', raw: result });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files
    files && reader.readAsText(files[0], 'iso88591');
  };

  return <input type="file" onChange={handleChange} />;
};

const transform = (importData: ImportData[]): ImportResult => {
  const advisors: AdvisorMap = {}
  const courses: Course[] = importData.reduce((result: Course[], importDataTupel) => {
    if (!advisors[importDataTupel.advisor_id]) advisors[importDataTupel.advisor_id] = extractAdvisor(importDataTupel);
    const advisor = advisors[importDataTupel.advisor_id];

    try {
      result.push({ advisor: advisor, ...extractCourse(importDataTupel) })
    } catch {
      console.log(importDataTupel)
    }
    return result
  }, [])

  return { courses, advisors }
}

const columns: ColumnType<ImportData>[] = [
  { key: "agreementIdFiver", label: "Vereinbarung-ID-FiVer" },
  { key: "courseIdFiver", label: "Kurs-ID-FiVer" },
  { key: "kind", label: "Kursart" },
  { key: "cantonalAssociation", label: "Kantonalverband" },
  { key: "regionalAssociation", label: "Regionalverband" },
  { key: "courseNumberString", label: "Kursnummer" },
  { key: "firstCourseDate", label: "Start Datum" },
  { key: "lastCourseDate", label: "End Datum" },
  { key: "location", label: "Kursort" },
  { key: "trainingDays", label: "Ausbildungstage" },
  { key: "bsvDays", label: "BSV Tage" },
  { key: "bsvEligibleParticipationsCount", label: "Berechtigte Teilnehmende(17 - 30)" },
  { key: "bsvEligibleAttendanceSummary", label: " x Tage" },
  { key: "bsvEligibleAttendances", label: "Berechtigte Tage" },
  { key: "leaderCount", label: "Kursleitende" },
  { key: "allParticipantsCount", label: "Teilnehmende Total(inkl.Kursleitende)" },
  { key: "allParticipantsAttendanceSummary", label: "Teilnehmende Total x Tage" },
  { key: "allParticipantsAttendances", label: "Total Tage" },
  { key: "cantonsCount", label: "Wohnkantone der TN" },
  { key: "languagesCount", label: "Sprachen" },
  { key: "advisor_id", label: "LKB Personen-ID" },
  { key: "advisor_firstName", label: "LKB Vorname" },
  { key: "advisor_lastName", label: "LKB Nachname" },
  { key: "advisor_scoutName", label: "LKB Pfadiname" },
  { key: "advisor_address", label: "LKB Adresse" },
  { key: "advisor_zipcode", label: "LKB PLZ" },
  { key: "advisor_place", label: "LKB Ort" },
  { key: "advisor_country", label: "LKB Land" },
  { key: "advisor_email", label: "LKB Email" },
  { key: "advisor_salutation", label: "LKB Anrede" }
];

export interface Props {
  onChange?: (value: ImportResult) => void;
}

export const DSVImport = ({ onChange }: Props): React.ReactElement<Props> => {

  return (
    <Import<ImportData>
      columns={columns}
      onChange={(value) => onChange && onChange(transform(value))}
    >
      <FileInput></FileInput>
    </Import>
  );
};

