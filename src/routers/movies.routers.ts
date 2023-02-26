import { Router } from "express";
import { createMovieController, deleteMovieController, listAllMoviesController } from "../controllers/movies.controllers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middlewares";
import { movieSchema } from "../schemas/movies.schemas";

const movieRoutes: Router = Router()

movieRoutes.post("", ensureDataIsValid(movieSchema), createMovieController)
movieRoutes.get("", listAllMoviesController)
movieRoutes.delete("/:id", deleteMovieController)

export default movieRoutes