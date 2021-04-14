import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateCustomerDto, PaginatedQueryDto, QueryDto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entities';
import { ILike, Repository } from 'typeorm';
import { trigram, tanimoto } from '../utils'

@Controller('customers')
export class CustomerController {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  @Post('paginatedILikeSQL')
  async findLike(
      @Body() body: PaginatedQueryDto,
  ): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: { name: ILike(body.query)},
      take: body.take,
      skip: body.skip,
    });
  }

  @Post('trigramSimilarity')
  async findTrigram(
    @Body() body: QueryDto,
  ) {
    const query = trigram(body.query);
    return (await this.customerRepository.find())
                      .map(customer => {
                        return {
                          similarity: tanimoto(query, trigram(customer.name)),
                          ...customer
                      }});


  }

  @Get(':id')
  async findOne(
      @Param('id') id: number
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOne({id: id});
    if (!customer) {
      throw new BadRequestException('Invalid customer');
    }
    return customer;
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
