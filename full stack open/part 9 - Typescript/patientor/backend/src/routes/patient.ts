import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types";
// import toNewPatientEntry from "../utils";
// import { z } from "zod";
// import { newPatientSchema } from "../utils";
import { newPatientParser } from "../middleware/newPatientParser";
import { errorMiddleware } from "../middleware/errorMiddleware";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    // const addedPatient = patientService.addPatient({
    //     name,
    //     dateOfBirth,
    //     ssn,
    //     gender,
    //     occupation,
    // });
    // try {
    //     // const newPatientEntry = toNewPatientEntry(req.body);
    //     const newPatientEntry = newPatientSchema.parse(req.body)

    //     const addedEntry = patientService.addPatient(newPatientEntry);
    //     res.json(addedEntry);
    // } catch (error: unknown) {
    //     // let errorMessage = "Something went wrong.";
    //     // if (error instanceof Error) {
    //     //     errorMessage += " Error: " + error.message;
    //     // }
    //     // res.status(400).send(errorMessage);
    //     if ( error instanceof z.ZodError) {
    //         console.log(error);
    //         res.status(400).send({ error: error.issues });
    //     } else {
    //         res.status(400).send({ error: "unknown error" });
    //     }
    // }
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;