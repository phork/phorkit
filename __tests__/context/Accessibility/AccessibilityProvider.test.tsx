import userEvent from '@testing-library/user-event';
import React from 'react';
import { AccessibilityProvider, useAccessibility, useInputEventType } from 'lib';
import { render, screen } from '../../utils';

const Page = () => {
  const accessible = useAccessibility();
  const eventType = useInputEventType();

  return (
    <React.Fragment>
      <div>{`Accessible: ${accessible ? 'yes' : 'no'}`}</div>
      <div>{`Event type: ${eventType || 'none'}`}</div>
      <button data-testid="button" type="button">
        Click me
      </button>
    </React.Fragment>
  );
};

describe('<AccessibilityProvider />', () => {
  beforeEach(() => {
    render(
      <AccessibilityProvider>
        <Page />
      </AccessibilityProvider>,
    );
  });

  it('should render the defaults', () => {
    expect(screen.getByText('Accessible: no')).toBeTruthy();
    expect(screen.getByText('Event type: none')).toBeTruthy();
  });

  it('should change to not accessible on mouse event', () => {
    const button = screen.getByTestId('button');
    userEvent.click(button);

    expect(screen.getByText('Accessible: no')).toBeTruthy();
    expect(screen.getByText('Event type: mouse')).toBeTruthy();
  });

  it('should change to accessible on keyboard event', () => {
    userEvent.keyboard('[Tab]');

    expect(screen.getByText('Accessible: yes')).toBeTruthy();
    expect(screen.getByText('Event type: keyboard')).toBeTruthy();
  });
});
