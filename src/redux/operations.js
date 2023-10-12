import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65116db5829fa0248e400b48.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch contacts: ' + error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contactData => {
    try {
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add contact: ' + error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      throw new Error('Failed to delete contact: ' + error.message);
    }
  }
);
