import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { Trans, translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Action } from 'redux-actions';
import { joinRooms } from '../../socketio/config';
import Lenguage from '../Settings/lenguage';
import './dashboard';

interface IDATA {
    id?: string | null;
    conversation?: Base.IConversation;
}

interface IFetching {
    command: string;
    args: any[];
}

export interface IDashBoardProps {
    t?: (t: string) => string;
    user: Store.IUser;
    users: Store.IUsers;
    update: Store.IConversation;
    fetchConversation: (conversation: Store.IConversation) => Action<Store.IConversationPayload>;
    fetchUser: (user: Store.IUser) => Action<Store.IUserPayload>;
    fetchUsers: (users: Store.IUsers) => Action<Store.IUsersPayload>;
}
interface IDashBoardState {
    showUsers: boolean;
    fetching: IFetching[];
    option: boolean;
    contacts: Store.IUsers;
    conversations: Store.IConversation[];
}
class DashBoard extends React.Component<IDashBoardProps, IDashBoardState> {
    constructor(props: IDashBoardProps) {
        super(props);
        this.state = {
            contacts: [],
            conversations: [],
            fetching: [],
            option: false,
            showUsers: false,
        };
    }
    public componentDidMount() {
        if (this.props.user) {
            const fetchContacts: IFetching = {
                args: [this.props.user.contacts],
                command: 'contacts',
            };
            const fetchConversations: IFetching = {
                args: [this.props.user.conversations],
                command: 'conversations',
            };
            this.setState({
                fetching: [fetchConversations, fetchContacts],
            });
        }
    }
    public componentDidUpdate() {
        this.fetch(Array.from(this.state.fetching));
    }
    public render() {
        const { t = (s: string) => s } = this.props;
        return <div className="dashboard">
            <div className="bloque">
                <div className="profileIMG"
                    style={{ backgroundImage: 'url(/images/predefined/user-icon.png)' }}></div>
                <Lenguage />
            </div>
            <div className="bloque">
                <Link className="logout" to="/login" onClick={this.logout}>Log <br /> out</Link>
                <input type="search" className="searchUser"
                    name="" id="searchUser" placeholder={t('Search')} onChange={this.getUsers} />
            </div>
            {this.showUsers(this.state.showUsers)}
        </div>;
    }
    private logout(event: any) {
        event.preventDefault();
        axios.get('/logout')
            .then((response) => {
                if (response.data.err) {
                    throw response.data.err;
                }
                window.location.assign(response.data.redirect);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    private getUsers = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target;
        if (search.value.length > 3) {
            axios.post('/users', { looking: search.value })
                .then((response) => {
                    if (response.data.err) {
                        throw response.data;
                    }
                    if (response.data.status) {
                        this.props.fetchUsers(response.data.users);
                        this.setState({
                            showUsers: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.props.fetchUsers([]);
            if (this.state.showUsers || this.state.fetching) {
                this.setState({
                    showUsers: false,
                });
            }
        }
    }
    private fetch = (fetcherArray: IFetching[]) => {
        const fetchFns: { [key: string]: (args: any) => void } = {
            contacts: this.fetchContacts,
            conversations: this.fetchConversations,
        };
        if (fetcherArray.length) {
            const { command, args } = fetcherArray[0];
            fetcherArray[0] = {
                args: [],
                command: 'wait',
            };
            if (command !== 'wait') {
                this.setState({
                    fetching: fetcherArray,
                });
                fetchFns[command].apply(this, args);
            }
        }
    }
    private fetchConversation = (id: string) => {
        const conversation = this.state.conversations.find(((conv) => {
            const isConvId = conv.id === id;
            const isContactID = conv.participants.every(
                (participant) => participant.id === id || participant.id === this.props.user.id);
            return isConvId || isContactID;
        }));
        if (conversation) {
            this.props.fetchConversation(conversation);
        }
    }
    private fetchContacts = (contacts: string[]) => {
        if (contacts.length !== this.state.contacts.length && contacts.length) {
            axios.post('/contacts')
                .then((response) => {
                    this.props.fetchUser(response.data.user);
                    this.setState({
                        contacts: response.data.contacts,
                        fetching: this.state.fetching.slice(1),
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.setState({
                contacts: [],
                fetching: this.state.fetching.slice(1),
            });
        }
    }
    private fetchConversations = (conversations: string[]) => {
        if (conversations.length !== this.state.conversations.length && conversations.length) {
            axios.post('/conversations')
                .then((response) => {
                    joinRooms(response.data.conversations);
                    this.setState({
                        conversations: response.data.conversations,
                        fetching: this.state.fetching.slice(1),
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.setState({
                conversations: [],
                fetching: this.state.fetching.slice(1),
            });
        }
    }
    private clickContact = (event: React.MouseEvent<HTMLUListElement>) => {
        const li = (event.target as HTMLElement).parentNode as HTMLLIElement;
        const target = (event.target as HTMLElement);
        const id = li.getAttribute('id');
        if (id && li.tagName === 'LI') {
            const arrayinfo = id.split('-');
            const infoContact = {
                id: arrayinfo[0],
                username: arrayinfo[1],
            };
            const infoUser = {
                id: this.props.user.id,
                username: this.props.user.username,
            };
            const data: IDATA = {
                conversation: {
                    isGroup: false,
                    isPublic: false,
                    messages: {
                        previous: [],
                    },
                    name: '',
                    participants: [infoContact, infoUser],
                },
                id: infoContact.id,
            };
            if (li.className === 'add' && target.tagName === 'A') {
                this.createConversation(data);
            }
            if (target.className === 'delete') {
                this.deleteContact(infoContact.id);
            }
            if (li.className === 'conversation' || li.className === 'contact' && target.tagName === 'A') {
                this.fetchConversation(infoContact.id);
            }
        }
        event.preventDefault();
    }
    private createConversation = (data: IDATA) => {
        axios.post('/conversation', data)
            .then((response) => {
                if (response.data.err) {
                    throw response.data.err;
                }
                if (response.data.status) {
                    data.conversation = response.data.conversation;
                    joinRooms([response.data.conversation]);
                    this.props.fetchConversation(response.data.conversation);
                    this.addContact(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    private addContact = (data: IDATA) => {
        axios.post('/contact', data)
            .then((response) => {
                if (response.data.err) {
                    throw response.data.err;
                }
                if (response.data.status) {
                    this.props.fetchUser(response.data.user);
                    (document.getElementById('searchUser') as HTMLInputElement).setAttribute('textContent', '');
                    this.setState({
                        fetching: this.state.fetching.concat({
                            args: response.data.user.contacts,
                            command: 'contacts',
                        }),
                        showUsers: false,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    private deleteContact = (id: string) => {
        const data = { id };
        axios.delete('/contact', { params: data })
            .then((response) => {
                if (response.data.err) {
                    throw response.data.err;
                }
                this.props.fetchUser(response.data.user);
                this.fetchContacts(response.data.user.contacts);
                (document.getElementById('searchUser') as HTMLInputElement).setAttribute('textContent', '');
                this.setState({ showUsers: false });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    private showUsers(showUsers: boolean) {
        if (showUsers === true) {
            return this.defineList(
                this.props.users,
                'contact',
                { className: 'users', onClick: this.clickContact },
                { className: 'add' },
            );
        }
        return <div className="navs">
            <div className="navContacts"><h1><Trans>Contacts</Trans></h1></div>
            {this.defineList(this.state.contacts,
                'contact',
                { className: 'contacts', onClick: this.clickContact },
                { className: 'contact' },
                <span className="delete"></span>,
            )}
            <div className="navChats"><h1><Trans>Chats</Trans></h1></div>
            {this.defineList(this.state.conversations,
                'conversation',
                { className: 'conversations', onClick: this.clickContact },
                { className: 'conversation' },
            )}
        </div>;
    }
    private defineList(
        list: any[],
        type: string,
        ulProps?: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
        liProps?: React.DetailedHTMLProps<
            React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
        ...extraElements: any[]) {
        if (!list) {
            return [];
        }
        if (type === 'contact') {
            return <ul {...ulProps}>
                {list.map((value) => {
                    return <li {...liProps} id={value.id + '-' + value.username} key={value.id}>
                        <Link to={'/dashboard/' + value.username}>
                            <div className="profileIMG"
                                style={{ backgroundImage: 'url(/images/predefined/user-icon.png)' }}></div>
                        </Link>
                        <Link to={'/dashboard/' + value.username}>
                            {value.firstName + ' ' + value.lastName}
                        </Link>
                        {extraElements}
                    </li>;
                })}
            </ul>;
        }
        return <ul {...ulProps}>
            {list.map((conversation: Store.IConversation) => {
                if (conversation.messages.current) {
                    const participant = conversation.participants.filter((value) => {
                        return value.id !== this.props.user.id;
                    })[0];
                    let convParticipant: Store.IUser | undefined;
                    if (!participant) {
                        const isMe = conversation.participants.every((value) => {
                            return value.id === this.props.user.id;
                        });
                        convParticipant = isMe ? this.props.user : undefined;
                    } else {
                        convParticipant = this.state.contacts.find((contact) => {
                            return contact.id === participant.id;
                        });
                    }
                    conversation.name = conversation.name ?
                        conversation.name :
                        convParticipant ?
                            convParticipant.firstName + ' ' + convParticipant.lastName :
                            participant.username;
                    return <li {...liProps} id={conversation.id} key={conversation.id}>
                        <Link to={`/dashboard/${conversation.id}`}>
                            <div className="profileIMG"
                                style={{ backgroundImage: 'url(/images/predefined/user-icon.png)' }}></div>
                        </Link>
                        <Link to={`/dashboard/${conversation.id}`}>
                            {conversation.name} <br />
                            <div className="lastMessage">{conversation.messages.current.message}</div>
                        </Link>
                        {extraElements}
                    </li>;
                } else {
                    return undefined;
                }
            })}
        </ul>;
    }
}

export default translate('translations')(DashBoard);
