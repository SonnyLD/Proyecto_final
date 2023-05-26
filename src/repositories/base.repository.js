// MEMO: se inyecta modelo en repository y luego repository en service

export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    create = async (entity) => {
        return await this.model.create(entity);
    };

    getOne = async (criteria) => {
        return await this.model.findOne(criteria).lean();
    };

    getById = async (id) => {
        return await this.model.findById(id).lean();
    };

    getMany = async (criteria) => {
        return await this.model.find(criteria).lean();
    };

    update = async (filter, update) => {
        return await findByIdAndUpdate(filter, update, {
            new: true,
        }).lean();

        // O conviene:
        // const response = await this.getOne(id).lean();
        // Object.assign(response, data);
        // response.save();
    };

    // Hard delete
    delete = async (id) => {
        return await this.model.deleteOne(id).lean();
    };
}
