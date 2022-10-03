import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ColoredAvatar } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<ColoredAvatar />', () => {
  it('should render with initials', () => {
    const { getByText } = render(<ColoredAvatar colorId="P10" initials="P" />);
    expect(getByText('P')).toBeTruthy();
  });

  it('should render with an image', () => {
    const { getByTestId } = render(
      <ColoredAvatar colorId="P10" data-testid="avatar" imgSrc="/avatar.png" initials="P" />,
    );
    const avatar = getByTestId('avatar');
    expect(avatar?.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });

  it('should render a non-actionable avatar', () => {
    const { getByTestId } = render(<ColoredAvatar colorId="P10" data-testid="avatar" initials="P" />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).not.toHaveFocus();
  });

  it('should render an actionable avatar', () => {
    const { getByTestId } = render(<ColoredAvatar actionable colorId="P10" data-testid="avatar" initials="P" />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).toHaveFocus();
  });

  it('should be clickable when actionable', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ColoredAvatar actionable colorId="P10" data-testid="avatar" initials="P" onClick={onClick} />,
    );

    expect(onClick).not.toHaveBeenCalled();

    const avatar = getByTestId('avatar');
    fireEvent.click(avatar);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger on Enter keydown when actionable', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ColoredAvatar actionable colorId="P10" data-testid="avatar" initials="P" onClick={onClick} />,
    );

    expect(onClick).not.toHaveBeenCalled();

    const avatar = getByTestId('avatar');
    avatar.focus();
    userEvent.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a div', () => {
    const { container } = render(<ColoredAvatar colorId="P10" initials="P" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as a button', () => {
    const { container } = render(<ColoredAvatar actionable colorId="P10" initials="P" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as a link', () => {
    const { container } = render(<ColoredAvatar<'a'> as="a" colorId="P10" href="#avatar" initials="P" />);
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <ColoredAvatar<'a'> as={AsTypeA} colorId="P10" href="#avatar" initials="P" />,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(getByText('P')).toBeTruthy();
  });
});
