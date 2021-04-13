import { Module } from '@nestjs/common';
import { AppController as CustomerController } from './customers/customer.controller';
import { CustomerService } from './customers/customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class AppModule {}
