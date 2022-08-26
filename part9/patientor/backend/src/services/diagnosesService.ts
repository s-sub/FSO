import diagnosesData from '../../data/diagnoses.json';

import { DiagnosesEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesData;

const getEntries = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses
};