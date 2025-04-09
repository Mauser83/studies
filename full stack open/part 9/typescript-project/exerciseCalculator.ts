import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ErrorMessage {
  error: string;
}

export const calculateExercises = (
  target: number,
  exercise: Array<number>
): ErrorMessage | Result => {
  if (!target || !exercise) {
    return {
      error: "parameters missing",
    };
  } else {
    const notNumbers = exercise.some(e => isNotNumber(e));
    const notPositives = exercise.some(e => e < 0) 
    if (isNotNumber(target) || notNumbers || target < 0 || notPositives) {
      return {
        error: "malformated parameters",
      };
    } else {
      const periodLength = exercise.length;
      const trainingDays = exercise.filter((day) => day > 0).length;
      const totalHours = exercise.reduce((sum, day) => sum + day, 0);
      const average = totalHours / periodLength;
      const success = average >= target;

      let rating: number;
      let ratingDescription: string;

      if (average >= target) {
        rating = 3;
        ratingDescription = "Great job!";
      } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not bad, but could be better!";
      } else {
        rating = 1;
        ratingDescription = "You need to put in more effort!";
      }

      return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      };
    }
  }
};

if (require.main === module) {
  const [, , target, ...exercise] = process.argv;
  const targetNumber = Number(target);
  const exercises = exercise.map(Number);
  console.log(calculateExercises(targetNumber, exercises));
}
