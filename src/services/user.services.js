import bcrypt from 'bcrypt';
import UserDTO from '../dto/userDTO.js';

export default class UserServices {
    constructor({ UserRepository, CartRepository }) {
        this.userDao = UserRepository;
        this.cartDao = CartRepository;
    }

    createUser = async (user) => {
        try {
            const userExists = await this.userDao.getOne({
                email: user.email,
            });

            if (userExists) {
                throw new Error('User already exists');
            }

            const newCart = await this.cartDao.create();

            user.password = await bcrypt.hash(user.password, 10);

            const createdUser = await this.userDao.create({
                ...user,
                cart: newCart._id,
            });

            return new UserDTO(createdUser);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    // TODO: combine with getUserById. Inconvenient with destructuring in the criteria (email is ok, id is not since it's _id in db) (needs aditional logic to make it propper)
    getUser = async (email) => {
        try {
            const user = await this.userDao.getOne({ email });

            if (!user) {
                console.log('User not found');
                //TODO: error handling
            }else {
                await this.updateLastConnection(user._id); // update last connection time for the user
            }

            return user; // sends plain user in order to compare password in AuthService
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getUserById = async (id) => {
        try {
            const user = await this.userDao.getById(id);

            if (!user) {
                throw new Error('User not found');
            }

            return new UserDTO(user);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    updateUserRole = async (uid, role) => {
        try {
            // Validar si el nuevo rol es válido (por ejemplo, 'user' o 'premium')
            if (role !== 'user' && role !== 'premium') {
                throw new Error('Invalid role');
            }

            // Actualizar el rol del usuario en la base de datos
            const updatedUser = await this.userDao.findByIdAndUpdate(
                uid,
                { role }, // Nuevo rol de usuario
                { new: true } // Opción para devolver el documento actualizado
            );

            // Verificar si se encontró y actualizó el usuario
            if (!updatedUser) {
                throw new Error('User not found');
            }

            // Devolver el usuario actualizado
            return new UserDTO(updatedUser);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}
