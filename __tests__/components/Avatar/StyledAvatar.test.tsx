import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { StyledAvatar } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { render } from '../../utils';

const styles = {
  backgroundColor: '#556270',
  textColor: '#fff',
};

describe('<StyledAvatar />', () => {
  it('should render with initials', () => {
    const { getByText } = render(<StyledAvatar initials="EC" {...styles} />);
    expect(getByText('EC')).toBeTruthy();
  });

  it('should render with an image', () => {
    const { getByTestId } = render(
      <StyledAvatar data-testid="avatar" imgSrc="/avatar.png" initials="EC" {...styles} />,
    );
    const avatar = getByTestId('avatar');
    expect(avatar?.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });

  it('should render an actionable avatar', () => {
    const { getByTestId } = render(<StyledAvatar actionable data-testid="avatar" initials="EC" {...styles} />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).toHaveFocus();
  });

  it('should render a non-actionable avatar', () => {
    const { getByTestId } = render(<StyledAvatar data-testid="avatar" initials="EC" {...styles} />);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(getByTestId('avatar')).not.toHaveFocus();
  });

  it('should render as a div', () => {
    const { container } = render(<StyledAvatar initials="EC" {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as a button', () => {
    const { container } = render(<StyledAvatar actionable initials="EC" {...styles} />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as a link', () => {
    const { container } = render(<StyledAvatar<'a'> as="a" href="#avatar" initials="EC" {...styles} />);
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <StyledAvatar<'a'> as={AsTypeA} href="#avatar" initials="EC" {...styles} />,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(getByText('EC')).toBeTruthy();
  });
});
