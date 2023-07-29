import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import {NotFoundException} from "@nestjs/common";

describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Testing of getAllMovies() function', () => {
        it('should return Array', () => {
            const result = service.getAllMovies();
            expect(result).toBeInstanceOf(Array);
        })
    })

    describe('Testing of getMovieById() function', () => {
        it('should return film', () => {
            service.createNewMovie({
                title: "Test film",
                year: 2005,
                genres: ['drama', 'comedy']
            })
            const movie = service.getMovieById(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        })

        it('should return NotFoundException error', () => {
            try {
                service.getMovieById(999);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with id: 999 not found`);
            }

        })
    });

    describe('Testing of deleteMovie() function', () => {
        it('should delete selected film', () => {
            service.createNewMovie({
                title: "Test film",
                year: 2005,
                genres: ['drama', 'comedy']
            })
            const getAllMoviesBeforeDelete = service.getAllMovies();
            service.deleteMovie(1);
            const getAllMoviesAfterDelete = service.getAllMovies();
            expect(getAllMoviesAfterDelete.length).toEqual(getAllMoviesBeforeDelete.length - 1);
        });

        it('should return Error NotFoundException', () => {
            try {
                service.deleteMovie(777);
            }catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        })
    })

    describe('Testing of createNewMovie() function', () => {
        it('should create new movie', () => {
            const beforeCreateMovie = service.getAllMovies().length;
            service.createNewMovie({
                title: "Test film",
                year: 2005,
                genres: ['drama', 'comedy']
            })
            const afterCreateMovie = service.getAllMovies().length;
            expect(afterCreateMovie).toEqual(beforeCreateMovie + 1);
        })
    });

    describe('Testing of function patchMovie() functionality', () => {
        it('should change the movie', () => {
            service.createNewMovie({
                title: "Test film",
                year: 2005,
                genres: ['drama', 'comedy']
            });
            service.patchMovie(1,{ title: "Updated title"});
            const movie = service.getMovieById(1);
            expect(movie.title).toEqual("Updated title");
        })

        it('should return Error NotFoundException', () => {
            try {
                service.patchMovie(777, {title: 'test'});
            }catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        })
    })
});
