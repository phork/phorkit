import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ColoredIconTextButton, TimesIcon } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<ColoredIconTextButton colorId="P10" />', () => {
  it('should render a button', () => {
    const { container, getByText } = render(
      <ColoredIconTextButton colorId="P10" icon={<TimesIcon scale="medium" />}>
        Click me!
      </ColoredIconTextButton>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <ColoredIconTextButton disabled colorId="P10" data-testid="button" icon={<TimesIcon scale="medium" />}>
        Click me!
      </ColoredIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <ColoredIconTextButton
        loading
        colorId="P10"
        data-testid="button"
        icon={<TimesIcon scale="medium" />}
        loader={<span>Loading</span>}
      >
        Click me!
      </ColoredIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a loading button with the loader replacing the icon', () => {
    const { getByText, getByTestId } = render(
      <ColoredIconTextButton
        loaderReplaceIcon
        loading
        colorId="P10"
        data-testid="button"
        icon={<TimesIcon scale="medium" />}
        loader={<span>Loading</span>}
      >
        Click me!
      </ColoredIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Click me!')).toBeTruthy();
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <ColoredIconTextButton colorId="P10" data-testid="button" icon={<TimesIcon scale="medium" />} type="submit">
        Click me!
      </ColoredIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ColoredIconTextButton colorId="P10" icon={<TimesIcon scale="medium" />} onClick={onClick}>
        Click me!
      </ColoredIconTextButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a button', () => {
    const { container } = render(
      <ColoredIconTextButton colorId="P10" icon={<TimesIcon scale="medium" />}>
        Click me!
      </ColoredIconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as an anchor', () => {
    const { container } = render(
      <ColoredIconTextButton<'a'> as="a" colorId="P10" href="#button" icon={<TimesIcon scale="medium" />}>
        Click me!
      </ColoredIconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should render as a div', () => {
    const { container } = render(
      <ColoredIconTextButton imitation colorId="P10" icon={<TimesIcon scale="medium" />}>
        Click me!
      </ColoredIconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <ColoredIconTextButton<'a'> as={AsTypeA} colorId="P10" href="#button" icon={<TimesIcon scale="medium" />}>
        Click me!
      </ColoredIconTextButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.firstChild).toHaveAttribute('href', '#button');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
