import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StyledIconTextButton, TimesIcon } from 'lib';
import { fireEvent, render } from '../../utils';

const styles = {
  activePrimaryColor: '#798796',
  hoveredPrimaryColor: '#454f58',
  inverseColor: '#fff',
  primaryColor: '#556270',
  width: 100,
};

describe('<StyledIconTextButton />', () => {
  it('should render a button', () => {
    const { container, getByText } = render(
      <StyledIconTextButton icon={<TimesIcon scale="medium" />} {...styles}>
        Click me!
      </StyledIconTextButton>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <StyledIconTextButton disabled data-testid="button" icon={<TimesIcon scale="medium" />} {...styles}>
        Click me!
      </StyledIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <StyledIconTextButton
        loading
        data-testid="button"
        icon={<TimesIcon scale="medium" />}
        loader={<span>Loading</span>}
        {...styles}
      >
        Click me!
      </StyledIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a loading button with the loader replacing the icon', () => {
    const { getByText, getByTestId } = render(
      <StyledIconTextButton
        loaderReplaceIcon
        loading
        data-testid="button"
        icon={<TimesIcon scale="medium" />}
        loader={<span>Loading</span>}
        {...styles}
      >
        Click me!
      </StyledIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Click me!')).toBeTruthy();
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <StyledIconTextButton data-testid="button" icon={<TimesIcon scale="medium" />} type="submit" {...styles}>
        Click me!
      </StyledIconTextButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <StyledIconTextButton icon={<TimesIcon scale="medium" />} onClick={onClick} {...styles}>
        Click me!
      </StyledIconTextButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
