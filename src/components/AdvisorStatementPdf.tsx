import { PDFDocument } from 'pdf-lib'
import React, { ReactElement, useEffect, useState } from 'react';
import { Advisor } from '../models/advisor';
import { Course } from '../models/course';

export type AdvisorStatement = {
  advisor: Advisor;
  courses: Course[];
  year: number;
  amountPerCourse: number;
}

export async function generatePdf({ advisor, courses, year, amountPerCourse }: AdvisorStatement): Promise<string> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([350, 400]);
  page.moveTo(110, 200);
  page.drawText('Hello World!');
  return pdfDoc.saveAsBase64({ dataUri: true });
}

export function AdvisorStatementPdfLink(advisorStatement: AdvisorStatement): ReactElement {
  const [dataUri, setDataUri] = useState<string>();

  useEffect(() => {
    (async () => {
      const result = await generatePdf(advisorStatement)
      setDataUri(result)
    })()
  }, [advisorStatement])

  return (<a href={dataUri}>{dataUri && 'PDF'} </a>)
}

