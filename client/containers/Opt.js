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
import Radium from 'radium';

// Actions
import UserActions from '../actions/user';
import ContactActions from '../actions/contact';

// Settings
import { STATIC } from '../config/settings';

// Stylesheets
import '../stylesheets/containers/Opt.scss';

@Radium
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
                            <label>
                                <input type="checkbox" value={group.name} onChange={this.handleCheckbox} />
                                <span style={{marginLeft: '5px', fontWeight: 600}}>{ group.name.toLocaleLowerCase() } </span>
                            </label>
                        </div>
            groups_inner.push(group);
            if (index % 2 === 0 && index !== 0) {
                groups_3.push(groups_inner);
                groups_inner = []
            }
        });

        groups_3.push(groups_inner);

        var groups = groups_3.map((group, index) => {
            return (
                <div className="group" key={`group_${index}`} style={styles.groupRowContainer}>
                    { group }
                </div>
            );
        });
        return (
            <div className="opt-in-container" style={styles.optContainer}>
                {user.website
                    ?   <iframe style={styles.iframe} src={user.website}></iframe>
                    :   null
                }
                <div className="backlay" style={styles.backlay} />
                <form className="form-container" onSubmit={this.formSubmit} style={styles.formContainer}>
                    <div className="left" style={styles.formLeft}>
                        <img className="img" src={`${STATIC}/img/grey_shirts.jpg`} style={styles.formImage}/>
                    </div>

                    <div className="right" style={styles.formRight}>
                        <h2 className="sign-up-label" style={styles.titleContainer}>
                            Sign up for our Text Message List
                        </h2>
                        <hr style={{width: '80%', borderColor: 'black'}} />
                        <div className="name-container" style={styles.nameContainer}>
                            <div className="first-name" style={{paddingRight: '5px'}}>
                                <input
                                    className="form-control"
                                    placeholder="first name"
                                    ref="firstName"
                                    required={true}
                                    style={styles.inputControl}
                                />
                            </div>
                            <div className="last-name" style={{paddingLeft: '5px'}}>
                                <input
                                    className="form-control"
                                    placeholder="last name"
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
                                placeholder="phone number"
                            />
                        </div>
                        <div className="groups-container" style={styles.groupsContainer}>
                            <div className="group-label" style={{letterSpacing: '1px', paddingBottom: '10px',}}>
                                notify me about
                            </div>
                            { groups }
                        </div>
                        <div className="submit-container" style={styles.submitContainer}>
                            <button className="btn" style={styles.submitButton}> sign up </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

var styles = {
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
    formImage: {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
    },
    formLeft: {
        width: '50%',
        height: '100%',
    },
    formRight: {
        width: '50%',
        height: '100%',
        padding: '15px',
    },
    backlay: {
        transition: 'opacity 200ms ease-in-out',
        backgroundColor: 'rgba(65, 71, 83, 0.35)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: '0',
        background: 'linear-gradient(135deg, #E6DADA , #274046)',
        backgroundSize: 'cover',
        WebkitFilter: 'blur(3px)',
        MozFilter: 'blur(3px)',
        OFilter: 'blur(3px)',
        MsFilter: 'blur(3px)',
        filter: 'blur(3px)',
    },
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
        fontSize: '18px',
        color: '#fff',
        letterSpacing: '1.5px',
        padding: '10px 16px',
        width: '100%',
        background: 'black',
    },
    titleContainer: {
        textAlign: 'center',
    },
    optContainer: {
        height: '100%',
        minHeight: '800px',
    },
    formContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        width: '80%',
        minHeight: '60%',
        maxHeight: '650px',
        border: '5px solid black',
        // maxWidth: '650px',
        display: 'flex',
        height: '80%',
    },
    nameContainer: {
        paddingBottom: '10px',
        display: 'flex',
    },
    numberContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupsContainer: {
        textAlign: 'center',
        fontSize: '18px',
        paddingTop: '20px',
        margin: '0 auto',
    },
    phoneNumberInput: {
        textAlign: 'center',
    },
    inputControl: {
        textAlign: 'center',
        fontSize: '18px',
        letterSpacing: '.5px',
        height: '43px',
        borderColor: 'black',
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
