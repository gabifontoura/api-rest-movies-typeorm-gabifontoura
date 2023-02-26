import { z } from "zod"
import { movieSchema, returnMovieSchema } from "../schemas/movies.schemas"

export type iMovie = z.infer<typeof movieSchema>
export type iMovieResult = z.infer<typeof returnMovieSchema>