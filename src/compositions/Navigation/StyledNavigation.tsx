import styled from '@emotion/styled';
import { Navigation, NavigationProps } from './Navigation';

export type StyledNavigationProps = Omit<NavigationProps, 'themeId'> & {
  focusedBorderColor: string;
  itemBackgroundColor: string;
  itemFocusedBackgroundColor: string;
  itemFocusedSelectedBackgroundColor: string;
  itemFocusedSelectedTextColor: string;
  itemFocusedTextColor: string;
  itemHoveredBorderColor: string;
  itemSelectedBackgroundColor: string;
  itemSelectedBorderColor: string;
  itemSelectedTextColor: string;
  itemTextColor: string;
};

/**
 * The styled navigation is an extension of the `Navigation`
 * component that will have all its colors customized.
 */
export const StyledNavigation = styled(Navigation, {
  shouldForwardProp: (prop: string) =>
    ![
      'focusedBorderColor',
      'itemBackgroundColor',
      'itemFocusedBackgroundColor',
      'itemFocusedSelectedBackgroundColor',
      'itemFocusedSelectedTextColor',
      'itemFocusedTextColor',
      'itemHoveredBorderColor',
      'itemSelectedBackgroundColor',
      'itemSelectedBorderColor',
      'itemSelectedTextColor',
      'itemTextColor',
    ].includes(prop),
})<StyledNavigationProps>`
  --navigation-focused-border-color: ${props => props.focusedBorderColor};
  --navigation-item-background-color: ${props => props.itemBackgroundColor};
  --navigation-item-focused-background-color: ${props => props.itemFocusedBackgroundColor};
  --navigation-item-focused-selected-background-color: ${props => props.itemFocusedSelectedBackgroundColor};
  --navigation-item-focused-selected-text-color: ${props => props.itemFocusedSelectedTextColor};
  --navigation-item-focused-text-color: ${props => props.itemFocusedTextColor};
  --navigation-item-hovered-border-color: ${props => props.itemHoveredBorderColor};
  --navigation-item-selected-background-color: ${props => props.itemSelectedBackgroundColor};
  --navigation-item-selected-border-color: ${props => props.itemSelectedBorderColor};
  --navigation-item-selected-text-color: ${props => props.itemSelectedTextColor};
  --navigation-item-text-color: ${props => props.itemTextColor};
`;

StyledNavigation.displayName = 'StyledNavigation';

StyledNavigation.defaultProps = {
  unthemed: true,
};
