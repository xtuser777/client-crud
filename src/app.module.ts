import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { ContactModule } from './contact/contact.module';
import { IndividualPersonModule } from './individual-person/individual-person.module';
import { EnterprisePersonModule } from './enterprise-person/enterprise-person.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'client_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AddressModule,
    ContactModule,
    IndividualPersonModule,
    EnterprisePersonModule,
    PersonModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
