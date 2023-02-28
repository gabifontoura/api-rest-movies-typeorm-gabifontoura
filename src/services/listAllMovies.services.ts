import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { iAllMoviesResult } from "../__tests__/interfaces/movies.interfaces"
import { returnAllMoviesSchema } from "../schemas/movies.schemas"


export const listAllMoviesService = async (perPage:any, page:any): Promise<iAllMoviesResult> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const take: number = parseInt(perPage) || 5
    const skip: number = parseInt(page) || 1

    const findMovies: Array<Movie> = await movieRepository.find({
        take, 
        skip: take * ( skip - 1 ),
        order: {
            name: 'ASC'
        }
    })

    const users = returnAllMoviesSchema.parse(findMovies)

    return users

}
