import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.test' })
import {Test} from '@nestjs/testing';
import * as pactum from 'pactum';
import {AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateBookMarkDto, EditBookMarkDto } from '../src/bookmark/dto';

describe("App e2e", ()=>{
  let app:INestApplication
  let prisma: PrismaService
  beforeAll(async ()=> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication()
   app.useGlobalPipes(new ValidationPipe({whitelist: true}))

    await app.init()
    
    await app.listen(3333) //pactum requires this

    prisma = app.get(PrismaService)

    await prisma.cleanDb()
    
    pactum.request.setBaseUrl('http://localhost:3333')
    
  }) 
  
  afterAll(()=>{
    app.close()
  })

  describe("Auth", ()=>{
    const dto: AuthDto = {
      email: 'sarahnzeshi05@gmail.com',
      password: '123'
    }
    describe('Signup', ()=>{

      it("should throw error if email is empty", ()=>{
        return pactum.spec().post('/auth/signup').withBody({
          password: dto.password
        }).expectStatus(400)
      })
      it("should throw error if password is empty", ()=>{
        return pactum.spec().post('/auth/signup').withBody({
          email: dto.email
        }).expectStatus(400)
      })
      it("should throw error if null", ()=>{
        return pactum.spec().post('/auth/signup').expectStatus(400)
      })

      it('should signup', ()=>{
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201)
      })
    })
    describe('SignIn', ()=>{
      it("should throw error if email is empty", ()=>{
        return pactum.spec().post('/auth/signin').withBody({
          password: dto.password
        }).expectStatus(400)
      })
      it("should throw error if password is empty", ()=>{
        return pactum.spec().post('/auth/signin').withBody({
          email: dto.email
        }).expectStatus(400)
      })
      it("should throw error if null", ()=>{
        return pactum.spec().post('/auth/signin').expectStatus(400)
      })

      it('should sign in', ()=>{
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200)
                     .stores('userToken', 'access_token')
      })
    })
  })


  describe("User", ()=>{
    describe('Get me', () => {
      it("should get current user", ()=>{
        return pactum.spec().get('/users/me').withHeaders({
          Authorization: 'Bearer $S{userToken}'
        }).expectStatus(200).inspect()
      })
    })
    describe('Edit me', () => {
      const dto:EditUserDto = {
        email: "sarahnzeshi05@gmail.com",
        firstName: "Sarah",
        lastName: "Nzeshi"
      }
      return pactum.spec().patch('/users').withHeaders({
        Authorization: 'Bearer $S{userToken}'
      }).expectStatus(200).withBody(dto)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.email)
    })
    
  })


  describe("Bookmark", ()=>{
    
    describe('Get empty bookmarks', ()=>{
      it('should get bookmarks', ()=>{
        return pactum.spec().get('/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userToken}'
        }).expectStatus(200)
          .expectBody([])
      })
    })

    describe("Create bookmarks", ()=>{
      
      const dto: CreateBookMarkDto = {
        title: "First Bookmark",
        link: 'https://www.google.com',
      }

      it('should create bookmark', ()=>{
        return pactum.spec().post('/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userToken}'
        }).withBody(dto).expectStatus(201).stores('bookmarkID', 'id')
      })
    })
    describe("Get bookmarks", ()=>{
      it('should get bookmarks', ()=>{
        return pactum.spec().get('/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userToken}'
        }).expectStatus(200).expectJsonLength(1)
      })
    })
    describe("Get bookmark by ID", ()=>{
      it('should get bookmark by id', ()=>{
        return pactum.spec().get('/bookmarks/{id}')
                     .withPathParams('id', '$S{bookmarkID}')
                     .withHeaders({
                        Authorization: 'Bearer ${userToken}'
                     }).expectStatus(200).expectBodyContains('$S{bookmarkID}')
      })
    })
    describe("Edit bookmark", ()=>{
      const dto: EditBookMarkDto = {
        title: "Welcome to Youtube",
        description: "A platform for sharing contents and what not"
      }
       it('should edit bookmark by id', ()=>{
        return pactum.spec().patch('/bookmarks/{id}')
                     .withPathParams('id', '$S{bookmarkID}')
                     .withBody(dto)
                     .withHeaders({
                        Authorization: 'Bearer ${userToken}'
                      }).expectStatus(200).expectBodyContains(dto.title)
                     .expectBodyContains(dto.description)
      })
    })
    describe("Delete bookmark", ()=>{
      it('should delete bookmark by id', ()=>{
        return pactum.spec().delete('/bookmarks/{id}')
                     .withPathParams('id', '$S{bookmarkID}')
                     .withHeaders({
                        Authorization: 'Bearer $S{userToken}'
                     }).expectStatus(204)
      })
      it('should get empty bookmarks', ()=>{
        return pactum.spec().get('/bookmarks')
                     .withHeaders({
                        Authorization: 'Bearer ${userToken}'
                     }).expectStatus(200).expectJsonLength(0)
                    })
    })
  })
// "pretest:e2e": "yarn db:test:restart",
})