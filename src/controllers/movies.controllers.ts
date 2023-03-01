import { Request, Response } from "express";
import { iAllMoviesResult, iMovie, iMoviesPage, iUpdateMovie } from "../interfaces/movies.interfaces";
import { createMovieService } from "../services/createMovie.services";
import { deleteMovieService } from "../services/deleteMovie.services";
import { listAllMoviesService } from "../services/listAllMovies.services";
import { updateMovieService } from "../services/updateMovie.services";

export const createMovieController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    const movieData: iMovie = req.body

    const newMovie = await createMovieService(movieData);
  
    return res.status(201).json(newMovie);
}

export const listAllMoviesController = async (req: Request, res: Response) => {

    const { perPage, page, order, sort } = req.query;

    const moviesPage: iMoviesPage = await listAllMoviesService(perPage, page, order, sort)

    return res.json(moviesPage)
}

export const deleteMovieController = async (req: Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id))

    return res.status(204).send()
}

export const updateMovieController = async (req: Request, res: Response) => {

    const movieData: iUpdateMovie = req.body
    const movieId = parseInt(req.params.id)

    const updatedMovie = await updateMovieService(movieData, movieId)

    return res.json(updatedMovie)
}
 