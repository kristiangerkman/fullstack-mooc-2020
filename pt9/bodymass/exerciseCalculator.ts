interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Input {
  target: number;
  values: Array<number>;
}

const parseExerArgs = (args: Array<string>): Input => {
  if (args.length < 4) throw new Error("Too few args");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    let numbers = args.map((n, i) =>
      i >= 3 && !isNaN(Number(n)) ? Number(n) : null
    );
    numbers = numbers.filter((n) => n !== null);
    console.log(numbers);
    return {
      target: Number(args[2]),
      values: numbers,
    };
  } else {
    throw new Error("invalid args");
  }
};

const calculateExercises = (days: Array<number>, target: number): Result => {
  const targetHours = target * days.length;
  const hoursTrained = days.reduce((s, t) => s + t);
  const trainingDays = days.filter((d) => (d > 0 ? 1 : 0));
  const success = hoursTrained >= targetHours ? true : false;
  const average = hoursTrained / days.length;
  let rating: number;
  let ratingDescription: string;

  // w/e
  if (trainingDays.length === days.length && hoursTrained >= targetHours) {
    rating = 3;
    ratingDescription = "perfect";
  } else if (trainingDays.length < days.length && hoursTrained >= targetHours) {
    rating = 2;
    ratingDescription = "good job, be more consistent";
  } else {
    rating = 1;
    ratingDescription = "you can do better than this";
  }

  return {
    periodLength: days.length,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, values } = parseExerArgs(process.argv);
  console.log(calculateExercises(values, target));
} catch (e) {
  console.log("Error: ", e);
}
