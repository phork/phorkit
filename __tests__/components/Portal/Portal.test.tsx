import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Portal } from 'lib';

describe('<Portal />', () => {
  it('should render a basic portal', () => {
    const parentRef: React.MutableRefObject<HTMLDivElement> = {
      current: null!,
    };

    render(
      <React.Fragment>
        <div ref={parentRef}>Parent</div>
        <Portal
          alwaysRender
          container={document.body}
          initialCoords={{
            position: 'fixed',
            top: 0,
            left: 0,
          }}
          parentRef={parentRef}
          position="stacked"
        >
          <React.Fragment>Hello world</React.Fragment>
        </Portal>
      </React.Fragment>,
    );

    expect(screen.getByText('Hello world')).toBeTruthy();
  });
});
