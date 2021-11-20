import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { IconTextButton, TimesIcon } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { createEvent, fireEvent, render } from '../../utils';

describe('<IconTextButton />', () => {
  it('should render a button', () => {
    const { container, getByText } = render(
      <IconTextButton icon={<TimesIcon scale="medium" />}>Click me!</IconTextButton>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <IconTextButton disabled data-testid="button" icon={<TimesIcon scale="medium" />}>
        Click me!
      </IconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <IconTextButton loading data-testid="button" icon={<TimesIcon scale="medium" />} loader={<span>Loading</span>}>
        Click me!
      </IconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a loading button with the loader replacing the icon', () => {
    const { getByText, getByTestId } = render(
      <IconTextButton
        loaderReplaceIcon
        loading
        data-testid="button"
        icon={<TimesIcon scale="medium" />}
        loader={<span>Loading</span>}
      >
        Click me!
      </IconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Click me!')).toBeTruthy();
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <IconTextButton data-testid="button" icon={<TimesIcon scale="medium" />} type="submit">
        Click me!
      </IconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IconTextButton icon={<TimesIcon scale="medium" />} onClick={onClick}>
        Click me!
      </IconTextButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger on Enter keydown when not a button', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IconTextButton<'div'> as="div" icon={<TimesIcon scale="medium" />} onClick={onClick}>
        Click me!
      </IconTextButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    button.focus();
    userEvent.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the link when disabled', () => {
    const { getByTestId } = render(
      <IconTextButton disabled data-testid="button" href="#" icon={<TimesIcon scale="medium" />}>
        Click me!
      </IconTextButton>,
    );

    const button = getByTestId('button');
    const keyDownEvent = createEvent.keyDown(button, { key: 'Enter' });
    fireEvent(button, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
  });

  it('should render as a button', () => {
    const { container } = render(<IconTextButton icon={<TimesIcon scale="medium" />}>Click me!</IconTextButton>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as an anchor', () => {
    const { container } = render(
      <IconTextButton<'a'> as="a" href="#button" icon={<TimesIcon scale="medium" />}>
        Click me!
      </IconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should render as a div', () => {
    const { container } = render(
      <IconTextButton imitation icon={<TimesIcon scale="medium" />}>
        Click me!
      </IconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <IconTextButton<'a'> as={AsTypeA} href="#button" icon={<TimesIcon scale="medium" />}>
        Click me!
      </IconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.firstChild).toHaveAttribute('href', '#button');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(
      <IconTextButton data-testid="button" icon={<TimesIcon scale="medium" />} ref={ref}>
        Click me!
      </IconTextButton>,
    );

    expect(getByTestId('button')).toBe(ref.current);
  });
});
