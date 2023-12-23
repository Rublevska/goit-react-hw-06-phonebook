import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContact: {
      prepare({ firstName, phoneNumber }) {
        return {
          payload: {
            id: nanoid(),
            firstName,
            phoneNumber,
          },
        };
      },
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
    },

    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { addContact, deleteContact } = contactsSlice.actions;
