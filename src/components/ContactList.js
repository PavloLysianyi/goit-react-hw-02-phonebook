import React from 'react';

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

export default ContactList;
