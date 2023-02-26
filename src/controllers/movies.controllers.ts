import { Request, Response } from "express";
import { iMovie } from "../interfaces/movies.interfaces";
import { createMovieService } from "../services/createMovie.services";

export const createMovieController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    const movieData: iMovie = req.body

    const newMovie = await createMovieService(movieData);
  
    return res.status(201).json(newMovie);
  }