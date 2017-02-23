/**
* Silo
* This is the Contact card component. Handles displaying the contact
* author: @patr
*/

import React from 'react';

// NPM utils
import TextareaAutosize from 'react-autosize-textarea';
import Radium from 'radium';
import Phone from 'react-phone-number-input';

// Utils
import Convert from '../utils/convertNumbers';
import { messageInput } from '../containers/MessagesContainer';

// Components
import ContactImage from './ContactImage';

// Stylesheets
import 'react-phone-number-input/styles/style.css';
import '../stylesheets/components/ContactCard.scss';

const CONTACT_IMAGE_SIZE = 75;

class ContactCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: this.props.notes,
            number: this.props.number,
            save: false,
            editContact: false,
            doneDisabled: true,
        }
    }

    onNotesChange = (e) => {
        this.setState({
            notes: e.target.value,
        });
    }

    autosave = (e) => {
        clearTimeout(this.lastTyped);

        this.lastTyped = setTimeout(() => {
            this.setState({
                save: true,
            });

            var data = {
                first_name: this.refs.editFirstName ? this.refs.editFirstName.value : this.props.first_name,
                last_name: this.refs.editLastName ? this.refs.editLastName.value : this.props.last_name,
                email: this.refs.editEmail ? this.refs.editEmail.value : this.props.email,
                number: this.state.number,
                notes: this.state.notes,
            }

            this.props.contactActions.saveContact(data);

            this.saveFalse = setTimeout(() => {
                this.setState({
                    save: false,
                });
            }, 1000)
        }, 500)
    }

    addContact = () => {
        this.setState({
            editContact: true,
        });
    }

    editContact = () => {
        this.setState({
            editContact: true,
        });
    }

    cancelContact = () => {
        this.setState({
            editContact: false,
        });
    }

    gotName = (e) => {
        if (e.target.value.length > 0) {
            this.setState({
                doneDisabled: false,
            });
        } else {
            this.setState({
                doneDisabled: true,
            });
        }
    }

    saveContact = (e) => {
        var data = {
            first_name: this.refs.editFirstName ? this.refs.editFirstName.value : this.props.first_name,
            last_name: this.refs.editLastName ? this.refs.editLastName.value : this.props.last_name,
            email: this.refs.editEmail ? this.refs.editEmail.value : this.props.email,
            number: this.state.number,
            notes: this.state.notes,
        }
        this.props.contactActions.saveContact(data)
        .then((result) => {
            this.props.messagesActions.getUserList()
            .then((result) => {
                this.props.messagesActions.chooseActiveMessage(result.userList[0])
                .then((result) => {
                    $(`#${messageInput}`).focus();
                });
            })

            this.setState({
                editContact: false,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.number !== nextProps.number) {
            this.setState({
                number: nextProps.number,
                notes: nextProps.notes,
            });
        }

        if (this.props.notes !== nextProps.notes) {
            this.setState({
                notes: nextProps.notes
            });
        }
    }

    render() {
        return (
            <div
                className={"contact-card" + (this.props.className ? ` ${this.props.className}` : '') + (this.props.name ? `contact_${this.props.name}` : `contact_${this.props.number}`)}
                style={styles.contactCard}
                key={this.props.name ? `contact_${this.props.name}` : `contact_${this.props.number}`}
            >
                <div className="nav-section" style={Object.assign({}, styles.nameSection, {justifyContent: 'flex-end'})}>
                    {this.state.editContact
                        ?   <div className="edit-container" style={styles.editContainer}>
                                <button className="cancel-contact btn" style={Object.assign({}, styles.cancelContact, styles.editButtonText)} onClick={this.cancelContact}>
                                    Cancel
                                </button>
                                <button disabled={this.state.doneDisabled} className="done-botton btn" style={Object.assign({}, styles.editButtonText, styles.saveContact)} onClick={this.saveContact}>
                                    Done
                                </button>
                            </div>
                        :   !this.props.name
                                ?   <button className="add-contact btn" style={Object.assign({}, styles.editButtonText, styles.addContact)} onClick={this.addContact}>
                                        Add Contact
                                    </button>
                                :   <button className="edit-contact btn" style={Object.assign({}, styles.editButtonText, styles.addContact)} onClick={this.editContact}>
                                        Edit Contact
                                    </button>
                    }
                </div>

                <div className="name-section" style={styles.nameSection}>
                    <div className="image" style={this.state.editContact ? Object.assign({}, styles.image, styles.imageEditHover) : styles.image}>
                        <ContactImage
                            editContact={this.state.editContact}
                            image={this.props.image}
                            name={this.props.name}
                            id={this.props.id}
                            size={CONTACT_IMAGE_SIZE}
                        />
                    </div>
                    <div className="name" style={styles.name}>
                        {this.props.name
                            ? this.props.name
                            : Convert.E164toReadable(this.props.number)
                        }
                    </div>
                </div>

                <div className="info-section" style={styles.infoSection}>
                    {this.state.editContact
                        ?   <div className="name-information" style={styles.information}>
                                <div className="labels" style={styles.labels}>
                                    Name
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="First Name"
                                    ref="editFirstName"
                                    autoFocus={true}
                                    defaultValue={this.props.first_name}
                                    onChange={this.gotName}
                                    style={Object.assign({}, styles.inputControl, {marginBottom: '3px'})}
                                />
                                <input
                                    className="form-control"
                                    placeholder="Last Name"
                                    ref="editLastName"
                                    defaultValue={this.props.last_name}
                                    onChange={this.gotName}
                                    style={styles.inputControl}
                                />
                                </div>
                        :   null
                    }
                    <div className="number-information" style={styles.information}>
                        <div className="labels" style={styles.labels}>
                            Phone
                        </div>
                        {this.state.editContact
                            ?   <Phone
                                    className="form-control"
                                    value={this.state.number}
                                    onChange={phone => this.setState({ phone })}
                                    style={styles.inputControl}
                                    country='US'
                                />
                            :   <div className="number" style={Object.assign({}, styles.textColor, styles.informationText)}>
                                    { Convert.E164toReadable(this.props.number) }
                                </div>
                        }
                    </div>
                    <div className="email-information" style={styles.information}>
                        <div className="labels" style={styles.labels}>
                            Email
                        </div>

                        {this.state.editContact
                            ?   <input ref="editEmail" className="form-control" defaultValue={this.props.email} style={styles.inputControl}/>
                            :   <div className="email" style={Object.assign({}, styles.textColor, styles.informationText)}>
                                    { this.props.email }
                                </div>
                        }
                    </div>
                    <div className="notes-information" style={Object.assign({}, styles.information, {padding: '0px', 'position': 'relative'})}>
                        <TextareaAutosize
                            ref="notesInput"
                            placeholder="Put notes here. Saves as you type!"
                            type="text"
                            className="form-control"
                            onChange={this.onNotesChange}
                            value={this.state.notes}
                            style={styles.textareaControl}
                            onKeyUp={this.autosave}
                            key={this.props.name ? `contact_notes_${this.props.name}` : `contact_notes_${this.props.number}`}
                            rows={3}
                        />
                        {this.state.save
                            ?   <div className="saved-banner-container" style={styles.savedBannerContainer}>
                                    <span className="saved-banner" style={styles.savedBanner}>
                                        Notes Saved
                                    </span>
                                </div>
                            :   null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

var styles = {
    editButtonText: {
        fontSize: '12px',
    },
    editContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveContact: {
        background: '#00c0ef',
        color: '#fff'
    },
    cancelContact: {
        background: '#dd4b39',
        color: '#fff',
    },
    addContact: {
        background: '#f39c12',
        color: '#fff',
    },
    savedBannerContainer: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '5px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    savedBanner: {
        background: '#f39c12',
        padding: '5px',
        borderRadius: '6px',
        color: '#fff',
    },
    name: {
        fontSize: '20px',
        fontWeight: '500',
        padding: '3px 0px'
    },
    imageEditHover: {
        ':hover': {
            background: '#00c0ef',
        },
        cursor: 'pointer',
    },
    image: {
        background: 'linear-gradient(to bottom, #a5aab4 0%, #888b95 100%)',
        width: CONTACT_IMAGE_SIZE + 'px',
        height: CONTACT_IMAGE_SIZE + 'px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameSection: {
        background: '#fafaff',
        width: '100%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    labels: {
        fontSize: '12px',
    },
    infoSection: {
        width: '100%',
        padding: '0px 15px',
    },
    information: {
        borderBottom: '1px solid rgb(211, 211, 211)',
        padding: '5px',
    },
    informationText: {
        padding: '5px 0px',
    },
    textColor: {
        color: '#00c0ef',
    },
    contactCard: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderLeft: '1px solid rgb(211, 211, 211)',
        padding: '0px',
    },
    inputControl: {
        width: '100%',
        borderRadius: '6px',
        fontFamily: 'FontAwesome, Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    textareaControl: {
        width: '100%',
        border: '0px',
        padding: '5px',
        borderRadius: '6px',
        resize: 'none',
        fontFamily: 'FontAwesome, Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
}

export default Radium(ContactCard);