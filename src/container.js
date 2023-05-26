
// awilix utils
import { createContainer, asClass, asValue, InjectionMode } from 'awilix';

//TODO: set auto-load (check https://github.com/jeffijoe/awilix#auto-loading-modules)

// config
import db from './config/db.js';

// server
import App from './app.js';


// router
import Router from './routers/index.routes.js';
import ProductsRouter from './routers/products.routes.js';
import CartsRouter from './routers/carts.routes.js';
import ViewsRouter from './routers/views.routes.js';
import UsersRouter from './routers/users.routes.js';
import PassportLocalRouter from './routers/passportLocal.routes.js';
import GithubRouter from './routers/github.routes.js';
// models
import User from './dao/models/users.models.js';
import Product from './dao/models/products.models.js';
import Cart from './dao/models/carts.models.js';
import Message from './dao/models/messages.models.js';
// repositories
import UserRepository from './repositories/users.repository.js';
import ProductRepository from './repositories/products.repository.js';
import CartRepository from './repositories/carts.repository.js';
// services
import UserService from './services/user.services.js';
import ProductService from './services/products.services.js';
import CartService from './services/carts.services.js';
import AuthService from './services/auth.service.js';
import WebsocketService from './services/websocket.services.js';
import chatService from './services/chat.services.js';
// controllers
import UserController from './controllers/user.controllers.js';
import ProductController from './controllers/products.controllers.js';
import CartController from './controllers/carts.controllers.js';
import ViewController from './controllers/views.controller.js';
import PassportController from './controllers/passport.controller.js';


// create container
const container = createContainer({
    injectionMode: InjectionMode.PROXY,
});



// register all dependencies
container.register({
    
    // Models
    User: asValue(User),
    Product: asValue(Product),
    Cart: asValue(Cart),
    Message: asValue(Message),

    // Repositories
    UserRepository: asClass(UserRepository).singleton(),
    ProductRepository: asClass(ProductRepository).singleton(),
    CartRepository: asClass(CartRepository).singleton(),

    // Services
    ChatService: asClass(chatService).singleton(),
    WebsocketService: asClass(WebsocketService).singleton(),
    UserService: asClass(UserService).singleton(),
    ProductService: asClass(ProductService).singleton(),
    CartService: asClass(CartService).singleton(),
    AuthService: asClass(AuthService).singleton(),

    // Controllers
    UserController: asClass(UserController).singleton(),
    ProductController: asClass(ProductController).singleton(),
    CartController: asClass(CartController).singleton(),
    ViewController: asClass(ViewController).singleton(),
    PassportController: asClass(PassportController).singleton(),

    // Routers
    ProductsRouter: asClass(ProductsRouter).singleton(),
    CartsRouter: asClass(CartsRouter).singleton(),
    ViewsRouter: asClass(ViewsRouter).singleton(),
    UsersRouter: asClass(UsersRouter).singleton(),
    PassportRouter: asClass(PassportLocalRouter).singleton(),
    GithubRouter: asClass(GithubRouter).singleton(),
    Router: asClass(Router).singleton(),
    
     // Server
   App: asClass(App).singleton(),

    // Config
    db: asValue(db),


});

export default container;
