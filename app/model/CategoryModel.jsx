// propTypes.js
import PropTypes from 'prop-types';

// Task PropType
export const TaskPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  fav: PropTypes.bool.isRequired,
});

// Category PropType
export const CategoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(TaskPropType).isRequired,
});
