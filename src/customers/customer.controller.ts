import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class AppController {
  constructor(private readonly appService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
