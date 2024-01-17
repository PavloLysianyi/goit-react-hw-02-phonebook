import React from 'react';
import { nanoid } from 'nanoid';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddContact = () => {
    const { name, number } = this.state;
    const { onAddContact, contacts } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      alert("Будь ласка, введіть ім'я та номер контакту.");
      return;
    }

    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`Контакт з ім'ям ${name} вже існує у телефонній книзі.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onAddContact(newContact);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className="form-container">
        <label className="label">
          Ім'я контакту:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
            className="input"
          />
        </label>
        <label className="label">
          Номер телефону:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            required
            className="input"
          />
        </label>
        <button
          type="button"
          onClick={this.handleAddContact}
          className="button"
        >
          Додати контакт
        </button>
      </div>
    );
  }
}

export default ContactForm;
