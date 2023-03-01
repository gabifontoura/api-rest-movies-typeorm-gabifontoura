
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Movie }  from "../entities"
import { iMovieResult, iUpdateMovie } from "../interfaces/movies.interfaces"
import { returnMovieSchema } from "../schemas/movies.schemas"


export const updateMovieService = async (newMovieData: iUpdateMovie, movieId: number): Promise<iMovieResult> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: movieId
    })

    const movie = movieRepository.create({
        ...oldMovieData,
        ...newMovieData
    })

    await movieRepository.save(movie)

    const updatedUser = returnMovieSchema.parse(movie)

    return updatedUser

}
