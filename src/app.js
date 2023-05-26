import express from 'express';
import handlebars from 'express-handlebars';
import { paginationUrl, compare } from './utils/helpers.js';
import { Server } from 'socket.io';
import cookie from 'cookie-parser';
import session from 'express-session';
import passportConfig from './config/passport.config.js';
import passport from 'passport';
import mongoStore from 'connect-mongo';
import logger from './utils/loggers.js';
import loggerMiddelware from './middleware/logger.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import multer from 'multer';
import cors from 'cors';
import PaymentRouter from "./routers/payment.router.js";

export default class AppServer {
    constructor({ db, Router, WebsocketService }) {
        this.app = express();
        this.config = db;
        this.router = Router;
        this.websocketService = WebsocketService;
        this.app.use(cors());
        this.app.use(loggerMiddelware);
        this.app.get("/loggerTest", this.loggerTestHandler.bind(this));
        this.setup();
        this.setupSwagger();
        this.app.use('/api/payments', PaymentRouter)
    }

    

    async setup() {
        await passportConfig(passport);

        const hbs = handlebars.create({
            helpers: {
                paginationUrl,
                compare,
            },
        });

        // Set static route
        this.app.use(express.static('src/public'));

        // Set cookie parser, session and passport
        this.app.use(cookie());
        this.app.use(
            session({
                store: new mongoStore({
                    mongoUrl: this.config.MONGO_URI,
                    options: {
                        userNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                }),
                secret: this.config.SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 10000000 },
            })
        );

        // set passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        const upload = multer({ dest: 'uploads/' });

        // Set main router
        this.app.use(this.router);

         // Add multer middleware to upload files
    this.app.post('/api/users/:uid/documents', upload.array('documents'), async (req, res) => {
        // Handle file upload
    });

        // Set template engine
        this.app.engine('handlebars', hbs.engine);
        this.app.set('view engine', 'handlebars');
        this.app.set('views', 'src/views');
        }
        setupSwagger() {
        const swaggerOptions = {
            swaggerDefinition: {
                info: {
                    title: 'Documentación de las APIs',
                    version: '1.0.0',
                    description: 'API de ecommerce',
                },
            },
            apis: ['./docs/users/users.yaml'], 
        };
          
          // Generar la documentación de Swagger
          const swaggerSpec = swaggerJSDoc(swaggerOptions);
          
          // Ruta para la documentación de Swagger
          this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }


    loggerTestHandler(req, res) {
        logger.log("debug", "Mensaje debug");
        logger.http("Mensaje http");
        logger.info("Mensaje info");
        logger.warn("Mensaje warn");
        logger.error("Mensaje error");
        res.send("ErrorTest");
      }
    

    start() {
        const server = this.app.listen(this.config.PORT, () => {
            console.log(`🚀 Server started on port: ${this.config.PORT}`);
        });

        server.on('error', (err) => console.log(err));

        const io = new Server(server);
        this.websocketService.websocketInit(io);
    }
}


