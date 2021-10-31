import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from 'theme-ui';
import { Theme } from 'types';
import { AccessibilityProvider } from 'context/Accessibility';
import { ThemeProvider } from 'context/Theme';
import { Toasts } from 'compositions/Toast';
import '../../styles/common.css';
import '../../styles/normalize.css';

export type DocsWrapperProps = {
  children: React.ReactNode;
};

// importing CSS files doesn't work in production so this duplicates the common styles here
export default function DocsWrapper({ children }: DocsWrapperProps): JSX.Element {
  const [colorMode] = useColorMode<Theme>();

  return (
    <AccessibilityProvider>
      <ThemeProvider themeId={colorMode}>
        <Helmet>
          <link href="/public/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/public/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/public/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/public/favicon/site.webmanifest" rel="manifest" />
          <link color="#0060ce" href="/public/favicon/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="/public/favicon/favicon.ico" rel="shortcut icon" />
          <meta content="/public/favicon/browserconfig.xml" name="msapplication-config" />
          <meta content="#0060ce" name="msapplication-TileColor" />
          <meta content="#fff" name="theme-color" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700" rel="stylesheet" />
          <style type="text/css">{`
            html,
            body {
              box-sizing: border-box;
              font-family: Roboto, Helvetica, 'Helvetica Neue', Arial, sans-serif;
              font-size: 12px;
              font-weight: 400;
            }

            *,
            *::before,
            *::after {
              box-sizing: inherit;
            }

            a {
              cursor: pointer;
              text-decoration: none;
            }

            h2 > a {
              font-weight: 400 !important;
              font-size: 18px;
            }

            h3 > a {
              font-weight: 400 !important;
              font-size: 16px;
              opacity: .5;
            }

            h2 > a:focus,
            h3 > a:focus {
              outline: none;
              text-decoration: underline;
            }

            pre.prism-code {
              position: relative;
              background: transparent !important;
            }

            pre.prism-code:before {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              opacity: .2;
              border: 1px solid currentColor;
              border-radius: inherit;
            }
          `}</style>
        </Helmet>
        <Toasts position="bottom-right">{children}</Toasts>
      </ThemeProvider>
    </AccessibilityProvider>
  );
}

DocsWrapper.displayName = 'DocsWrapper';
