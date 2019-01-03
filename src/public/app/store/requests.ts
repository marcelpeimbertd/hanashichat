import axios from 'axios';
import { connectIO } from './../socketio/config';
import { fetchUser } from './actions';

function isLoggedIn() {
    axios.get('/isloggedin')
        .then(({ data }) => {
            if (data.err) {
                throw data;
            }
            if (data.user) {
                connectIO();
                fetchUser(data.user);
                this.setState({
                    isLogged: true,
                    isfetch: true,
                });
            } else {
                this.setState({
                    isLogged: false,
                    isfetch: true,
                });
            }
        })
        .catch((error) => {
            this.setState({
                isLogged: false,
                isfetch: true,
            });
            console.error(error);
        });
}
}