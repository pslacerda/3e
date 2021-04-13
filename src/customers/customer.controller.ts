import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateCustomerDto, QueryDto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entities';
import { Like, Repository } from 'typeorm';


@Controller('customers')
export class CustomerController {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  @Post()
  async findAll(
      @Body() body: QueryDto,
  ): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: { name: Like(body.query)},
      take: body.take,
      skip: body.skip,
    });
  }

  @Get(':id')
  async findOne(
      @Param('id') id: number
  ): Promise<Customer> {
    console.log(id);
    return await this.customerRepository.findOneOrFail({id: id});
  }

  @Put()
  async create(
    @Body() body: CreateCustomerDto
  ): Promise<CreateCustomerDto> {
    return await this.customerRepository.save(this.customerRepository.create(body));
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number
  ): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
