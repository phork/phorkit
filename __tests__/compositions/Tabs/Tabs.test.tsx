import userEvent from '@testing-library/user-event';
import React from 'react';
import { Tabs, TabsProps } from 'lib';
import { act, fireEvent, render } from '../../utils';

const items: TabsProps['items'] = [
  {
    id: 'first',
    label: ({ focused }) => `First${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `First tab${selected ? ' is selected' : ''}`,
  },
  {
    id: 'second',
    label: ({ focused }) => `Second${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `Second tab${selected ? ' is selected' : ''}`,
  },
  {
    id: 'third',
    label: ({ focused }) => `Third${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `Third tab${selected ? ' is selected' : ''}`,
    disabled: true,
  },
  {
    id: 'fourth',
    label: ({ focused }) => `Fourth${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `Fourth tab${selected ? ' is selected' : ''}`,
  },
];

describe('<Tabs />', () => {
  it('should render tabs with the first panel open', () => {
    const { getByText } = render(<Tabs items={items} />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();

    expect(getByText('First tab is selected')).toBeTruthy();
    expect(getByText('Second tab')).toBeTruthy();
    expect(getByText('Third tab')).toBeTruthy();
    expect(getByText('Fourth tab')).toBeTruthy();
  });

  it('should render tabs with no open tabs', () => {
    const { getByText } = render(<Tabs initialSelected={[]} items={items} minSelect={0} />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();

    expect(getByText('First tab')).toBeTruthy();
    expect(getByText('Second tab')).toBeTruthy();
    expect(getByText('Third tab')).toBeTruthy();
    expect(getByText('Fourth tab')).toBeTruthy();
  });

  it('should do nothing if an open tab is clicked and minSelect is not 0', () => {
    const { getByText } = render(<Tabs items={items} />);

    expect(getByText('First tab is selected')).toBeTruthy();
    fireEvent.click(getByText('First'));
    expect(getByText('First tab is selected')).toBeTruthy();
  });

  it('should open tab panels when the tab is clicked', () => {
    const { getByText } = render(<Tabs initialSelected={[]} items={items} minSelect={0} />);

    expect(getByText('First tab')).toBeTruthy();
    fireEvent.click(getByText('First'));
    expect(getByText('First tab is selected')).toBeTruthy();

    expect(getByText('Second tab')).toBeTruthy();
    fireEvent.click(getByText('Second'));
    expect(getByText('First tab')).toBeTruthy();
    expect(getByText('Second tab is selected')).toBeTruthy();
  });

  it('should obey the minSelect value', () => {
    const { getByText } = render(<Tabs initialSelected={[]} items={items} minSelect={0} />);

    expect(getByText('First tab')).toBeTruthy();
    expect(getByText('Second tab')).toBeTruthy();
    expect(getByText('Third tab')).toBeTruthy();
    expect(getByText('Fourth tab')).toBeTruthy();

    fireEvent.click(getByText('First'));
    expect(getByText('First tab is selected')).toBeTruthy();
    expect(getByText('Second tab')).toBeTruthy();
    expect(getByText('Third tab')).toBeTruthy();
    expect(getByText('Fourth tab')).toBeTruthy();

    fireEvent.click(getByText('Second'));
    expect(getByText('First tab')).toBeTruthy();
    expect(getByText('Second tab is selected')).toBeTruthy();
    expect(getByText('Third tab')).toBeTruthy();
    expect(getByText('Fourth tab')).toBeTruthy();

    fireEvent.click(getByText('Second'));
    expect(getByText('First tab')).toBeTruthy();
    expect(getByText('Second tab')).toBeTruthy();
    expect(getByText('Third tab')).toBeTruthy();
    expect(getByText('Fourth tab')).toBeTruthy();
  });

  it('should render the focused states', async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByRole, getByText } = render(<Tabs items={items} />);
    await act(() => {
      getByRole('tablist')?.focus();
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(getByText('First is focused')).toBeTruthy();

    await userEvent.keyboard('[ArrowDown]');
    expect(getByText('Second is focused')).toBeTruthy();

    // third tab is disabled so it's skipped over
    await userEvent.keyboard('[ArrowDown]');
    expect(getByText('Fourth is focused')).toBeTruthy();

    await userEvent.keyboard('[ArrowDown]');
    expect(getByText('First is focused')).toBeTruthy();
  });
});
