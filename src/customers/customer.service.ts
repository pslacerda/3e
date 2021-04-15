import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tanimoto, trigram } from '../utils';
import { Repository } from 'typeorm';
import { Worker } from 'worker_threads';
import { Customer } from './customer.entities';

@Injectable()
export class TrigramSearchService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { }

    /**
     * Select all customers from database and check the trigram similarity
     * between customer.name and query. Unsuitable for production because
     * it is too much compute intensive.
     *
     * @param query A query for search customer names (length >= 3).
     */
    async search(query: string) {
        if (query.length < 3) {
            throw new Error("The query is too short.");
        }
        return (await this.customerRepository.find())
            .map(customer => {
                return {
                    similarity: tanimoto(trigram(query), trigram(customer.name)),
                    ...customer
                }
            })
            .sort((a, b) => {
                return b.similarity - a.similarity;
            })
    }
}