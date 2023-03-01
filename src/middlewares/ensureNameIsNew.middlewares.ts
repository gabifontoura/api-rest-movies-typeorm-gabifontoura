import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { AppError } from '../errors'

export const ensureNameIsNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    if(req.body.name){
        const findMovieName = await movieRepository.findOneBy({
            name: req.body.name
        })
       
        if(findMovieName){
            throw new AppError("Movie already exists.", 409)
        }
    }

    return next()

}