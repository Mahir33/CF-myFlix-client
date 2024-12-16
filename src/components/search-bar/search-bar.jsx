import { Form } from 'react-bootstrap';
import './search-bar.scss';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Form className="search-bar">
      <Form.Control
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="mx-auto"
      />
    </Form>
  );
};

export default SearchBar;