import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { ListContainer, ListItem } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  const deleteContactHandler = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ListContainer>
      {filteredContacts.map(contact => (
        <ListItem key={contact.id}>
          <span>
            {contact.name}: {contact.number}
          </span>
          <button onClick={() => deleteContactHandler(contact.id)}>
            Delete
          </button>
        </ListItem>
      ))}
    </ListContainer>
  );
};
