import express from 'express';
const app = express();
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";


app.use(express.json());
app.use(express.urlencoded());

app.get('/hello', (_req, res) => {
  res.send('Hello world');
});


app.get('/bmi', (_req, res) => {
    res.send(calculateBmi(Number(_req.query.height),Number(_req.query.weight)));
  });

app.post('/exercise', (_req, res) => {
    // console.log(req.body)
    res.send(calculateExercises(_req.body.daily_exercises, _req.body.target));
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});