import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import Movie from "../entities"
import { iAllMoviesResult } from "../interfaces/movies.interfaces"
import { returnAllMoviesSchema } from "../schemas/movies.schemas"


export const listAllMoviesService = async (payload:any): Promise<iAllMoviesResult> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const page: number = parseInt(payload.page) || 1
    const perPage: number = parseInt(payload.perPage) || 5

    const findMovies: Array<Movie> = await movieRepository.find({
        take: perPage, 
        skip: perPage * (page-1), 
        order: {
            name: 'ASC'
        }
    })

    const users = returnAllMoviesSchema.parse(findMovies)

    return users

}
