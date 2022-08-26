// type

interface Obj {
    numberofdays: number;
    numberoftrainingdays: number;
    originaltargetvalue: number;
    calculatedavgtime: number;
    targethit: boolean;
    rating: number;
    explain: string;
  }


const parseArguments2 = (args: Array<string>) => {
    const target = Number(args[2])
    var hours: Array<number> = []
    for(var i = 3; i < args.length;i++) {
        hours = hours.concat(Number(args[i]))
    }
    
    return {target: target,
            hours: hours}
}

export const calculateExercises = (dailyhours: Array<number>, targetamount: number): Obj => {
    const average = (array: Array<number>) => array.reduce((a: number, b: number) => a + b) / array.length;
    const avg = average(dailyhours)
    var rating = 1;
    var desc = "you didn't hit the target"
    if (avg>2*targetamount) {
        rating = 3
        desc = "nice work"
    }
    else if (avg>1.5*targetamount) {
        rating = 2
        desc = "not too bad but could be better"
    }
    else {
        rating = 1
        desc = "do better"
    }


    return {
        numberofdays: 7,
        numberoftrainingdays: dailyhours.filter(hours=>hours!=0).length,
        originaltargetvalue: targetamount,
        calculatedavgtime: avg,
        targethit: avg>targetamount,
        rating: rating,
        explain: desc
    }
}

// try {
//     const {target,hours} = parseArguments2(process.argv)
//     console.log(calculateExercises(hours,target))
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }