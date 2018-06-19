import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { RouteProps } from 'react-router';
import { Action } from 'redux-actions';
import { updateConversation } from '../../socketio/config';
import './chat';

interface IChatProps extends RouteProps {
    user: Store.IUser;
    conversation: Store.IConversation;
    fetchConversation: (t1: Store.IConversationPayload) => Action<Store.IConversationPayload>;
}

type EspecialEvent = React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>;
class Chat extends React.Component<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }
    public componentDidMount() {
        this.getMessages();
    }
    public getMessages() {
        console.log('hi');
    }
    public sendMessage = (event: EspecialEvent) => {
        if (!(event as React.KeyboardEvent<HTMLTextAreaElement>).shiftKey &&
            (event as React.KeyboardEvent<HTMLTextAreaElement>).key === 'Enter' &&
            (event.target as HTMLTextAreaElement).className === 'clientBox') {
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
                    updateConversation(response.data.conversation);
                })
                .catch((error) => {
                    console.error(error);
                });
            (event.target as HTMLInputElement).value = '';
            event.preventDefault();
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
            <div className="containerbox">
                <div className="messagesbox">
                    {this.splitMessages()}
                </div>
            </div>
            <div className="senderbox">
                <textarea {...inputOptions} />
                <button className="btn" type="button">Send</button>
            </div>
        </div>;
    }
    private splitMessages = () => {

        const messages = this.props.conversation.messages.current ?
            this.props.conversation.messages : undefined;

        if (messages) {
            const ME = 'me';
            const PARTICIPANT = 'participant';
            const MESSAGE = 'message';
            const MECOLOR = 'meColor';
            const PARTICIPANTCOLOR = 'participantColor';
            const MESSAGETEXT = 'messagetext';
            const currentMessage = <div
                className={MESSAGE.concat(' ', messages.current.userid === this.props.user.id ? ME : PARTICIPANT)}
                key={messages.current.date.toString() + '-current'}>
                <div className="profileIMG"
                    style={{ backgroundImage: 'url(/images/predefined/user-icon.png)' }}></div>
                <div className={MESSAGE
                    .concat(' ', MESSAGETEXT,
                        ' ', messages.current.userid === this.props.user.id ? MECOLOR : PARTICIPANTCOLOR)}>
                    <p>
                        {messages.current.message.split('\n').map((item, key) => {
                            return [item, <br />];
                        })} <span className="timeMessage" >
                            {this.getTime(new Date(messages.current.date))}
                        </span>
                    </p>
                </div>
            </div>;

            const previousMessages = messages.previous.length ? messages.previous.map(
                (value, index) => <div
                    className={MESSAGE.concat(' ', value.userid === this.props.user.id ? ME : PARTICIPANT)}
                    key={value.date.toString() + '-current'}>
                    <div className="profileIMG"
                        style={{ backgroundImage: 'url(/images/predefined/user-icon.png)' }}></div>
                    <div className={MESSAGE
                        .concat(' ', MESSAGETEXT,
                            ' ', value.userid === this.props.user.id ? MECOLOR : PARTICIPANTCOLOR)}>
                        <p>
                            {value.message.split('\n').map((item, key) => {
                                return [item, <br />];
                            })} <span className="timeMessage" >
                                {this.getTime(new Date(value.date))}
                            </span>
                        </p>
                    </div>
                </div>) :
                [];
            return [...previousMessages, currentMessage];
        }

        return <div className="message">
            <div className="defaultWrapper">
                <p className="message default">Say Hello</p>
            </div>
        </div>;
    }
    private getTime(date: Date) {
        const now = new Date();
        if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth()) {
            return moment(date).format('HH:mm');
        }
        if (now.getMonth() === date.getMonth()) {
            return moment(date).format('DD HH:mm');
        }
        return moment(date).format('MMM DD HH:mm');
    }
}

export default Chat;
