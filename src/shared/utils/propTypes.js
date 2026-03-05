import PropTypes from 'prop-types';

/**
 * PropTypes para el componente Header
 * Define los tipos de props esperados
 */
export const headerPropTypes = {
  title: PropTypes.string.isRequired,
  placeH: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func,
  onButtonClick: PropTypes.func,
};

/**
 * PropTypes para el componente ProductTable
 */
export const productTablePropTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      stockMin: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
};

/**
 * PropTypes para componentes de layout
 */
export const layoutPropTypes = {
  children: PropTypes.node.isRequired,
};
