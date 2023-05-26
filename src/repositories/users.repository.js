import BaseRepository from './base.repository.js';

export default class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
    }
}
