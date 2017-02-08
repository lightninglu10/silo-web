/**
* Silo
* This is the email login form.
* author: @patr
*/

import React from 'react';

// Router requirements
import { browserHistory, Link } from 'react-router';

export default class EmailLoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();
        var data = {
            email: this.refs.email.value,
            password: this.refs.password.value,
        }

        this.props.loginActions.login(data)
        .then(result => {
            if (result) {
                browserHistory.push('/');
            } else {
                // TODO: handle case of failure
                debugger
            }
        })
    }

    render() {
        const submitLabel = this.props.loading
          ? (<span>Logging in...</span>)
          : (<span>Log in <i className="fa fa-arrow-right" aria-hidden="true"></i></span>);

        return (
            <form className="email-login-form" style={styles.loginForm} onSubmit={this.login}>
                <div className="email-box" style={styles.box}>
                    <input
                        required
                        style={styles.input}
                        className='input'
                        ref="email"
                        type="email"
                        placeholder="Email Address"
                        autoComplete='off'
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        onKeyPress={this.onEnterClicked}
                    />
                    <i className="fa fa-envelope email-icon" style={styles.emailIcon} />
                </div>
                <div className="password-box" style={styles.box}>
                    <input
                        required
                        style={styles.input}
                        className="input"
                        ref="password"
                        type="password"
                        placeholder="Password"
                        autoComplete='off'
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        onKeyPress={this.onEnterClicked}
                    />
                    <i className="fa fa-lock password-icon" style={styles.passwordIcon} />
                </div>
                { this.props.loading
                    ? <button className="submit" style={styles.submit} onClick={this.login} disabled>{submitLabel}</button>
                    : <button className="submit" style={styles.submit} onClick={this.login}>{submitLabel}</button>
                }
            </form>
        );
    }
}

var styles = {
    subForm: {
        display: 'flex',
        marginTop: '10px',
        marginBottom: '10px',
        alignSelf: 'stretch',
    },
    forgotBtn: {
        textAlign: 'left',
        color: '#7E838A',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    signupBtn: {
        marginLeft: 'auto',
        textAlign: 'right',
        justifyContent: 'flex-end',
        display: 'flex',
        cursor: 'pointer',
    },
    signup: {
        fontWeight: '600',
        textDecoration: 'underline',
        marginLeft: '3px',
    },
    loginForm: {
        width: '100%',
    },
    box: {
        position: 'relative',
    },
    emailIcon: {
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        bottom: '3px',
        position: 'absolute',
        opacity: .6,
    },
    passwordIcon: {
        opacity: .6,
        top: '50%',
        transform: 'translateY(-50%)',
        bottom: '3px',
        position: 'absolute',
        right: '17px',
        fontSize: '16px',
    },
    input: {
        backgroundColor: '#ECF0F4',
        width: '100%',
        border: 0,
        outline: 'none',
        color: '#1F76E2',
        textShadow: '0px 0px 0px #313B49',
        // -webkit-text-fill-color: transparent;
        fontWeight: 600,
        padding: '14px 12px',
        marginBottom: '8px',
    },
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
    }
}
