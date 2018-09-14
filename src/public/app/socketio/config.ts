import socketio from 'socket.io-client';
import { store } from '../store';
import { fetchConversation } from './../store/actions';

const io = socketio({ autoConnect: false });

io.on('chat', (data: string) => {
    const conversation: Store.IConversation = JSON.parse(data);
    store.dispatch(fetchConversation({ conversation }));
});

export function connectIO() {
    io.open();
}

export function joinRooms(conversations: Store.IConversation[]) {
    io.emit('join', JSON.stringify(conversations.map(({id}) => id)));
}

export function updateConversation(conversation: Store.IConversation) {
    io.emit('chat', JSON.stringify(conversation));
}
