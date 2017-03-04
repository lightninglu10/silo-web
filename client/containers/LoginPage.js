/**
* Silo
* This is the login / signup component.
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Router
import { Link } from 'react-router';

// Actions
import LoginActions from '../actions/login';
import MessagesActions from '../actions/messages';

// Components
import FacebookLoginComponent from '../components/FacebookLoginComponent';
import EmailLoginForm from '../components/EmailLoginForm';
import EmailSignUp from '../components/EmailSignUp';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signUpWithEmail: false,
            loading: false,
        }
    }

    render() {
        let { user, loginActions, messagesActions } = this.props; 
        return (
            <div className={this.props.route.login ? "login-container" : 'signup-container'} style={styles.loginContainer}>
                <div className={this.props.route.login ? "login-component" : 'signup-component'} style={styles.container}>
                    <FacebookLoginComponent
                        textButton={this.props.route.login ? 'Login With Facebook' : 'Sign Up With Facebook'}
                        user={user}
                        loginActions={loginActions}
                    />

                    <div className="divider" style={styles.divider}>
                        <hr className="first" style={styles.dividerLine}/>
                        <span style={styles.or}>or</span>
                        <hr className="second" style={styles.dividerLine}/>
                    </div>

                    {this.props.route.login
                        ?   <div className="login-form">
                                <EmailLoginForm
                                    loading={this.state.loading}
                                    loginActions={loginActions}
                                    messagesActions={messagesActions}
                                />
                                <div className="subform" style={styles.subForm}>
                                    <span
                                        className="forgot-btn"
                                        style={styles.forgotBtn}
                                        onClick={this.forgetPassword}>
                                        I forgot my password
                                    </span>
                                    <span
                                        className="signup-btn"
                                        style={styles.signupBtn}
                                        onClick={this.gotoSignupModal}>
                                        New here?
                                        <Link to={{pathname: 'signup'}} className="signup" style={styles.signup}>sign up</Link>
                                    </span>
                                </div>
                            </div>
                        :   <div className="signup-form">
                                {this.state.signupWithEmail
                                    ?   <EmailSignUp
                                            loginActions={loginActions}
                                            signupWithEmail={this.state.signUpWithEmail}
                                            loading={this.state.loading}
                                        />
                                    :   <button
                                            className="btn signup-with-email"
                                            style={styles.signUpWithEmail}
                                            onClick={() => {this.setState({signupWithEmail: true})}}>
                                            <i className="fa fa-envelope-o email-icon" style={styles.emailIcon}/>
                                            <span className="text">Sign Up With Email </span>
                                        </button>
                                }

                                <div
                                    className="login-btn"
                                    onClick={this.gotoLoginModal}
                                    style={styles.gotoLogin}>
                                    Already have an account? <Link to={{pathname: '/login'}} style={styles.login} className="login">login</Link>
                                </div>
                            </div>
                    }
                    
                </div>
            </div>
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
    },
    signup: {
        fontWeight: '600',
        textDecoration: 'underline',
        marginLeft: '3px',
    },
    gotoLogin: {
        marginTop: '5px',
        textAlign: 'right',
    },
    login: {
        textDecoration: 'underline',
    },
    loginContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '450px',
    },
    dividerLine: {
        width: '47%',
    },
    or: {
        padding: '15px',
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpWithEmail: {
        padding: '15px 23px',
        color: '#fff',
        letterSpacing: '1px',
        width: '100%',
        border: 'none',
        height: '50px',
        position: 'relative',
        backgroundColor: '#ff5a5f',
    },
    emailIcon: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '23px',
    }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
    messagesActions: bindActionCreators(MessagesActions, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
