import { z } from "zod";

export const movieSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().nullish(),
    duration:z.number().int().positive(),
    price: z.number().int().nonnegative()
}).strict();

export const returnMovieSchema = movieSchema.extend({
    id: z.number().nonnegative().int(),
})

export const returnAllMoviesSchema = returnMovieSchema.array()

export const updateMovieSchema = movieSchema.partial()