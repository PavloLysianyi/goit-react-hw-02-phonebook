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

const Filter = ({ filter, onFilterChange }) => (
  <div>
    Пошук контактів за ім'ям
    <input
      type="text"
      value={filter}
      onChange={onFilterChange}
      className="input"
    />
  </div>
);

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className="list">
    {contacts.map(contact => (
      <li key={contact.id} className="list-item">
        <span className="contact-info">
          {contact.name} - {contact.number}
        </span>
        <button
          type="button"
          onClick={() => onDeleteContact(contact.id)}
          className="delete-button"
        >
          Видалити
        </button>
      </li>
    ))}
  </ul>
);

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleAddContact = newContact => {
    const { name } = newContact;
    const { contacts } = this.state;

    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`Контакт з ім'ям ${name} вже існує у телефонній книзі.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="container">
        <h1 className="heading">Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} contacts={contacts} />
        <h2 className="sub-heading">Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
