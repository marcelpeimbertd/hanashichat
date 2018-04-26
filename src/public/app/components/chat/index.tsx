import moment from 'moment';
import React from 'react';

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
            (value, index) => <p className="message">
                {value.message} <span className="timeMessage" >
                    {moment(value.date).format('MMM DD YYYY HH:mm')}
                </span>
            </p>) :
            <p className="message default">Say Hello</p>;
    }
    public sendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            console.log(event.currentTarget.value);
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
