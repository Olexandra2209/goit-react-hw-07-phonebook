import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get(
        'https://65116db5829fa0248e400b48.mockapi.io/contacts'
      );
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
      const response = await axios.post(
        'https://65116db5829fa0248e400b48.mockapi.io/contacts',
        contactData
      );
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
      await axios.delete(
        `https://65116db5829fa0248e400b48.mockapi.io/contacts/${contactId}`
      );
      return contactId;
    } catch (error) {
      throw new Error('Failed to delete contact: ' + error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { updateFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
