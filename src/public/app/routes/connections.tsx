import { connect } from 'react-redux';
import Chat from '../components/chat';
import { fetchMessagesActionCreator } from '../reducers';

type IMessages = IMessage[];

interface IMessage {
    id: string;
    message: string;
    email: string;
    date: string;
}

interface IMessagesPayload {
    messages: IMessages;
}

interface IMessagesState {
    all: IMessages;
}

interface IConversation {
    id: string;
    chat: string;
    name: string;
    emails: string;
    messages: IMessage[];
}
interface IChatProps {
    messages?: IMessage[];
    conversation: string;
    sendMessage(message: string): void;
}

export const ConnectedChat = connect(
    (state: IMessagesState, ownProps: IChatProps) => ({ messages: state.all }),
    { getMessages: fetchMessagesActionCreator })(Chat);
