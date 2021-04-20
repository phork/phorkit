import { render } from '@testing-library/react';
import React from 'react';
import { CardBody } from 'lib';

describe('<CardBody />', () => {
  it('should render a basic card body', () => {
    const { getByText } = render(<CardBody>Hello world</CardBody>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
