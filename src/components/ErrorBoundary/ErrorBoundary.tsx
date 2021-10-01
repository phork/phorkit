import React from 'react';

type Styles = {
  common: React.CSSProperties;
  variants: {
    default: React.CSSProperties;
    page: React.CSSProperties;
  };
};

// use regular styles here instead of classes to keep this component lean
const rootStyles: Styles = {
  common: {},
  variants: {
    default: {},
    page: {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      pointerEvents: 'none',
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 10000,
    },
  },
};

const wrapperStyles: Styles = {
  common: {},
  variants: {
    default: {
      alignItems: 'center',
      display: 'inline-flex',
    },
    page: {
      alignItems: 'center',
      backgroundColor: '#ff3232',
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      height: 300,
      width: 300,
    },
  },
};

const iconStyles: Styles = {
  common: {},
  variants: {
    default: {
      color: '#ff3232',
      height: 40,
      marginRight: 8,
      width: 40,
    },
    page: {
      color: '#fff',
      height: 220,
      marginTop: 16,
      width: 220,
    },
  },
};

const textStyles: Styles = {
  common: {
    fontSize: 14,
  },
  variants: {
    default: {},
    page: {
      color: '#fff',
      flex: 'none',
    },
  },
};

type ErrorBoundaryProps  = {
  children: React.ReactNode;
  errorMsg?: string;
  variant?: 'page' | 'default';
}

type ErrorBoundaryState = {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children, errorMsg, variant = 'default' } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div style={{ ...rootStyles.common, ...rootStyles.variants[variant] }}>
          <div style={{ ...wrapperStyles.common, ...wrapperStyles.variants[variant] }}>
            <svg
              height="24"
              style={{ ...iconStyles.common, ...iconStyles.variants[variant] }}
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
              />
            </svg>

            <div style={{ ...textStyles.common, ...textStyles.variants[variant] }}>{errorMsg || 'An error has occurred'}</div>
          </div>
        </div>
      );
    }

    return children;
  }
}
