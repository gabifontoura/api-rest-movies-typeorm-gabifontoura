import { iMovie, iMovieResult } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { returnMovieSchema } from "../schemas/movies.schemas";

export const createMovieService = async ( movieData : iMovie): Promise<iMovieResult>=> {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie: Movie = movieRepository.create(movieData)

    await movieRepository.save(movie)

    const newMovie = returnMovieSchema.parse(movie)

    return newMovie
}