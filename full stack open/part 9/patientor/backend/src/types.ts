import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface DiagnoseEntry {
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
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

// export type NewPatientEntry = Omit<PatientEntry, "id">;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}