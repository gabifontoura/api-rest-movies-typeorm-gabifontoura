import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { iAllMoviesResult, iMoviesPages } from "../interfaces/movies.interfaces"
import { returnAllMoviesSchema } from "../schemas/movies.schemas"


export const listAllMoviesService = async (perPage:any, page:any, order:any, sort:any): Promise<iAllMoviesResult> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    if(!sort){
        order = 'ASC'
    } 
    page = parseInt(page) > 0 ? parseInt(page) : 1
    perPage = parseInt(perPage) > 0 && parseInt(perPage) <= 5 ? parseInt(perPage) : 5
    order = ['ASC', 'DESC'].includes(order) ? order : 'ASC'
    sort = ['price', 'duration', 'id'].includes(sort) ? sort : 'id'
    
    const findMovies = await movieRepository.find({
        skip: perPage*(page - 1),
        take: perPage,
        order:{ [sort]: order },
    })

    const totalDataMovies = await movieRepository.count()

    const moviesPages: iMoviesPages = {
        prevPage: `http://localhost:3000/movies?page=${
            page - 1 >= 1 ? page - 1 : null
        }&perPage=${perPage}`,
        nextPage:
        `http://localhost:3000/movies?page=${
            totalDataMovies <= perPage ? null : page + 1
        }&perPage=${perPage}`,
        count: totalDataMovies,
        data: findMovies
        
    }

    const moviesList = returnAllMoviesSchema.parse(moviesPages)

    return moviesList

}
