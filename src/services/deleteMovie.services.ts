
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import Movie from "../entities"


export const deleteMovieService = async (movieId: number): Promise<void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const user = await movieRepository.findOne({
        where: {
            id: movieId
        }
    })

    await movieRepository.remove(user!)

}

