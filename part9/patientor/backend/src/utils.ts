import { NewPatientEntry, Gender, Entry, NewEntry, NewHospitalEntry, NewHealthCheckEntry, NewOccupationalHealthcareEntry, HealthCheckRating, Sickleave, Discharge } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, occupation: unknown, ssn: unknown, gender: unknown, entries: unknown };
type EntryFields = { description:unknown, specialist:unknown, diagnosisCodes:unknown, type:unknown, date:unknown, healthCheckRating: unknown, discharge: unknown, employerName: unknown, sickLeave:unknown};



export const toNewPatientEntry = ({name, dateOfBirth, occupation, ssn, gender, entries}: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDoB(dateOfBirth),
        ssn: parseSSN(ssn),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
        entries: parseEntries(entries)
    };
    return newEntry;
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  switch(entry.type) {
    case "Hospital":
      return toNewHospitalEntry(entry);
    case "HealthCheck":
      return toNewHealthCheckEntry(entry);
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcareEntry(entry);
    default:
      throw new Error('Invalid or missing type');
  }
};

export const toNewHospitalEntry = ({description, date, specialist, diagnosisCodes, type, discharge }: EntryFields): NewHospitalEntry => {
  const newEntry: NewHospitalEntry = {
    description: parseDesc(description),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    type: parseHospitalType(type),
    date: parseDoB(date),
    discharge: parseDischarge(discharge),
  };
  return newEntry;
};

export const toNewHealthCheckEntry = ({description, date, specialist, diagnosisCodes, type, healthCheckRating }: EntryFields): NewHealthCheckEntry => {
  const newEntry: NewHealthCheckEntry = {
    description: parseDesc(description),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    type: parseHealthCheckType(type),
    date: parseDoB(date),
    healthCheckRating: parseHC(healthCheckRating),
  };
  return newEntry;
};

export const toNewOccupationalHealthcareEntry = ({description, date, specialist, diagnosisCodes, type, employerName, sickLeave }: EntryFields): NewOccupationalHealthcareEntry => {
  const newEntry: NewOccupationalHealthcareEntry = {
    description: parseDesc(description),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    type: parseOccupationalHealthcareType(type),
    date: parseDoB(date),
    employerName: parseEmployer(employerName),
    sickLeave: parseSL(sickLeave)
  };
  return newEntry;
};

const parseHospitalType = (type: unknown): ("Hospital") => {
  if (!type || !isString(type)) {
    throw new Error('Missing type');
  }
  else if (type===("Hospital")) {
    return type;
  }
  throw new Error('Incorrect type');
};

const parseHealthCheckType = (type: unknown): ("HealthCheck") => {
  if (!type || !isString(type)) {
    throw new Error('Missing type');
  }
  else if (type===("HealthCheck")) {
    return type;
  }
  throw new Error('Incorrect type');
};

const parseOccupationalHealthcareType = (type: unknown): ("OccupationalHealthcare") => {
  if (!type || !isString(type)) {
    throw new Error('Missing type');
  }
  else if (type===("OccupationalHealthcare")) {
    return type;
  }
  throw new Error('Incorrect type');
};


const parseDiagnosisCodes = (diagnoses: unknown): Array<string> | undefined => {
  if (!diagnoses) {
    return undefined;
  }
  if (!Array.isArray(diagnoses) || !diagnoses.every(item => typeof item === "string")) {
    throw new Error('');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

const parseHC = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHC(healthCheckRating)) {
    throw new Error('');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return healthCheckRating;
};

const parseEmployer = (employername: unknown): string => {
  // if (!employername) {
  //   return undefined;
  // }
  if (!employername || !isString(employername)) {
    throw new Error('');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return employername;
};

const parseSL = (sickleave: unknown): Sickleave | undefined => {
  if (!sickleave) {
    return undefined;
  }
  if (!isSL(sickleave)) {
    throw new Error('');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return sickleave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return discharge;
};

const parseSpecialist = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing specialist');
  }
  return name;
};

const parseDesc = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing description');
  }
  return name;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
    return name;
};

const parseDoB = (DoB: unknown): string => {
    if (!DoB || !isString(DoB)) {
      throw new Error('Incorrect or missing DoB');
    }
    return DoB;
};

const parseOccupation= (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing DoB');
    }
    return occupation;
};

const parseSSN= (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing DoB');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntry(entries)) {
      throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

const isEntry = (entries: any): entries is Array<Entry> => {
  return entries instanceof Array<Entry>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHC = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSL = (param: any): param is Sickleave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (typeof param.startDate === 'string') && (typeof param.endDate === 'string');
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return (typeof param.date === 'string') && (typeof param.criteria === 'string');
};

