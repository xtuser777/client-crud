import { Module } from '@nestjs/common';
import { Address } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
