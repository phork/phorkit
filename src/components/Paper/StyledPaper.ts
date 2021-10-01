import styled from '@emotion/styled';
import { Paper, PaperProps } from './Paper';

export type StyledPaperProps = Omit<PaperProps, 'color'> & {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  scrollbarColor: string;
};

/**
 * The styled paper is an extension of the Paper
 * component and it will have a custom background,
 * border, text and scrollbar color.
 */
export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'borderColor', 'textColor', 'scrollbarColor', 'themeId'].includes(prop),
})<StyledPaperProps>`
  --paper-background-color: ${props => props.backgroundColor};
  --paper-border-color: ${props => props.borderColor};
  --paper-text-color: ${props => props.textColor};
  --paper-scrollbar-thumb-color: ${props => props.scrollbarColor};
`;

StyledPaper.displayName = 'StyledPaper';
