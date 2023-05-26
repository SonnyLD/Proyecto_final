import MessageModel from '../dao/models/messages.models.js';

export default class MessageManager {
    createMessage = async (data) => {
        try {
            const newMessage = await MessageModel.create(data);
            return newMessage;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getMessages = async () => {
        try {
            const messages = await MessageModel.find().lean();
            return messages;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}
