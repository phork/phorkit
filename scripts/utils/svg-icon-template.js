/**
 * Additional template manipulation is handled in generate-svg-icons.js,
 * including import path adjustments and the addition of the component's
 * displayName because adding it here causes a babel error.
 * See https://github.com/gregberge/svgr/issues/328
 */

const template = ({ template }, _, { imports, componentName, jsx }) => {
  return template.smart({ plugins: ['typescript'] }).ast`${imports}
import { v4 as uuid } from 'uuid';
import { useIconSize } from '../hooks/useIconSize';
import { SvgIconProps } from '../types/svgIcon';

export function ${componentName} ({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return ${jsx}
}
`
}

module.exports = template;
