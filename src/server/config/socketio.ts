import http from 'http';
import socketIO from 'socket.io';

export default function(serverHTTP: http.Server) {
    const io = socketIO(serverHTTP);
    io.on('connection', (socket) => {
        socket.on('join', (data) => {
            const conversations: string[]  = JSON.parse(data);
            conversations.forEach((conversation) => {
                socket.join(conversation);
            });
        });
        socket.on('disconnect', () => {
            console.log('IO Disconnected');
        });
        socket.on('chat', (data) => {
            const conversation: Store.IConversation  = JSON.parse(data);
            io.to(conversation.id).emit('chat', data);
        });
    });

}
