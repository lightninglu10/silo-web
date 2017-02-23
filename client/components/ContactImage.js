import React from 'react';

// NPM Utils
import Initicon from 'react-initicon';
import { isValidNumber } from 'libphonenumber-js';

export default class ContactImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var img;
        if (this.props.image) {
                img = <img src={this.props.image} />
            } else if (this.props.name && !isValidNumber(this.props.name)) {
                img =   <Initicon
                            text={this.props.name}
                            seed={this.props.id}
                            single={false}
                            size={this.props.size}
                        />
            } else {
                if (!this.props.editContact)
                    img = <i className="fa fa-address-card-o fa-3x" aria-hidden="true" style={Object.assign({}, this.props.cardStyle, {color: '#fff'})}></i>
                else
                    img = <i className="fa fa-plus fa-3x" style={styles.editAddPhoto} aria-hidden="true"></i>
            }
        return (
            <div className="contact-image">
                { img }
            </div>
        )
    }
}

var styles = {
    editAddPhoto: {
        color: 'rgb(250, 250, 255)',
    },
}