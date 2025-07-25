import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' })

import {Test} from '@nestjs/testing';
import {AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    prisma = app.get(PrismaService)

    await prisma.cleanDb()

  }) 

  afterAll(()=>{
    app.close()
  })

  describe("Auth", ()=>{
    describe('Signup', ()=>{})
    describe('SignIn', ()=>{})
  })
  describe("User", ()=>{
    describe('Get me', () => {
      
    })
    describe('Edit me', () => {
      
    })
    
  })
  describe("Bookmark", ()=>{
    describe
  })
})