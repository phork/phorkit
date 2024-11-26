import userEvent from '@testing-library/user-event';
import React from 'react';
import { Accordion, AccordionItemType } from 'lib';
import { act, fireEvent, render } from '../../utils';

const items: AccordionItemType[] = [
  {
    id: 'first',
    label: ({ focused }) => `First${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `First panel${selected ? ' is selected' : ''}`,
  },
  {
    id: 'second',
    label: ({ focused }) => `Second${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `Second panel${selected ? ' is selected' : ''}`,
  },
  {
    id: 'third',
    label: ({ focused }) => `Third${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `Third panel${selected ? ' is selected' : ''}`,
    disabled: true,
  },
  {
    id: 'fourth',
    label: ({ focused }) => `Fourth${focused ? ' is focused' : ''}`,
    content: ({ selected }) => `Fourth panel${selected ? ' is selected' : ''}`,
  },
];

describe('<Accordion />', () => {
  it('should render an accordion with the first panel open', () => {
    const { getByText } = render(<Accordion items={items} />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();

    expect(getByText('First panel is selected')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();
  });

  it('should render an accordion with no open panels', () => {
    const { getByText } = render(<Accordion initialSelected={[]} items={items} minSelect={0} />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();

    expect(getByText('First panel')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();
  });

  it('should do nothing if an open header is clicked and minSelect is not 0', () => {
    const { getByText } = render(<Accordion items={items} />);

    expect(getByText('First panel is selected')).toBeTruthy();
    fireEvent.click(getByText('First'));
    expect(getByText('First panel is selected')).toBeTruthy();
  });

  it('should open an accordion panel when the header is clicked', () => {
    const { getByText } = render(<Accordion initialSelected={[]} items={items} minSelect={0} />);

    expect(getByText('First panel')).toBeTruthy();
    fireEvent.click(getByText('First'));
    expect(getByText('First panel is selected')).toBeTruthy();

    expect(getByText('Second panel')).toBeTruthy();
    fireEvent.click(getByText('Second'));
    expect(getByText('First panel')).toBeTruthy();
    expect(getByText('Second panel is selected')).toBeTruthy();
  });

  it('should obey the minSelect and maxSelect values', () => {
    const { getByText } = render(<Accordion initialSelected={[]} items={items} maxSelect={2} minSelect={0} />);

    expect(getByText('First panel')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();

    fireEvent.click(getByText('First'));
    expect(getByText('First panel is selected')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();

    fireEvent.click(getByText('Second'));
    expect(getByText('First panel is selected')).toBeTruthy();
    expect(getByText('Second panel is selected')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();

    fireEvent.click(getByText('Fourth'));
    expect(getByText('First panel is selected')).toBeTruthy();
    expect(getByText('Second panel is selected')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();

    fireEvent.click(getByText('Second'));
    expect(getByText('First panel is selected')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();

    fireEvent.click(getByText('Fourth'));
    expect(getByText('First panel is selected')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel is selected')).toBeTruthy();

    fireEvent.click(getByText('First'));
    expect(getByText('First panel')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel is selected')).toBeTruthy();

    fireEvent.click(getByText('Fourth'));
    expect(getByText('First panel')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();
  });

  it('should render the focused states', async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByRole, getByText } = render(<Accordion items={items} />);
    await act(() => {
      getByRole('tablist')?.focus();
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(getByText('First is focused')).toBeTruthy();

    await userEvent.keyboard('[ArrowDown]');
    expect(getByText('Second is focused')).toBeTruthy();

    // third panel is disabled so it's skipped over
    await userEvent.keyboard('[ArrowDown]');
    expect(getByText('Fourth is focused')).toBeTruthy();

    await userEvent.keyboard('[ArrowDown]');
    expect(getByText('First is focused')).toBeTruthy();

    await userEvent.tab();
    expect(getByText('Second is focused')).toBeTruthy();
  });
});
