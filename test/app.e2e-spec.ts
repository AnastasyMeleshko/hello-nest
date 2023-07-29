import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(`Hi from films data base`);
  });

  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
          .get('/movies')
          .expect(200)
          .expect([]);
    })

    it('POST 201', () => {
      return request(app.getHttpServer())
          .post('/movies')
          .send({
            title: 'test',
            year: 999,
            genres: ['test1', 'test2']
          })
          .expect(201)
    })

    it('POST 400', () => {
      return request(app.getHttpServer())
          .post('/movies')
          .send({
            title: 'test',
            year: 999,
            genres: ['test1', 'test2'],
            other: 'test'
          })
          .expect(400)
    })

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    })

  });

  describe('/movies/:id', () => {

    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    })

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/9999').expect(404);
    })

    it('PATCH 200', () => {
      return request(app.getHttpServer()).patch('/movies/1').send({
        title: 'test updated'
      }).expect(200);
    })

    it('PATCH 404', () => {
      return request(app.getHttpServer()).patch('/movies/555').send({
        title: 'test updated'
      }).expect(404);
    })

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    })

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/999').expect(404);
    })
  })

});
