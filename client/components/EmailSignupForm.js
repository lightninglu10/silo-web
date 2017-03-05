/**
* Silo
* This is the email signup form.
* author: @patr
*/

import React from 'react';

// Router requirements
import { browserHistory } from 'react-router';

// Redux
import { connect } from 'react-redux';


class EmailSignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.signup = this.signup.bind(this);

        this.state = {
            validFirstName: true,
            validLastName: true,
            validEmail: true,
            validPassword: true,
            validPasswordAgain: true,
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            passwordAgainError: '',
            loading: false,
            signupWithEmail: false,
        }
    }

    signup(e) {
        e.preventDefault();

        var data = {
            first_name: this.refs.firstName.value,
            last_name: this.refs.lastName.value,
            email: this.refs.email.value,
            username: this.refs.email.value,
            password1: this.refs.password.value,
            password2: this.refs.password_again.value,
        }

        this.props.loginActions.signup(data)
        .then(result => {
            if (result) {
                browserHistory.replace('/');
            } else {
                // TODO: handle case of failure
                debugger
            }
        })
    }


    render() {
        const submitLabel = this.state.loading
        ? (<span>Signing in...</span>)
        : (<span> Sign up <i className="fa fa-arrow-right" aria-hidden="true"></i></span>);

        return (
            <div className="signup-form-container">
                <form className="form" style={styles.form} onSubmit={this.signup}>
                    <span className="fieldset">
                        <span className="error-message">{this.state.firstNameError}</span>
                        <div className="nickname-box input-box" style={styles.inputBox}>
                            <input
                                required
                                className={`form-control input ${(!this.state.validFirstName ? " error" : "")}`}
                                ref="firstName"
                                type="text"
                                placeholder="First Name"
                                maxLength="20"
                                autoComplete='off'
                                autoCorrect="off"
                                autoCapitalize="on"
                                spellCheck="false"
                                onKeyPress={this.onEnterClicked}
                                style={styles.input}
                                onChange={() => { (!this.state.validFirstName) ? this.validateNickname() : null}}
                            />
                            <i className="fa fa-user" aria-hidden="true" style={styles.icon}/>
                        </div>
                    </span>
                    <span className="fieldset">
                        <span className="error-message">{this.state.lastNameError}</span>
                        <div className="nickname-box input-box" style={styles.inputBox}>
                            <input
                                required
                                className={`form-control input ${(!this.state.validLastName ? " error" : "")}`}
                                ref="lastName"
                                type="text"
                                placeholder="Last Name"
                                maxLength="20"
                                autoComplete='off'
                                autoCorrect="off"
                                autoCapitalize="on"
                                spellCheck="false"
                                onKeyPress={this.onEnterClicked}
                                style={styles.input}
                                onChange={() => { (!this.state.validLastname) ? this.validateNickname() : null}}
                            />
                            <i className="fa fa-user" aria-hidden="true" style={styles.icon}/>
                        </div>
                    </span>
                    <span className="fieldset">
                        <span className="error-message">{this.state.emailError}</span>
                        <div className="input-box email-box" style={styles.inputBox}>
                            <input
                                required
                                className={`form-control input ${(!this.state.validEmail ? " error" : "")}`}
                                ref="email"
                                type="email"
                                placeholder="Email"
                                autoComplete='off'
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                onKeyPress={this.onEnterClicked}
                                style={styles.input}
                                onChange={() => { (!this.state.validEmail) ? this.validateEmail() : null}}
                            />
                            <i className="fa fa-envelope" style={styles.icon}/>
                        </div>
                    </span>
                    <span className="fieldset">
                        <span className="error-message">{this.state.passwordError}</span>
                        <div className="input-box password-box" style={styles.inputBox}>
                            <input
                                required
                                className={`form-control input ${(!this.state.validPassword ? " error" : "")}`}
                                ref="password"
                                type="password"
                                placeholder="Password, min 8 characters"
                                maxLength="120"
                                autoComplete='off'
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                onKeyPress={this.onEnterClicked}
                                style={styles.input}
                                pattern=".{8,}"
                                onChange={() => { (!this.state.validPassword) ? this.validatePassword() : null}}
                            />
                            <i className="fa fa-lock" style={styles.icon}/>
                        </div>
                    </span>
                    <span className="fieldset">
                        <span className="error-message">{this.state.passwordAgainError}</span>
                        <div className="input-box password-box" style={styles.inputBox}>
                            <input
                                required
                                className={`form-control input ${(!this.state.validPasswordAgain ? " error" : "")}`}
                                ref="password_again"
                                type="password"
                                placeholder="Password again"
                                maxLength="120"
                                autoComplete='off'
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                onKeyPress={this.onEnterClicked}
                                style={styles.input}
                                pattern=".{8,}"
                                onChange={() => { (!this.state.validPasswordAgain) ? this.validatePasswordAgain() : null}} 
                            />
                            <i className="fa fa-lock" style={styles.icon}/>
                        </div>
                    </span>
                    {this.state.loading
                        ? <button className="submit" disabled style={styles.submit}>{submitLabel}</button>
                        : <button className="submit" style={styles.submit}>{submitLabel}</button>
                    }
                </form>
            </div>
        );
    }
}

var styles = {
    submit: {
        width: '100%',
        border: 'none',
        padding: '15px 20px',
        color: '#fff',
        fontSize: '14px',
        backgroundColor: '#ff5a5f',
        letterSpacing: '1px',
        fontWeight: 'bold',
        outline: 'none',
    },
    input: {
        backgroundColor: '#ECF0F4',
        width: '100%',
        border: 0,
        outline: 'none',
        color: '#1F76E2',
        textShadow: '0px 0px 0px #313B49',
        fontWeight: 600,
        padding: '14px 12px',
        marginBottom: '8px',
        display: 'flex',
        alignSelf: 'stretch',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        color: 'black',
        width: '100%',
    },

    inputBox: {
        position: 'relative',
    },

    icon: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        bottom: '3px',
        right: '15px',
        opacity: .6,
    }
}

export default connect()(EmailSignUpForm)