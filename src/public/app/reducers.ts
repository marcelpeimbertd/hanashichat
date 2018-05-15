import Redux from 'redux';
import ReduxActions from 'redux-actions';

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

const FETCH_MESSAGES = 'FETCH_MESSAGES';
const initialState: IMessagesState = { all: [] };

export const fetchMessagesActionCreator = ReduxActions.createAction<IMessagesPayload>(FETCH_MESSAGES);

export const handleMessage = ReduxActions
    .handleAction<{ all: IMessages } | undefined, IMessagesPayload>(
        FETCH_MESSAGES,
        (state, { payload = { messages: [] } }) => ({ ...state, all: payload.messages }), initialState);
