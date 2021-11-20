import React from 'react';
import { List } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';
import { render } from '../../utils';

const items = [
  { id: 'normal0', label: 'First' },
  { id: 'selected', label: 'Second', selected: true },
  { id: 'normal1', label: 'Third' },
  { id: 'normal2', label: 'Fourth' },
  { id: 'normal3', label: 'Fifth' },
  { id: 'disabled', label: 'Sixth', disabled: true },
  { id: 'inactive', label: 'Seventh', inactive: true },
];

describe('<List />', () => {
  it('should render a list', () => {
    const { container, getByText } = render(<List items={items} variant="bordered" />);

    expect(container.firstChild?.nodeName).toBe('UL');
    expect(container.querySelectorAll('li').length).toBe(7);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
    expect(getByText('Fifth')).toBeTruthy();
    expect(getByText('Sixth')).toBeTruthy();
    expect(getByText('Seventh')).toBeTruthy();
  });

  it('should render as a div', () => {
    const { container } = render(<List<'div'> as="div" items={items} variant="bordered" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container } = render(<List<'div'> as={AsTypeDiv} items={items} variant="bordered" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should accept the rest of the props', () => {
    render(
      <List
        contrast
        focused
        hideFocusOutline
        inactive
        inline
        mimicSelectOnFocus
        rounded
        scrollable
        transparent
        unstyled
        unthemed
        className="list"
        color="neutral"
        id="list"
        items={items}
        size="large"
        style={{ color: 'red' }}
        themeId="dark"
        variant="divided"
      />,
    );

    const list = document.getElementById('list');
    expect(list?.nodeName).toBe('UL');
    expect(list?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLUListElement>();
    const { getByTestId } = render(<List data-testid="list" items={items} ref={ref} variant="bordered" />);

    expect(getByTestId('list')).toBe(ref.current);
  });
});
