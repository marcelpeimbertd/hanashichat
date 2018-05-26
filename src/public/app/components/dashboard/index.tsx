import axios from 'axios';
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Action } from 'redux-actions';

interface IDashBoardProps {
    user: Store.IUser;
    users: Store.IUsers;
    fetchUser: (t1: Store.IUserPayload) => Action<Store.IUserPayload>;
    fetchUsers: (t1: Store.IUsersPayload) => Action<Store.IUsersPayload>;
}
interface IDashBoardState {
    showUsers: boolean;
    fetching: boolean;
    contacts: Store.IUsers;
}
class DashBoard extends React.Component<IDashBoardProps, IDashBoardState> {
    constructor(props: IDashBoardProps) {
        super(props);
        this.state = {
            contacts: [],
            fetching: false,
            showUsers: false,
        };
    }
    public componentDidMount() {
        if (this.props.user) {
            this.fetchContacts(this.props.user.contacts);
        }
    }
    public render() {
        return <div>
            <Link to="/login" onClick={this.logout}>Log out</Link>
            <input type="search" name="" id="searchUser" placeholder="Search" onChange={this.getUsers} />
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
            this.setState({
                fetching: true,
            });
            axios.post('/users', { looking: search.value })
                .then((response) => {
                    if (response.data.err) {
                        throw response.data;
                    }
                    this.props.fetchUsers(response.data);
                    this.setState({
                        fetching: false,
                        showUsers: true,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.props.fetchUsers({ users: [] });
            if (this.state.showUsers || this.state.fetching) {
                this.setState({
                    fetching: false,
                    showUsers: false,
                });
            }
        }
    }
    private fetchContacts = (contacts: string[]) => {
        if (contacts.length !== this.state.contacts.length && contacts.length) {
            this.setState({
                fetching: true,
            });
            axios.post('/contacts')
                .then((response) => {
                    this.props.fetchUser(response.data);
                    this.setState({
                        contacts: response.data.contacts,
                        fetching: false,
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.setState({
                contacts: [],
            });
        }
    }
    private clickContact = (event: React.MouseEvent<HTMLUListElement>) => {
        const li = (event.target as HTMLElement).parentNode as HTMLLIElement;
        const target = (event.target as HTMLElement);
        const id = li.getAttribute('id');
        if (id && li.tagName === 'LI') {
            if (li.className === 'add' && target.tagName === 'A') {
                this.addContact(id);
            }
            if (target.className === 'delete') {
                this.deleteContact(id);
            }
        }
        event.preventDefault();
    }
    private addContact = (id: string) => {
        const data = { id };
        axios.post('/contact', data)
            .then((response) => {
                if (response.data.err) {
                    throw response.data.err;
                }
                this.props.fetchUser(response.data);
                this.fetchContacts(response.data.user.contacts);
                (document.getElementById('searchUser') as HTMLInputElement).setAttribute('textContent', '');
                this.setState({ showUsers: false });
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
                this.props.fetchUser(response.data);
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
                { className: 'users', onClick: this.clickContact },
                { className: 'add' },
            );
        }
        return <div>
            <h1>Contacts</h1>
            {this.defineList(this.state.contacts,
                { className: 'contacts', onClick: this.clickContact },
                undefined,
                <span className="delete">X</span>,
            )}
            <h1>Chats</h1>
        </div>;
    }
    private defineList(
        list: any[],
        ulProps?: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
        liProps?: React.DetailedHTMLProps<
            React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
        ...extraElements: any[]) {
        if (!list) {
            return [];
        }
        return <ul {...ulProps}>
            {list.map((value) => {
                return <li {...liProps} id={value.id} key={value.id}>
                    <Link to={`/dashboard/${value.username}`}>
                        {value.firstName + ' ' + value.lastName}
                    </Link>
                    {extraElements}
                </li>;
            })}
        </ul>;
    }
}

export default DashBoard;
