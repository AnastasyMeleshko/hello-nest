import {Injectable, NotFoundException} from '@nestjs/common';
import {Movie} from "./entities/movie.entity";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAllMovies(): Movie[] {
        return this.movies;
    }

    getMovieById(id: number): Movie {
        const movie = this.movies.find((movie) => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with id: ${id} not found`);
        }
        return movie;
    }

    deleteMovie(id: number) {
        this.getMovieById(id);
        this.movies = this.movies.filter((movie) => movie.id !== id);
    }

    createNewMovie(movieData:CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }


    patchMovie(id: number, updateData: UpdateMovieDto) {
        const movieIndex = this.movies.findIndex((movie) => movie.id === id);
        if (movieIndex === -1) {
            throw new NotFoundException(`Movie with id: ${id} not found`);
        }
        const updatedMovie = {
            ...this.movies[movieIndex],
            ...updateData,
        };
        this.movies[movieIndex] = updatedMovie;
    }

}
