import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFilter,
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contactsSlice';
import ContactList from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import SearchInput from './SearchInput/SearchInput';

export const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter ? filter.toLowerCase() : '')
  );

  const addContactHandler = ({ name, number }) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  const deleteContactHandler = id => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: '30px' }}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContactHandler} />
      <h2>Contacts</h2>
      <h3>Find contacts by name</h3>
      <SearchInput value={filter} onChange={handleFilterChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContactHandler}
        />
      )}
    </div>
  );
};
