import React from 'react';
import { hasAccentColors } from './utils';

export const AccentColorsCss = ({ accentColorProps, currentAccentColors }) => {
  return hasAccentColors(currentAccentColors) ? (
    <pre>
      <code>
        :root &#123;{'\n'}
        {accentColorProps.map(
          ({ property }) => currentAccentColors[property] && `  ${property}: ${currentAccentColors[property]};\n`,
        )}
        &#125;
      </code>
    </pre>
  ) : (
    <div style={{ margin: 12 }}>You're using the default colors. No extra CSS is necessary.</div>
  );
};
