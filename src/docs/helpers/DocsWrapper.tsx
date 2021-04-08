import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from 'theme-ui';
import { Theme } from 'types';
import { AccessibilityProvider } from 'context/Accessibility';
import { ThemeProvider } from 'context/Theme';
import './styles.css';
import 'styles/common.css';
import 'styles/normalize.css';

export interface DocsWrapperProps {
  children: React.ReactNode;
}

export default function DocsWrapper({ children }: DocsWrapperProps): React.ReactElement {
  const [colorMode] = useColorMode<Theme>();

  return (
    <AccessibilityProvider>
      <ThemeProvider themeId={colorMode}>
        <Helmet>
          <link rel="apple-touch-icon" sizes="180x180" href="/public/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/public/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/public/favicon/safari-pinned-tab.svg" color="#0060ce" />
          <meta name="msapplication-TileColor" content="#0060ce" />
          <meta name="theme-color" content="#fff" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700" />
        </Helmet>
        {children}
      </ThemeProvider>
    </AccessibilityProvider>
  );
}
