import { NewPatientEntry, Gender, HealthCheckRating } from "./types";
import { z } from "zod";
import data from "../data/diagnoses";

// const isString = (text: unknown): text is string => {
//     return typeof text === "string" || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const isGender = (param: string): param is Gender => {
//     return Object.values(Gender).map(gender => gender.toString()).includes(param);
// }

// const parseName = (name: unknown): string => {
//     if (!name || !isString(name)) {
//         throw new Error("Incorrect or missing name");
//     }

//     return name;

// };

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//     if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
//         throw new Error("Incorrect or missing date of birth, give it as a YYYY-MM-DD format");
//     }

//     return dateOfBirth;

// };

// const parseSsn = (ssn: unknown): string => {
//     if (!ssn || !isString(ssn)) {
//         throw new Error("Incorrect or missing social security number");
//     }

//     return ssn;

// };

// const parseGender = (gender: unknown): string => {
//     if (!gender || !isString(gender) || !isGender(gender)) {
//         throw new Error("Incorrect or missing gender");
//     }

//     return gender;

// };

// const parseOccupation = (occupation: unknown): string => {
//     if (!occupation || !isString(occupation)) {
//         throw new Error("Incorrect or missing occupation");
//     }

//     return occupation;

// };

export const newPatientSchema = z.object({
    name: z.string().nonempty({ message: "name is missing" }),
    ssn: z.string().nonempty({ message: "social security number is missing" }),
    dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), { message: "invalid date of birth format" }),
    occupation: z.string().nonempty({ message: "occupation is missing" }),
    gender: z.nativeEnum(Gender, ({ message: "invalid gender" }))
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    // if (!object || typeof object !== "object") {
    //     throw new Error("Incorrect or missing data");
    // };

    // if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object && object.name && object.ssn && object.dateOfBirth && object.occupation && object.gender) {
    //     const newEntry: NewPatientEntry = {
    //         name: z.string().parse(object.name),
    //         ssn: z.string().parse(object.ssn),
    //         dateOfBirth: z.string().date().parse(object.dateOfBirth),
    //         occupation: z.string().parse(object.occupation),
    //         gender: z.nativeEnum(Gender).parse(object.gender),
    //     };
    //     return newEntry;

    // }

    // throw new Error("Incorrect data: some fields are missing");
    return newPatientSchema.parse(object);
};

const validDiagnosisCodes = data.map(diagnosis => diagnosis.code);

const diagnosisCodesSchema = z.array(
    z.string()).optional().refine((codes) => codes === undefined || codes.every(code => validDiagnosisCodes.includes(code)), {
        message: "invalid diagnosis code",
    }
);

const baseEntrySchema = z.object({
    description: z.string().nonempty({ message: "description is missing" }),
    date: z.string().refine(date => !isNaN(Date.parse(date)), { message: "invalid entry date format" }),
    specialist: z.string().nonempty({ message: "specialist is missing" }),
    diagnosisCodes: diagnosisCodesSchema,
});

const HealthCheckEntrySchema = baseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating, { message: "health check rating is incorrect" }),
});

const OccupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string().nonempty({ message: "employer name is missing" }),
    sickLeave: z.object({
        startDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "invalid sick leave start date format" }),
        endDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "invalid sick leave end date format" }),
    }).optional(),
});

const HospitalEntrySchema = baseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().refine(date => !isNaN(Date.parse(date)), { message: "invalid discharge date format" }),
        criteria: z.string().nonempty({ message: "criteria is missing" }),
    }),
});

export const newEntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema
]);

const toNewEntry = (object: unknown) => {
    const result = newEntrySchema.safeParse(object);

    if(!result.success) {
        console.error(result.error.format());
        return result.error;
    }

    return result.data;
};

export default {toNewPatientEntry, toNewEntry };