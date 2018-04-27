import moment from 'moment';
import React from 'react';
import io from 'socket.io-client';

interface IMessage {
    id: string;
    message: string;
    email: string;
    date: string;
}
interface IChatProps {
    messages?: IMessage[];
}
class Chat extends React.Component<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }
    public splitMessages() {
        const messages = this.props.messages ? this.props.messages : [];
        return messages.length ? messages.map(
            (value, index) => <p className="message" key={Date.parse(value.date).toString() + '-' + index}>
                {value.message} <span className="timeMessage" >
                    {moment(value.date).format('MMM DD YYYY HH:mm')}
                </span>
            </p>) :
            <p className="message default">Say Hello</p>;
    }
    public sendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const socket = io();
            socket.emit('chat message', event.currentTarget.value);
        }
    }
    public render() {
        const inputOptions = {
            className: 'clientBox',
            name: '',
            onKeyPress: this.sendMessage,
            placeholder: 'Write a message',
            type: 'text',
        };
        return <div className="chatbox">
            {this.splitMessages()}
            <input {...inputOptions} />
        </div>;
    }
}

export default Chat;
