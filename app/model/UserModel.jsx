
import PropTypes from 'prop-types';

export const User = PropTypes.shape({
    //uid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
  });