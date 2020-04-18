const calculateBmi = (h: number, w: number): string => {
  const bmi = w / ((h / 100) * (h / 100));
  if (bmi > 0 && bmi <= 18.5) {
    return "underweight";
  } else if (bmi > 18.5 && bmi <= 25) {
    return "healthy weight";
  } else if (bmi > 25 && bmi <= 30) {
    return "overweight";
  } else if (bmi > 30) {
    return "obese";
  } else {
    return "invalid arguments";
  }
};

console.log(calculateBmi(180, 81.1));
