import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilters } from '../../redux/selectors';
import {
  ListOfContacts,
  ContactItem,
  DeleteBtn,
  ContactWrapper,
} from './ContactList.styled';
import { deleteContact } from '../../redux/contactsSlise';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilters);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const visibleContacts = contacts.filter(contact => {
    return contact.firstName.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ListOfContacts>
      {visibleContacts.map(contact => {
        return (
          <ContactItem key={contact.id}>
            <ContactWrapper>
              <p>
                {contact.firstName}: {contact.phoneNumber}
              </p>
              <DeleteBtn
                onClick={() => {
                  handleDelete(contact.id);
                }}
              >
                Delete
              </DeleteBtn>
            </ContactWrapper>
          </ContactItem>
        );
      })}
    </ListOfContacts>
  );
};
