const template = ({ template }, _, { imports, componentName, jsx }) => {
  return template.smart({ plugins: ['typescript'] }).ast`${imports}
import { v4 as uuid } from 'uuid';
import { useIconSize } from '../hooks/useIconSize';
import { SvgIconProps } from '../types/svgIcon';

export function ${componentName} ({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return ${jsx}
}

${componentName}.displayName = 'SvgIcon';
`
}

module.exports = template;
