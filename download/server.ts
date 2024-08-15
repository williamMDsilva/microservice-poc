import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Routes from "./src/infra/routes"
import cors from "cors"

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(cors(
  {
    origin: ['*'],
    methods: 'GET,POST'
  }
))
app.use(express.json());

app.use('/api/nf', Routes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});