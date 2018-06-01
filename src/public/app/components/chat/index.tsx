import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { RouteProps } from 'react-router';
import { Action } from 'redux-actions';
import io from 'socket.io-client';

interface IChatProps extends RouteProps {
    user: Store.IUser;
    conversation: Store.IConversation;
    fetchConversation: (t1: Store.IConversationPayload) => Action<Store.IConversationPayload>;
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

        const messages = this.props.conversation.messages.current ?
            this.props.conversation.messages : undefined;

        if (messages) {
            const ME = 'me';
            const PARTICIPANT = 'participant';
            const currentMessage = <p className={'message ' +
                messages.current.userid === this.props.user.id ? ME : PARTICIPANT}
                key={messages.current.date.toString() + '-current'}>
                {messages.current.message} <span className="timeMessage" >
                    {moment(messages.current.date).format('MMM DD YYYY HH:mm')}
                </span>
            </p>;

            const previousMessages = messages.previous.length ? messages.previous.map(
                (value, index) => <p className={'message ' + value.userid === this.props.user.id ? ME : PARTICIPANT}
                    key={value.date.toString() + '-' + index}>
                    {value.message} <span className="timeMessage" >
                        {moment(value.date).format('MMM DD YYYY HH:mm')}
                    </span>
                </p>) :
                [];
            return [currentMessage, ...previousMessages];
        }

        return <p className="message default">Say Hello</p>;
    }
    public getMessages() {
        console.log('hi');
    }
    public sendMessage = (event: EspecialEvent) => {
        if ((event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter') {
            const data = {
                conversationID: this.props.conversation.id,
                current: this.props.conversation.messages.current,
                newMessage: {
                    date: new Date(),
                    message: (event.target as HTMLInputElement).value,
                    userid: this.props.user.id,
                },
            };
            axios.post('/message', data)
                .then((response) => {
                    if (response.data.err) {
                        throw response.data.err;
                    }
                    this.props.fetchConversation(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
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
            <button className="btn" type="button">Send</button>
        </div>;
    }
}

export default Chat;
