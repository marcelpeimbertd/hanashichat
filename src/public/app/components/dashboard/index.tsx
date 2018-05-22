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
    contacts: Store.IUsers;
}
class DashBoard extends React.Component<IDashBoardProps, IDashBoardState> {
    private contacts: never[] | JSX.Element = [];
    constructor(props: IDashBoardProps) {
        super(props);
        this.state = {
            contacts: [],
            showUsers: false,
        };
    }
    public componentDidMount() {
        this.fetchContacts(this.props.user.contacts);
    }
    public componentDidUpdate() {
        this.fetchContacts(this.props.user.contacts);
    }
    public render() {
        return <div>
            <Link to="/login" onClick={this.logout}>Log out</Link>
            <input type="search" name="" id="searchUser" placeholder="Search" onChange={this.getUsers} />
            {this.showUsers(this.state.showUsers)}
        </div>;
    }
    private logout(event: any) {
        console.log('logout works');
        event.preventDefault();
    }
    private getUsers = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target;
        if (search.value.length > 3) {
            axios.post('/users', { looking: search.value })
                .then((response) => {
                    if (response.data.err) {
                        throw response.data;
                    }
                    this.props.fetchUsers(response.data);
                    this.setState({
                        showUsers: true,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.props.fetchUsers({ users: [] });
            this.setState({
                showUsers: false,
            });
        }
    }
    private fetchContacts = (contacts: string[]) => {
        if (contacts.length !== this.state.contacts.length) {
            axios.post('/contacts')
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }
    private addContact = (event: React.MouseEvent<HTMLUListElement>) => {
        const li = event.target as HTMLLIElement;
        if (li.tagName === 'LI') {
            const data = { id: li.getAttribute('id') };
            axios.post('/add', data)
                .then((response) => {
                    if (response.data.err) {
                        throw response.data.err;
                    }
                    this.props.fetchUser(response.data);
                    (document.getElementById('searchUser') as HTMLInputElement).setAttribute('textContent', '');
                    this.setState({ showUsers: false });
                })
                .catch((error) => { console.error(error); });
        }
    }
    private showUsers(showUsers: boolean) {
        if (showUsers === true) {
            return this.defineList(
                this.props.users,
                { className: 'users', onClick: this.addContact },
            );
        }
        return <div>
            <h1>Contacts</h1>
            <h1>Chats</h1>
        </div>;
    }
    private defineList(
        list: any[],
        ulProps?: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
        liProps?: React.DetailedHTMLProps<
            React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
        if (!list) {
            return [];
        }
        return <ul {...ulProps}>
            {list.map((value) => {
                liProps = liProps ? liProps : {};
                liProps.id = value.id;
                return <li {...liProps}>{value.firstName + ' ' + value.lastName}</li>;
            })}
        </ul>;
    }
}

export default DashBoard;
