import styled from '@emotion/styled';
import { Paper, PaperProps } from './Paper';

export type StyledPaperProps = Omit<PaperProps, 'color' | 'themeId'> & {
  backgroundColor: string;
  borderColor: string;
  focusedOutlineColor: string;
  textColor: string;
  scrollbarColor: string;
};

/**
 * The styled paper is an extension of the `Paper`
 * component that will have a custom background,
 * border, text and scrollbar color.
 */
export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'borderColor', 'focusedOutlineColor', 'textColor', 'scrollbarColor', 'themeId'].includes(prop),
})<StyledPaperProps>`
  --paper-background-color: ${props => props.backgroundColor};
  --paper-border-color: ${props => props.borderColor};
  --paper-focused-outline-color: ${props => props.focusedOutlineColor};
  --paper-text-color: ${props => props.textColor};
  --paper-scrollbar-thumb-color: ${props => props.scrollbarColor};
`;

StyledPaper.displayName = 'StyledPaper';
