import { screen } from '@testing-library/dom';
import React from 'react';
import { Portal } from 'lib';
import { render } from '../../utils';

describe('<Portal />', () => {
  it('should render a portal', () => {
    const relativeRef: React.MutableRefObject<HTMLDivElement> = {
      current: null!,
    };

    render(
      <React.Fragment>
        <div ref={relativeRef}>Relative</div>
        <Portal
          alwaysRender
          container={document.body}
          initialCoords={{
            position: 'fixed',
            top: 0,
            left: 0,
          }}
          position="stacked"
          relativeRef={relativeRef}
        >
          <React.Fragment>Hello world</React.Fragment>
        </Portal>
      </React.Fragment>,
    );

    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('does not render when hidden', () => {
    const relativeRef: React.MutableRefObject<HTMLDivElement> = {
      current: null!,
    };

    render(
      <React.Fragment>
        <div ref={relativeRef}>Relative</div>
        <Portal container={document.body} position="stacked" relativeRef={relativeRef}>
          <React.Fragment>Hello world</React.Fragment>
        </Portal>
      </React.Fragment>,
    );

    expect(() => screen.getByText('Hello world')).toThrow();
  });
});
