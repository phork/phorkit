import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { IconTextButton, TimesIcon } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';

describe('<IconTextButton />', () => {
  it('should render a basic icon tet button', () => {
    const { container, getByText } = render(<IconTextButton icon={TimesIcon}>Click me!</IconTextButton>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render an icon button as an anchor', () => {
    const { container, getByText } = render(
      <IconTextButton<'a'> as="a" href="#iconbutton" icon={TimesIcon}>
        Click me!
      </IconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#iconbutton');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render an icon text button using a functional component', () => {
    const { container, getByText } = render(
      <IconTextButton<'a'> as={AsTypeA} href="#iconbutton" icon={TimesIcon}>
        Click me!
      </IconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#iconbutton');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Click me!')).toBeTruthy();
  });
});
