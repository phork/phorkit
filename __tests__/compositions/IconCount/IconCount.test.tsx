import React from 'react';
import { IconCount, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<IconCount />', () => {
  it('should render an icon and count', () => {
    const { getByText } = render(<IconCount count={24} icon={TimesIcon} label="Example" />);
    expect(getByText('24')).toBeTruthy();
  });
});
