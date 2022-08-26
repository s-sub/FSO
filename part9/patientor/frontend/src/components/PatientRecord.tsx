import { useParams } from 'react-router-dom';
import { useStateValue, setPatient, addPatient } from '../state';
import {Patient,Entry, Diagnosis} from '../types';
import { apiBaseUrl } from "../constants";
import {Card, Button} from '@mui/material';

import axios from "axios";
import React from 'react';

import {HealthCheck} from './HealthCheckEntry';
import { HospitalE } from './HospitalEntry';
import { OccupationalEntry } from './OccupationalEntry';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import AddEntryModal from '../AddEntryModal';

const PatientRecord = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const {id} = useParams();

    const [modalOpen,setModalOpen] = React.useState<boolean>(false);
    const [error,setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const getPatient = async (id: string) => {
        try {
            const { data: newPatient } = await axios.get<Patient>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}`
            );
            const dispatchPatient = {
                dateOfBirth: newPatient.dateOfBirth,
                entries: newPatient.entries,
                gender: newPatient.gender,
                id: newPatient.id,
                name: newPatient.name,
                occupation: newPatient.occupation,
                ssn: newPatient.ssn
            };
            dispatch(setPatient(dispatchPatient));
            // closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
            console.error("Unknown error", e);
            setError("Unknown error");
            }
        }
    };

    const submitNewEntry = async (values: EntryFormValues) => { //reconstruct appropriate objects here?
        try {
            console.log('values', values);
            const { data: newEntry } = await axios.post<Entry>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `${apiBaseUrl}/patients/${id}/entries`,
              values
            );
            console.log(newEntry);
            const foundpatient = Object.values(patients).find((patient:Patient) => patient.id === id);
            if (foundpatient && foundpatient.entries) {
                const newpatient: Patient = {...foundpatient, entries: foundpatient.entries.concat(newEntry)};
                console.log(newpatient);
                dispatch(addPatient(newpatient));
            }
            console.log('notfound');
            closeModal();
          } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              console.error(e?.response?.data || "Unrecognized axios error");
              setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
              console.error("Unknown error", e);
              setError("Unknown error");
            }
          }
        };

    const Diagnoses = (props: {diagnoses: Array<Diagnosis['code']>}): JSX.Element => {
        const userdiagnoses = props.diagnoses;
        return (
            <div>
                {userdiagnoses.map((diagnosiscode,i) => {
                    const matchingdiagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === diagnosiscode);
                    const description = matchingdiagnosis ? matchingdiagnosis.name : null;
                    return (
                        <li key={i}>{diagnosiscode} {description}</li>
                    );
                })}
            </div>
        );
    };

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    const EntryDetails: React.FC<{entry:Entry}> = ({entry}) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalE entry={entry}  />;
            case "OccupationalHealthcare":
                return <OccupationalEntry entry={entry} />;
            case "HealthCheck":
                return <HealthCheck entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    const Entries = (props: {entries: Array<Entry>}): JSX.Element => {
            const styles = {
                margin: 10
            };
            const entries = props.entries;
            return (
                <div>
                    {entries.map((entry,i) => {
                        return(
                            <div key={i}>
                                <Card style={styles}>
                                    <EntryDetails entry={entry} />
                                    <div>
                                        {entry.diagnosisCodes && <Diagnoses diagnoses={entry.diagnosisCodes}/>} 
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            );
    };

    //this might yield an error later - come back
    if (id && Object.values(patients).map((patient: Patient)=>patient.id).includes(id)) {
        void getPatient(id);
    }

    const patient = Object.values(patients).find((patient:Patient) => patient.id === id);
    if (patient != undefined) {
        return (
            <div>
                <h2>
                    {patient.name}
                </h2>
                <p>ssh: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries</h3>
                <div>{patient.entries 
                    ? <Entries entries={patient.entries} />
                    : "No entries"
                    }</div>
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button variant="contained" onClick={() => openModal()}>
                        Add New Entry
                    </Button>
            </div>
        );
    }
    else {
        return <p>patient does not exist</p>;
    }
};

export default PatientRecord;