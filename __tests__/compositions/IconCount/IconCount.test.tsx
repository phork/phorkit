import { render } from '@testing-library/react';
import { IconCount, TimesIcon } from 'lib';
import * as React from 'react';

describe('<IconCount />', () => {
  it('should render a basic icon + count', () => {
    const { getByText } = render(<IconCount icon={TimesIcon} label="Example" count={24} />);
    expect(getByText('24')).toBeTruthy();
  });
});
