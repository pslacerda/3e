import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customers/customer.module';

@Module({
    imports: [TypeOrmModule.forRoot(), CustomerModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
