import { Router } from "express";
import { createMovieController, deleteMovieController, listAllMoviesController, updateMovieController } from "../controllers/movies.controllers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middlewares";
import { ensureMovieExists } from "../middlewares/ensureMovieExists.middlewares";
import { movieSchema, updateMovieSchema } from "../schemas/movies.schemas";

const movieRoutes: Router = Router()

movieRoutes.post("", ensureDataIsValid(movieSchema), createMovieController)
movieRoutes.get("", listAllMoviesController)
movieRoutes.delete("/:id", ensureMovieExists, deleteMovieController)
movieRoutes.patch("/:id", ensureDataIsValid(updateMovieSchema), ensureMovieExists, updateMovieController)


export default movieRoutes