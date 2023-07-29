import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {Movie} from "./entities/movie.entity";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAllMovies(): Movie[] {
       return this.moviesService.getAllMovies();
    }


    @Get('/:id')
    getMovieById(@Param('id') id: number):Movie {
      return this.moviesService.getMovieById(id);
    }

    @Post()
    createNewMovie(@Body() movieData: CreateMovieDto){
        return this.moviesService.createNewMovie(movieData);
    }

    @Delete('/:id')
    deleteMovie(@Param('id') id: number) {
        return this.moviesService.deleteMovie(id);
    }

    @Patch('/:id')
    patchMovie(@Param('id') id:number, @Body() updatedData: UpdateMovieDto) {
        return this.moviesService.patchMovie(id,updatedData);
    }


}
