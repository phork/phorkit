import { ClipboardIcon } from ' ../../../src/icons/internal';
import { IconButton } from '@storybook/components';
import { styled } from '@storybook/theming';
import copy from 'copy-to-clipboard';
import React from 'react';
import { hasAccentColors } from './utils';

const Container = styled.div({
  position: 'relative',
});

const Code = styled.pre({
  margin: 0,
  paddingTop: 20,
  paddingBottom: 20,
});

const ClipboardButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 12,
});

export const AccentColorsCss = ({ accentColorProps, currentAccentColors }) => {
  const css = `:root {\n${accentColorProps
    .map(({ property }) => currentAccentColors[property] && `  ${property}: ${currentAccentColors[property]};`)
    .filter(Boolean)
    .join('\n')}\n}`;

  const copyCss = () => copy(css);

  return hasAccentColors(currentAccentColors) ? (
    <Container>
      <ClipboardButton onClick={copyCss} title="Copy to clipboard">
        <ClipboardIcon />
      </ClipboardButton>
      <Code>{css}</Code>
    </Container>
  ) : (
    <div style={{ margin: 12 }}>You're using the default colors. No extra CSS is necessary.</div>
  );
};
