import styled from '@emotion/styled';
import { Paper, PaperProps } from './Paper';

export interface StyledPaperProps extends Omit<PaperProps, 'color'> {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  scrollbarColor?: string;
}

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
