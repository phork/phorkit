import * as React from 'react';
import { Chip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<Chip />', () => {
  it('should render with avatar initials', () => {
    const { getByText } = render(<Chip avatar={{ initials: 'P' }} text="Hello world" />);
    expect(getByText('P')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render with an avatar image', () => {
    const { getByTitle } = render(
      <Chip avatar={{ imgSrc: '/avatar.png', initials: 'P', title: 'avatar' }} text="Hello world" />,
    );
    const avatar = getByTitle('avatar');
    expect(avatar.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });

  it('should render with an icon', () => {
    const { container } = render(
      <Chip avatar={{ initials: 'P' }} icon={<TimesIcon scale="medium" />} text="Hello world" />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
