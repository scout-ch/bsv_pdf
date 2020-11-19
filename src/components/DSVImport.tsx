import React, { FunctionComponent } from 'react';
import { transform, ImportResult, ImportTupel } from '../models/import_data'
import { parse } from 'papaparse';

export interface DSVImportProps {
  onChange?: (value: ImportResult) => void;
}

export const DSVImport: FunctionComponent<DSVImportProps> = ({ onChange }) => {

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

