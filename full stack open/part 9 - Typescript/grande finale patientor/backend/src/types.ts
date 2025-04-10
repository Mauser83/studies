import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries?: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

// export type NewPatientEntry = Omit<PatientEntry, "id">;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface Entry {
// }

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K>: never;
export type NewEntry = UnionOmit<Entry, "id">;