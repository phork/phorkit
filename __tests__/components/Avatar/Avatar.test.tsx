import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Avatar } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<Avatar />', () => {
  it('should render with initials', () => {
    const { getByText } = render(<Avatar initials="EC" />);
    expect(getByText('EC')).toBeTruthy();
  });

  it('should render with an image', () => {
    const { getByTestId } = render(<Avatar data-testid="avatar" imgSrc="/avatar.png" initials="EC" />);
    const avatar = getByTestId('avatar');
    expect(avatar?.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });

  it('should render an actionable avatar', () => {
    const { getByTestId } = render(<Avatar actionable data-testid="avatar" initials="EC" />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).toHaveFocus();
  });

  it('should render a non-actionable avatar', () => {
    const { getByTestId } = render(<Avatar data-testid="avatar" initials="EC" />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).not.toHaveFocus();
  });

  it('should render as a div', () => {
    const { container } = render(<Avatar initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as a button', () => {
    const { container } = render(<Avatar actionable initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as a link', () => {
    const { container } = render(<Avatar<'a'> as="a" href="#avatar" initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(<Avatar<'a'> as={AsTypeA} href="#avatar" initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(getByText('EC')).toBeTruthy();
  });

  it('should render the contrast colors', () => {
    const { getByText } = render(<Avatar contrast initials="EC" />);
    expect(getByText('EC')).toBeTruthy();
  });
});
