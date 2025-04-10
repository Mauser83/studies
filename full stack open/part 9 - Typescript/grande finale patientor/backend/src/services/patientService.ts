import patientData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry, NewEntry, Entry } from "../types";

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries })=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(patient => patient.id === id);
    return entry;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const id: string = uuidv4();
    const newPatientEntry = {
        id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export interface ErrorMessage {
    error: string
}

const addDiagnose = (patientId: string, entry: NewEntry ): Entry | ErrorMessage => {
    const id: string = uuidv4();
    const newEntry = {
        id: id,
        ...entry
    };

    const patient = patients.find(patient => patient.id === patientId);

    if (patient && patient.entries) {
        patient.entries.push(newEntry);
        return newEntry;
    } else {
        const error = {error: `Patient with id ${patientId} not found`};
        return error;
    }
};

export default {
    getEntries,
    addPatient,
    findById,
    getNonSensitiveEntries,
    addDiagnose
};