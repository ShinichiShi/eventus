import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://supreeth2020:kasi123@eventdb.58tce.mongodb.net/'),
    AuthModule,
    EventsModule,
  ],
})
export class AppModule {}
