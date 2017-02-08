/**
* Silo
* This is the Facebook Login Button.
* author: @patr
*/

import React from 'react';

// NPM Requirements
import FacebookLogin from 'react-facebook-login';

// Settings
import { FACEBOOK_APP_ID } from '../config/settings';

// Stylesheet
import '../stylesheets/components/FacebookLoginComponent.scss';


export default class FacebookLoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.facebookCallback = this.facebookCallback.bind(this);

        this.state = {
            facebookError: '',
        }
    }

    facebookCallback(facebook) {
        this.setState({
            facebookError: '',
        })

        this.props.loginActions.facebookLogin(facebook)
        .then((data) => {
            if (data.isLoggedIn) {
                location.reload()
            } else {
                this.setState({
                    facebookError: 'Error signing up with Facebook. Make sure you give email permissions.',
                })
            }
        });
    }

    render() {
        return (
            <div className="facebook-login-component">
                {this.props.user.isFacebookFetching && !this.state.facebookError
                    ?   <div style={{textAlign: 'center'}}>
                          <i className="fa fa-circle-o-notch fa-spin fa-2x" style={{color: '#4c69ba'}} />
                        </div>
                    :   <div className="fb">
                          <FacebookLogin
                            appId={FACEBOOK_APP_ID}
                            language="en_US"
                            scope="public_profile, email, user_birthday"
                            auth_type="rerequest"
                            callback={this.facebookCallback}
                            version="v2.8"
                            cssClass="kep-login-facebook b btn facebook-login fluid"
                            textButton={this.props.textButton}
                            icon="fa-facebook"
                          />
                          {this.state.facebookError
                            ?   <div className="error">
                                  {this.state.facebookError}
                                </div>
                            : null
                          }
                        </div>
                    }
            </div>
        )
    }
}
