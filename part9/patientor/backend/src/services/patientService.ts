import patientData from '../../data/patientsreal';

import { NewPatientEntry, Patient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';


const patients: Array<Patient> = patientData;

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id===id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (entry: NewEntry, id: string): Entry | void => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entryId: string = uuid();
  const foundpatient = patients.find(patient => patient.id===id);
  if (foundpatient) {
    const newEntry: Entry = {
      id: entryId,
      ...entry
    };
    foundpatient.entries.push(newEntry);
    return newEntry;
  }
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addPatientEntry
};