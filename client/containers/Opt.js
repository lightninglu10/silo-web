/**
* Silo
* This is the container for the opt in form of the app.
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// NPM Utils
import Phone from 'react-phone-number-input';

// Actions
import UserActions from '../actions/user';
import ContactActions from '../actions/contact';

// Stylesheets
import '../stylesheets/containers/Opt.scss';

class Opt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: '',
            groups: [],
        }
    }

    handleCheckbox = (e) => {
        if (e.target.checked) {
            this.setState({
                groups: this.state.groups.concat([e.target.value])
            });
        } else {
            this.setState({
                groups: this.state.groups.slice(1 + this.state.groups.indexOf(e.target.value), this.state.groups.length)
            });
        }
    }

    formSubmit = (e) => {
        e.preventDefault();
        let { contactActions } = this.props;

        // Turn the list into comma separated string for the backend to process

        var groups = ''
        for (var i = 0; i < this.state.groups.length; i++) {
            groups += this.state.groups[i] +','
        }

        // TODO: change contact book
        var data = {
            first_name: this.refs.firstName.value,
            last_name: this.refs.lastName.value,
            number: this.state.number,
            groups: groups.substring(0, groups.length - 1),
            contact_book: 0,
        }

        contactActions.optIn(data)
        .then((result) => {
            debugger
            if (result.success) {
                window.location.reload();
            }
        });
    }

    componentDidMount() {
        let { userActions } = this.props;
        userActions.getAllGroups();
    }

    render() {
        let { user } = this.props;
        var groups_3 = []
        var groups_inner = []
        user.groups.map((group, index) => {
            var group = <div className="group-box" key={`group_${group.name}_${index}`} style={{'flex': 1}}>
                            <label><input type="checkbox" value={group.name} onChange={this.handleCheckbox} /> { group.name } </label>
                        </div>
            groups_inner.push(group);
            if (index % 3 === 0 && index !== 0) {
                groups_3.push(groups_inner);
                groups_inner = []
            }
        });

        groups_3.push(groups_inner);

        var groups = groups_3.map((group, index) => {
            return (
                <div className="row" key={`group_${index}`} style={styles.groupRowContainer}>
                    { group }
                </div>
            );
        });
        return (
            <div className="opt-in-container" style={styles.optContainer}>
                <h1 className="sign-up-label" style={styles.signupLabelContainer}>
                    Sign up for our Text Message List
                </h1>
                <form className="form-container container" onSubmit={this.formSubmit} style={styles.formContainer}>
                    <div className="name-container row" style={styles.nameContainer}>
                        <div className="first-name col-xs-6">
                            <input
                                className="form-control"
                                placeholder="First Name"
                                ref="firstName"
                                required={true}
                                autoFocus={true}
                                style={styles.inputControl}
                            />
                        </div>
                        <div className="last-name col-xs-6">
                            <input
                                className="form-control"
                                placeholder="Last Name"
                                ref="lastName"
                                required={true}
                                style={styles.inputControl}
                            />
                        </div>
                    </div>

                    <div className="number-container" style={styles.numberContainer}>
                        <Phone
                            className="form-control"
                            value={this.state.number}
                            onChange={phone => this.setState({ number: phone })}
                            style={styles.phoneNumberInput}
                            country='US'
                            required={true}
                            placeholder="Phone Number"
                        />
                    </div>

                    <div className="groups-container" style={styles.groupsContainer}>
                        <div className="group-label">
                            Notify me about
                        </div>
                        { groups }
                    </div>

                    <div className="submit-container" style={styles.submitContainer}>
                        <button className="btn bg-yellow" style={styles.submitButton}> Sign up </button>
                    </div>
                </form>
            </div>
        );
    }
}

var styles = {
    groupRowContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitContainer: {
        textAlign: 'center',
        paddingTop: '25px',
    },
    submitButton: {
        fontSize: '24px',
        color: '#fff',
        letterSpacing: '1px',
        padding: '10px 16px',
        width: '60%',
    },
    signupLabelContainer: {
        textAlign: 'center',
    },
    optContainer: {
        height: '100%',
    },
    formContainer: {

    },
    nameContainer: {
        paddingBottom: '25px',
    },
    numberContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupsContainer: {
        textAlign: 'center',
        fontSize: '18px',
        paddingTop: '25px',
        width: '50%',
        margin: '0 auto',
    },
    phoneNumberInput: {
        width: '60%',
        textAlign: 'center',
    },
    inputControl: {
        textAlign: 'center',
        fontSize: '24px',
        height: '50px',
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        contactActions: bindActionCreators(ContactActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Opt)
