import socketio from 'socket.io-client';
import { store } from '../store/store';
import { updateConversationActionCreator } from './../store/reducers';

const io = socketio({ autoConnect: false });

io.on('chat', (data: string) => {
    const conversation: Store.IConversation = JSON.parse(data);
    store.dispatch(updateConversationActionCreator({ conversation }));
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
