import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { iMoviesPage } from "../interfaces/movies.interfaces"
import { returnListAllMovies } from "../schemas/movies.schemas"


export const listAllMoviesService = async (perPage:any, page:any, order:any, sort:any): Promise<iMoviesPage> => {
	
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    
	page = Number(page) || 1;
	perPage = Number(perPage) || 5;
    
	if (page < 1) { page = 1 }
	if (perPage < 1 || perPage > 5 ) { perPage = 5 }

    const totalMovies = await movieRepository.count()
    
    sort = sort?.toString().toLowerCase();
    order = order?.toString().toLowerCase();
	
	if (sort !== "price" && sort !== "duration") {sort = "id"; order = "ASC";}
    
    order = order === "asc" || order === "desc" ? order : "asc";
    
	const findMoviesPage: Array<Movie> = await movieRepository.find({ 
		take: perPage,
		skip: perPage * (page - 1),
		order: {
            [sort]: order
		}
	});

    const baseUrl = "http://localhost:3000/movies";
    const prevPage: string | null = page - 1 >= 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
    const nextPage: string | null = totalMovies <= perPage * page? null : `${baseUrl}?page=${page + 1}&perPage=${perPage}`;
    
	const moviesPage: iMoviesPage = {
		prevPage: prevPage,
		nextPage: nextPage,
		count: totalMovies,
		data: findMoviesPage
	};

	const moviesList = returnListAllMovies.parse(moviesPage)
    
    return moviesList
};

