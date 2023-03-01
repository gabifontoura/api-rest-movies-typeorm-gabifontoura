import { DeepPartial, Repository } from "typeorm"
import { z } from "zod"
import { Movie } from "../entities"

import { movieSchema, returnMovieSchema, returnAllMoviesSchema, returnListAllMovies } from "../schemas/movies.schemas"

export type iMovie = z.infer<typeof movieSchema>

export type iMovieResult = z.infer<typeof returnMovieSchema>

export type iAllMoviesResult = z.infer<typeof returnAllMoviesSchema>

export type iUpdateMovie = DeepPartial<iMovie>

export type iMovieRepo = Repository<Movie>

export type iMoviesPage = z.infer<typeof returnListAllMovies>