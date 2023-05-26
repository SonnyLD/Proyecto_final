import bcrypt from 'bcrypt';
import UserDTO from '../dto/userDTO.js';

export default class AuthServices {
    constructor({ UserService }) {
        this.userService = UserService;
    }

    login = async (email, password) => {
        try {
            const user = await this.userService.getUser(email);

            if (!user) {
                throw new Error('User not found');
            }

            const passwordIsValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordIsValid) {
                throw new Error('Wrong password');
            }

            return new UserDTO(user);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}
