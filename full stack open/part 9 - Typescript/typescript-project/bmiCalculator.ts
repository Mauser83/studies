import { isNotNumber } from "./utils";
let bmiText: string = "";

export const calculateBmi = (height: number, weight: number) => {
  if (
    !height ||
    isNotNumber(height) ||
    height <= 0 ||
    !weight ||
    isNotNumber(weight) ||
    weight <= 0
  ) {
    bmiText = "malformatted parameters";
  } else {
    const bmi =
      Math.round((weight / (((height / 100) * height) / 100)) * 10) / 10;
    if (bmi < 18.5) {
      bmiText = "Underweight range";
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiText = "Normal range";
    } else if (bmi >= 25 && bmi < 30) {
      bmiText = "Overweight range";
    } else if (bmi >= 30) {
      bmiText = "Obese range";
    }
  }
  if (require.main !== module) {
    if ((bmiText === "malformatted parameters")) {
      return {
        error: bmiText,
      };
    } else {
      return {
        height: height,
        weight: weight,
        bmi: bmiText,
      };
    }
  } else {
    return bmiText;
  }
};

if (require.main === module) {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  console.log(calculateBmi(height, weight));
}
