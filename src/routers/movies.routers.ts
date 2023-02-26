import { Router } from "express";
import { createMovieController } from "../controllers/movies.controllers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middlewares";
import { movieSchema } from "../schemas/movies.schemas";

const movieRoutes: Router = Router()

movieRoutes.post("", ensureDataIsValid(movieSchema), createMovieController)

export default movieRoutes