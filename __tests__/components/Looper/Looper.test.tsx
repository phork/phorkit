import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Looper } from 'lib';
import { render } from '../../utils';

describe('<Looper />', () => {
  it('should loop through a list', () => {
    const { getByText } = render(<Looper list={['small', 'medium', 'large']} render={size => <div>{size}</div>} />);
    expect(getByText('small')).toBeTruthy();
    expect(getByText('medium')).toBeTruthy();
    expect(getByText('large')).toBeTruthy();
  });

  it('should loop using start and end values', () => {
    const { getByText } = render(<Looper end={4} render={i => <div>{`number ${i}`}</div>} />);
    expect(getByText('number 0')).toBeTruthy();
    expect(getByText('number 1')).toBeTruthy();
    expect(getByText('number 2')).toBeTruthy();
    expect(getByText('number 3')).toBeTruthy();
    expect(getByText('number 4')).toBeTruthy();
    expect(() => getByText('number 5')).toThrow();
  });

  it('should loop using start and end values with a custom step', () => {
    const { getByText } = render(<Looper end={30} render={i => <div>{`number ${i}`}</div>} start={5} step={5} />);
    expect(getByText('number 5')).toBeTruthy();
    expect(getByText('number 10')).toBeTruthy();
    expect(getByText('number 15')).toBeTruthy();
    expect(getByText('number 20')).toBeTruthy();
    expect(getByText('number 25')).toBeTruthy();
    expect(getByText('number 30')).toBeTruthy();
    expect(() => getByText('number 35')).toThrow();
  });
});
