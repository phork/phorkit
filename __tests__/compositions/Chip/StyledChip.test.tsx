import * as React from 'react';
import { StyledChip, TimesIcon } from 'lib';
import { render } from '../../utils';

const styles = {
  avatarBackgroundColor: '#f41150',
  avatarTextColor: '#fff',
  tagActivePrimaryColor: '#da0a44',
  tagHoveredPrimaryColor: '#d64072',
  tagInverseColor: '#fff',
  tagPrimaryColor: '#f41150',
};

describe('<StyledChip />', () => {
  it('should render with avatar initials', () => {
    const { getByText } = render(<StyledChip avatar={{ initials: 'P' }} text="Hello world" {...styles} />);
    expect(getByText('P')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render with an avatar image', () => {
    const { getByTitle } = render(
      <StyledChip avatar={{ imgSrc: '/avatar.png', initials: 'P', title: 'avatar' }} text="Hello world" {...styles} />,
    );
    const avatar = getByTitle('avatar');
    expect(avatar.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });

  it('should render with an icon', () => {
    const { container } = render(
      <StyledChip avatar={{ initials: 'P' }} icon={<TimesIcon scale="medium" />} text="Hello world" {...styles} />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
