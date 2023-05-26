import BaseRepository from './base.repository.js';

export default class ProductsRepository extends BaseRepository {
    constructor({ Product }) {
        super(Product);
    }

    getManyPaginated = async (query, options) => {
        return await this.model.paginate(query, options);
    };
}
