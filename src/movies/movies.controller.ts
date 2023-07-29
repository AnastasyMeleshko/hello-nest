import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAllMovies() {
       return 'all'
    }


    @Get('/search')
    searchMovie(@Query('year') searchingYear: string) {
       return `Look for film after ${searchingYear}  year`
    }

    @Get('/:id')
    getMovieById(@Param('id') id: string) {
      return `film with id ${id}`
    }

    @Post()
    createNewMovie(@Body() movieData){
        console.log(movieData)
        return movieData;
    }

    @Delete('/:id')
    deleteMovie(@Param('id') id:'string') {
        return `Delete movie with id - ${id}`
    }

    @Patch('/:id')
    patchMovie(@Param('id') id:string, @Body() updatedData) {
        return {
            updatedMovie: id,
            ...updatedData
        }
    }



}
