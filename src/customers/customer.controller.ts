import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateCustomerDto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entities';
import { ILike, Repository } from 'typeorm';
import { TrigramSearchService } from './customer.service';

@Controller('customers')
export class CustomerController {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private trigramSearch: TrigramSearchService
  ) { }

  @Get('paginatedILikeSQL')
  async findLike(
    @Query('query') query: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: { name: ILike(query)},
      take: take,
      skip: skip,
    });
  }

  @Get('trigramSearch')
  async findTrigram(
    @Query('query') query: string,
  ) {
    if (query.length < 3) {
      throw new BadRequestException('The query length is too short.');
    }
    return this.trigramSearch.search(query);
  }

  @Get(':id')
  async findOne(
      @Param('id') id: number
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOne({id: id});
    if (!customer) {
      throw new BadRequestException('Invalid customer.');
    }
    return customer;
  }

  @Post()
  async create(
    @Body() body: CreateCustomerDto
  ): Promise<Customer> {
    return await this.customerRepository.save(this.customerRepository.create(body));
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number
  ): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
