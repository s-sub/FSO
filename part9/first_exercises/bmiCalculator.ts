export const calculateBmi = (height: number, weight: number): string => {
    const BMI = weight/((height/100)**2)
    if (BMI < 18.5) {
        return ("Underweight")
    }
    else if (BMI > 24.9) {
        return ("Overweight")
    }
    else {
        return ("Normal (healthy weight)")
    }
  }


const parseArguments = (args: Array<string>) => {
    return {height: Number(args[2]),
            weight: Number(args[3])}
}

try {
    const {height, weight} = parseArguments(process.argv)
    // console.log(calculateBmi(height,weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }