/**
* Silo
* This is the container for the Contacts / groups page of the app.
* author: @patr
*/

import React from 'react';

// NPM Components
import Radium from 'radium';

// Redux
import { connect } from 'react-redux';

// Styles
import { styles as MessageStyles} from './MessagesContainer';

@Radium
class ContactsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeID: ''
        }
    }

    componentDidMount() {

    }

    render() {
        let { user } = this.props;

        var contacts = user.contacts.map((contact, index) => {

            var contactStyle = this.state.activeID === contact.id ? Object.assign({}, styles.contact, {background: ACTIVE_BACKGROUND, color: '#fff'}) : styles.contact;
            return (
                <div key={contact.id} className="contact" style={contactStyle} onClick={() => this.setState({activeID: contact.id})}>
                    <div className="name" style={styles.contact.name}>
                        { contact.name }
                    </div>
                </div>
            );
        });
        return (
            <div className="contacts-container col-xs-4" style={styles.contactsContainer}>
                <div className="search" style={MessageStyles.searchContainer}>
                    <input placeholder="&#xf002; Search" type="text" className="form-control" style={MessageStyles.inputControl} />
                </div>
                <ol className="contacts-list" style={styles.contactsList}>
                    { contacts }
                </ol>
            </div>
        );
    }
}

const ACTIVE_BACKGROUND = '#00c0ef'

var styles = {
    contact: {
        padding: '0px 10px',
        ':hover': {
            background: ACTIVE_BACKGROUND,
            color: '#fff',
        },
        name: {
            padding: '15px',
            borderBottom: '1px solid rgb(211, 211, 211)',
        }
    },
    contactsContainer: {
        padding: 0,
        borderRight: '1px solid rgb(211, 211, 211)',
        height: '100%',
    },
    contactsList: {
        listStyleType: 'none',
        marginTop: 0,
        marginBottom: 0,
        // padding: '0px 10px',
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(ContactsContainer)
