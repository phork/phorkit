import React from 'react';
import { Card } from 'lib';
import { render } from '../../utils';

describe('<Card />', () => {
  it('should render a card', () => {
    const { getByText } = render(<Card>Hello world</Card>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Card
        bordered
        full
        hoverable
        magnify
        raised
        squared
        unthemed
        className="card"
        id="card"
        style={{ color: 'red' }}
        themeId="dark"
      >
        Hello world
      </Card>,
    );

    const card = document.getElementById('card');
    expect(card?.nodeName).toBe('DIV');
    expect(card?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Card data-testid="card" ref={ref}>
        Click me!
      </Card>,
    );

    expect(getByTestId('card')).toBe(ref.current);
  });
});
