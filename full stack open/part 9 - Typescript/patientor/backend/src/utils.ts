import { NewPatientEntry, Gender } from "./types";
import { z } from "zod";

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
    name: z.string().nonempty(),
    ssn: z.string().nonempty(),
    dateOfBirth: z.string().nonempty().date(),
    occupation: z.string().nonempty(),
    gender: z.nativeEnum(Gender)
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

export default toNewPatientEntry;