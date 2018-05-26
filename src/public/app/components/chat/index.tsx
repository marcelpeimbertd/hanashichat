import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { RouteProps } from 'react-router';
import { Action } from 'redux-actions';
import io from 'socket.io-client';

interface IMessage {
    id: string;
    message: string;
    email: string;
    date: string;
}

interface IConversation {
    id: string;
    chat: string;
    name: string;
    emails: string;
    messages: IMessage[];
}
interface IChatProps extends RouteProps{
    user: Store.IUser;
    messages?: IMessage[];
    conversation?: string;
    fetchMessages: (t1: Store.IMessages) => Action<Store.IMessagesPayload>;
    // sendMessage?(message: IMessage): void;
}

type EspecialEvent = React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>;
class Chat extends React.Component<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }
    public componentDidMount() {
        this.getMessages();
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
    public getMessages() {
        console.log('hi');
    }
    public sendMessage(event: EspecialEvent) {
        if ((event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter') {
            if (this.props.sendMessage) {
                // this.props.sendMessage({ message: event.currentTarget.value });
            }
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
            <button type="button">Send</button>
        </div>;
    }
}

export default Chat;
