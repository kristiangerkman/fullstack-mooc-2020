interface bmiValue {
  h: number;
  w: number;
}

const parseBmiArgs = (args: Array<string>): bmiValue => {
  if (args.length < 4) throw new Error("Too few args");
  if (args.length > 4) throw new Error("Too many args");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      h: Number(args[2]),
      w: Number(args[3]),
    };
  } else {
    throw new Error("invalid args");
  }
};

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

try {
  const { h, w } = parseBmiArgs(process.argv);
  console.log(calculateBmi(h, w));
} catch (e) {
  console.log("Error: ", e);
}
