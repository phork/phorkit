import { render } from '@testing-library/react';
import * as React from 'react';
import { IconText, TimesIcon } from 'lib';

describe('<IconText />', () => {
  it('should render a basic icon text', () => {
    const { container, getByText } = render(<IconText icon={<TimesIcon scale="medium" />} text="Hello world" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });
});
