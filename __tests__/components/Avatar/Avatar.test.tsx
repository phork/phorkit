import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Avatar } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<Avatar />', () => {
  it('should render with initials', () => {
    const { getByText } = render(<Avatar initials="P" />);
    expect(getByText('P')).toBeTruthy();
  });

  it('should render with an image', () => {
    const { getByTestId } = render(<Avatar data-testid="avatar" imgSrc="/avatar.png" initials="P" />);
    const avatar = getByTestId('avatar');
    expect(avatar?.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });

  it('should render a non-actionable avatar', () => {
    const { getByTestId } = render(<Avatar data-testid="avatar" initials="P" />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).not.toHaveFocus();
  });

  it('should render an actionable avatar', () => {
    const { getByTestId } = render(<Avatar actionable data-testid="avatar" initials="P" />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).toHaveFocus();
  });

  it('should be clickable when actionable', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Avatar actionable data-testid="avatar" initials="P" onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();

    const avatar = getByTestId('avatar');
    fireEvent.click(avatar);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger on Enter keydown when actionable', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Avatar actionable data-testid="avatar" initials="P" onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();

    const avatar = getByTestId('avatar');
    avatar.focus();
    userEvent.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a div', () => {
    const { container } = render(<Avatar initials="P" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as a button', () => {
    const { container } = render(<Avatar actionable initials="P" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as a link', () => {
    const { container } = render(<Avatar<'a'> as="a" href="#avatar" initials="P" />);
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(<Avatar<'a'> as={AsTypeA} href="#avatar" initials="P" />);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(getByText('P')).toBeTruthy();
  });

  it('should render the contrast colors', () => {
    const { getByText } = render(<Avatar contrast initials="P" />);
    expect(getByText('P')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Avatar id="avatar" initials="P" style={{ color: 'red' }} themeId="dark">
        Beta
      </Avatar>,
    );

    const avatar = document.getElementById('avatar');
    expect(avatar?.nodeName).toBe('DIV');
    expect(avatar?.style.getPropertyValue('color')).toBe('red');
  });
});
