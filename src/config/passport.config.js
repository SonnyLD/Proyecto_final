import passportLocal from 'passport-local';
import passportGithub from 'passport-github2';
import container from '../container.js';
import UserDTO from '../dto/userDTO.js';

const passportConfig = async (passport) => {
    //TODO: set this with awilix injection ({with this})

    const userService = container.resolve('UserService');
    const authService = container.resolve('AuthService');
    const config = container.resolve('db');

    passport.use(
        'signup',
        new passportLocal.Strategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                try {
                    const userExist = await userService.getUser(username);

                    if (userExist) {
                        console.log("User already exists");
                        return done("El usuario ya existe", false);
                
                      } else {
                        const userData = {
                          first_name: req.body.firstName,
                          last_name: req.body.lastName,
                          email: req.body.email,
                          password: req.body.password,
                          age: req.body.age,
                        };
                    const user = await userService.createUser(userData);

                    return done(null, user);
                      }
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        )
    );

    passport.use(
        'login',
        new passportLocal.Strategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                try {
                    const user = await authService.login(username, password);

                    if (!user) {
                        return done(null, false);
                    }

                    return done(null, user);
                } catch (error) {
                    done(null, false, { message: error.message });
                }
            }
        )
    );

    passport.use(
        'github',
        new passportGithub.Strategy(
            {
                clientID: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                callbackURL: 'http://localhost:8080/api/github/callback', // This should be changed accordingly to the environment and stage of the proyect
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userService.getUser(profile._json.email);

                    if (!user) {
                        const names = [
                            profile.displayName.split(' ')[0],
                            profile.displayName.split(' ')[1],
                        ];
                        const userData = {
                            firstName: names[0],
                            lastName: names[1],
                            email: profile._json.email,
                            age: 20,
                            password: '',
                            platform: 'github',
                        };
                        const newUser = await userService.createUser(userData);
                        delete newUser.password;
                        return done(null, newUser);
                    }
                    delete user.password;

                    done(null, user);
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log('Serializing');
        if (!user.id) {
            user = new UserDTO(user);
        }
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log('Deserializing');
        const user = await userService.getUserById(id);
        if (!user) {
            return done(null, false);
        }

        done(null, user);
    });
};

export default passportConfig;