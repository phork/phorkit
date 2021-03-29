import { render } from '@testing-library/react';
import { CardBody } from 'lib';
import * as React from 'react';

describe('<CardBody />', () => {
  it('should render a basic card body', () => {
    const { getByText } = render(<CardBody>Hello world</CardBody>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
