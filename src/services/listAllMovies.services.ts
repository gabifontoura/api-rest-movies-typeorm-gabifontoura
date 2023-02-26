import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import Movie from "../entities"
import { iAllMoviesResult } from "../interfaces/movies.interfaces"
import { returnAllMoviesSchema } from "../schemas/movies.schemas"


export const listAllMoviesService = async (): Promise<iAllMoviesResult> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const findMovies: Array<Movie> = await movieRepository.find()

    const users = returnAllMoviesSchema.parse(findMovies)

    return users

}
