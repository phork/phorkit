import styled from '@emotion/styled';
import { Shade, ShadeProps } from './Shade';

export type StyledShadeProps = Omit<ShadeProps, 'color' | 'themeId'> & {
  activePrimaryColor: string;
  inverseColor: string;
  opaquePrimaryColor: string;
  primaryColor: string;
};

/**
 * A styled shade is an extension of the `Shade`
 * component that will have a custom background
 * and text color.
 */
export const StyledShade = styled(Shade, {
  shouldForwardProp: (prop: string) =>
    !['activePrimaryColor', 'inverseColor', 'opaquePrimaryColor', 'primaryColor'].includes(prop),
})<StyledShadeProps>`
  ${({ activePrimaryColor }) => activePrimaryColor && `--shade-active-primary-color: ${activePrimaryColor};`}
  ${({ inverseColor }) => inverseColor && `--shade-inverse-color: ${inverseColor};`}
  ${({ opaquePrimaryColor }) => opaquePrimaryColor && `--shade-opaque-primary-color: ${opaquePrimaryColor};`}
  ${({ primaryColor }) => primaryColor && `--shade-primary-color: ${primaryColor};`}
`;

StyledShade.displayName = 'StyledShade';
