import React, { ReactElement, useState } from 'react';
import { ColumnType, DSVImport } from 'react-dsv-import';
import './App.css';
import { CourseTable } from './components/CourseTable';
import { AdvisorMap } from './models/advisor';
import { Course } from './models/course';
import { extractAdvisor, extractCourse, ImportData } from './models/import_data';
import { AdvisorTable } from './components/AdvisorTable';


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

const transformImportData = (importData: ImportData[]): AppState => {

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

type AppState = {
  courses: Course[];
  advisors: AdvisorMap;
}

function App(): ReactElement {
  const [state, setState] = useState<AppState>({ courses: [], advisors: {} });
  const handleChange = (data: ImportData[]) => setState(transformImportData(data));
  const { courses } = state;

  return (
    <div>
      <DSVImport<ImportData> columns={columns} onChange={handleChange} >
        <DSVImport.TextareaInput />
      </DSVImport>
      <textarea defaultValue={`1023;PFAD12;Coachkurs;;;PBS CH 761-20;21.02.2020;23.02.2020;Rolf-Balsiger-Strasse 8, 8044 Zürich;2.5;2.5;27;27x2.5;67.5;5;31;1x0, 31x2.5;77.5;11;1;44896;Dominique;Schneider;Pinky;Herbstweg 31;8050;Zürich;;dominique.schneider@pbs.ch;Lieber Pinky
1023;PFAD03;Einführungskurs Piostufe;;;PBS CH 831-20;21.02.2020;23.02.2020;Pfadiheim Breite, Breiteholzstrasse 2, 8400 Winterhur;2.5;2.5;36;1x1, 1x1.5, 34x2.5;87.5;7;41;1x0, 1x1, 1x1.5, 39x2.5;100;9;1;28702;Christine;Egli;Pamina;Walkestrasse 12;8400;Winterthur;;christine.egli@pbs.ch;Liebe Pamina
1023;PFAD23;Weiterbildung (funktionsbezogen);Pfadi Kanton Solothurn, Pfadi ;;PBS CH AG 551-20;10.01.2020;12.01.2020;Solothurn;1.5;1.5;65;5x0.5, 9x1, 51x1.5;88;12;70;8x0.5, 9x1, 53x1.5;92.5;6;1;;;;;;;;;;Hallo
        `} >
      </textarea>
      <CourseTable courses={courses}></CourseTable>
      <AdvisorTable advisors={Object.values(state.advisors)} courses={courses}></AdvisorTable>
    </div >
  );
}

export default App;
