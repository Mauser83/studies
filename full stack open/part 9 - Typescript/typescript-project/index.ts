import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator"
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const result = calculateBmi(Number(req.query.height), Number(req.query.weight));
    res.send(result);
});

interface RequestBody {
    daily_exercises: number[];
    target: number;
}

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: RequestBody = req.body;
    const result = calculateExercises(target, daily_exercises);
    res.send(result);
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});