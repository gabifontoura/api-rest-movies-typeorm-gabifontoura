import { Request, Response } from "express";
import { iMovie } from "../interfaces/movies.interfaces";
import { createMovieService } from "../services/createMovie.services";
import { deleteMovieService } from "../services/deleteMovie.services";
import { listAllMoviesService } from "../services/listAllMovies.services";

export const createMovieController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    const movieData: iMovie = req.body

    const newMovie = await createMovieService(movieData);
  
    return res.status(201).json(newMovie);
}

export const listAllMoviesController = async (req: Request, res: Response) => {

    const movies = await listAllMoviesService()

    return res.json(movies)
}

export const deleteMovieController = async (req: Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id))

    return res.status(204).send()
}