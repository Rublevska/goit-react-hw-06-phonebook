import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import {
  Form,
  FormInputGroup,
  Field,
  AddContactBtn,
  ErrorMessage,
  InputErrorGroup,
} from './NewPhoneForm.styled';
import { addContact } from '../../redux/contactsSlise';
import { getContacts } from '../../redux/selectors';

export const FormContact = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleAdd = newContact => {
    const duplicateContact = contacts.find(
      contact =>
        contact.firstName.toLowerCase() === newContact.firstName.toLowerCase()
    );
    if (duplicateContact !== undefined) {
      return alert(`${duplicateContact.firstName} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const PhoneValidateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .min(7, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          id: '',
          firstName: '',
          phoneNumber: '',
        }}
        validationSchema={PhoneValidateSchema}
        onSubmit={(values, actions) => {
          handleAdd(values);
          actions.resetForm();
        }}
      >
        <Form>
          <FormInputGroup>
            <label htmlFor="firstName">Name</label>
            <InputErrorGroup>
              <Field id="firstName" name="firstName" placeholder="Luna" />
              <ErrorMessage name="firstName" component="span" />
            </InputErrorGroup>
          </FormInputGroup>

          <FormInputGroup>
            <label htmlFor="phoneNumber">Number</label>
            <InputErrorGroup>
              <Field
                id="phoneNumber"
                name="phoneNumber"
                placeholder="1234567"
              />
              <ErrorMessage name="phoneNumber" component="span" />
            </InputErrorGroup>
          </FormInputGroup>

          <AddContactBtn type="submit">Add contact</AddContactBtn>
        </Form>
      </Formik>
    </div>
  );
};
