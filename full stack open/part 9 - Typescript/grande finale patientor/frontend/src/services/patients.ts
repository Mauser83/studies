import axios from "axios";
import { Entry,  NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (id: string | undefined) => {
  if (id !== undefined) {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return data;
  } else return null;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createDiagnose = async (id: string, object: NewEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};



export default {
  getAll,
  create,
  getPatient,
  createDiagnose,
};
