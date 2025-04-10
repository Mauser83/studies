import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry, NewEntry, Entry } from "../types";
// import toNewPatientEntry from "../utils";
// import { z } from "zod";
// import { newPatientSchema } from "../utils";
import { newPatientParser } from "../middleware/newPatientParser";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { newEntryParser } from "../middleware/newEntryParses";
import { ErrorMessage } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const patient = patientService.findById((req.params.id));
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(400);
    }
});


router.post("/:id/entries", newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | ErrorMessage>) => {
    const patientId = req.params.id;
    const diagnoseToAdd = req.body;
    const addedDiagnose = patientService.addDiagnose(patientId, diagnoseToAdd);
    res.json(addedDiagnose);
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