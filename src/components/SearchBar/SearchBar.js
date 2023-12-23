import { useDispatch } from 'react-redux';
import { FilterField } from './SearchBar.styled';
import { changeFilter } from '../../redux/filterSlise';

export const SearchBar = ({ filter }) => {
  const dispatch = useDispatch();

  const filterContacts = filterValue => {
    dispatch(changeFilter(filterValue));
  };

  return (
    <label htmlFor="filter">
      Find contacts by name
      <FilterField
        type="text"
        value={filter}
        onChange={evt => {
          filterContacts(evt.target.value);
        }}
        name="filter"
      />
    </label>
  );
};
