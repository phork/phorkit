import PropTypes from 'prop-types';

export const themeIdPropType = PropTypes.oneOf(['light', 'dark']);
export const iconScalePropType = PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']);
export const renderPropType = PropTypes.oneOfType([PropTypes.node, PropTypes.func]);
