export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'  
}

export type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export interface DiagnosesEntry {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesEntry['code']>;
  type: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string;
  criteria: string
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface Sickleave {
  startDate: string,
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: Sickleave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewEntry = NewHospitalEntry | NewHealthCheckEntry | NewOccupationalHealthcareEntry;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

