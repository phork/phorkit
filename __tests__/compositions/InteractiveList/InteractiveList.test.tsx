import React from 'react';
import { InteractiveList } from 'lib';
import { render } from '../../utils';

const options = [
  { id: 'red', label: 'Red' },
  { id: 'red-orange', label: 'Red orange' },
  { id: 'orange', label: 'Orange' },
  { id: 'orange-yellow', label: 'Orange yellow' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'yellow-green', label: 'Yellow green', disabled: true },
  { id: 'green', label: 'Green' },
  { id: 'green-blue', label: 'Green blue' },
  { id: 'blue', label: 'Blue' },
  { id: 'blue-indigo', label: 'Blue indigo' },
  { id: 'indigo', label: 'Indigo' },
  { id: 'indigo-violet', label: 'Indigo violet' },
  { id: 'violet', label: 'Violet' },
  { id: 'violet-red', label: 'Violet red' },
];

describe('<InteractiveList />', () => {
  it('should render an interactive list', () => {
    const { getByText } = render(
      <InteractiveList initialSelected={['red']} items={options} variant="bordered">
        An empty notification
      </InteractiveList>,
    );
    expect(getByText('Red')).toBeTruthy();
    expect(getByText('Red orange')).toBeTruthy();
    expect(getByText('Orange')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLUListElement>();
    const { getByTestId } = render(
      <InteractiveList data-testid="list" initialSelected={['red']} items={options} ref={ref} variant="bordered">
        An empty notification
      </InteractiveList>,
    );

    expect(getByTestId('list')).toBe(ref.current);
  });
});
