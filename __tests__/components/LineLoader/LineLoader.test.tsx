import React from 'react';
import { LineLoader } from 'lib';
import { render } from '../../utils';

describe('<LineLoader />', () => {
  it('should render a line loader', () => {
    const { container } = render(<LineLoader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a 30% complete line loader', () => {
    const { getByTestId } = render(<LineLoader data-testid="lineLoader" percent={30} />);
    const lineLoader = getByTestId('lineLoader');
    expect(lineLoader?.style.getPropertyValue('--line-loader-left')).toBe('0%');
    expect(lineLoader?.style.getPropertyValue('--line-loader-right')).toBe('40%');
  });

  it('should accept the rest of the props', () => {
    const { getByLabelText } = render(
      <LineLoader
        contrast
        fixed
        className="lineLoader"
        duration={1000}
        id="lineLoader"
        loops={3}
        onFinish={() => {}}
        onLoop={() => {}}
        position="bottom"
        style={{ color: 'red' }}
        themeId="dark"
        translations={{ loadingLabel: 'Test label' }}
      />,
    );

    const lineLoader = document.getElementById('lineLoader');
    expect(lineLoader?.nodeName).toBe('DIV');
    expect(lineLoader?.style.getPropertyValue('color')).toBe('red');
    expect(getByLabelText('Test label')).toBeTruthy();
  });
});
