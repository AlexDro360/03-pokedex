import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { AppConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ AppConfiguration ],
      validationSchema: JoiValidationSchema,
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB+"", {
      dbName: 'nest-pokemon'
    }),

    PokemonModule,

    SeedModule,

    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
