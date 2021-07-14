import { render } from '@testing-library/react';
import React from 'react';
import { IconCount, TimesIcon } from 'lib';

describe('<IconCount />', () => {
  it('should render a basic icon + count', () => {
    const { getByText } = render(<IconCount count={24} icon={TimesIcon} label="Example" />);
    expect(getByText('24')).toBeTruthy();
  });
});
