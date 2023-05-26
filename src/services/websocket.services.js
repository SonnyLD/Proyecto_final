import dotenv from 'dotenv';
dotenv.config();

export default class WebSocketService {
    constructor({ ChatService }) {
        this.chatService = ChatService;
    }
    websocketInit = (io) => {
        this.io = io;
        this.io.on('connection', async (socket) => {
            console.log(`Nueva conexion desde el id: ${socket.id}`);

            socket.emit('welcome', {
                welcome: 'Bienvenido al servidor',
                messages: await this.chatService.getMessages(),
            });

            socket.on('disconnect', (socket) => {
                console.log(`Cierre de conexion`);
            });

            socket.on('newMessage', async (data) => {
                try {
                    const newMessage = await this.chatService.createMessage(
                        data
                    );
                    this.io.sockets.emit('message', newMessage);
                } catch (error) {
                    console.log(error);
                }
            });

            socket.on('newUser', (data) => {
                socket.broadcast.emit('newUser', data);
            });
        });
    };
}
