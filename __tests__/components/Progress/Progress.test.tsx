import React from 'react';
import { Progress } from 'lib';
import { render } from '../../utils';

describe('<Progress />', () => {
  it('should render a progress bar', () => {
    const { container } = render(<Progress percent={80} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should set the progress bar segment width', () => {
    const { getByTestId } = render(<Progress data-testid="progress" percent={80} />);

    const progress = getByTestId('progress');
    const children = progress.querySelector('div');
    expect(children?.style.getPropertyValue('width')).toBe('80%');
  });

  it('should render a multi-segment progress bar', () => {
    const { container } = render(
      <Progress
        data={[
          { color: 'danger', percent: 10 },
          { color: 'warning', percent: 20 },
          { color: 'success', percent: 40 },
        ]}
      />,
    );
    expect(container.querySelectorAll('div').length).toBe(4);
  });

  it('should set the progress bar multi-segment widths', () => {
    const { getByTestId } = render(
      <Progress
        spaced
        data={[
          { color: 'danger', percent: 10 },
          { color: 'warning', percent: 20 },
          { color: 'success', percent: 40 },
        ]}
        data-testid="progress"
      />,
    );

    const progress = getByTestId('progress');
    const children = progress.querySelectorAll('div');
    expect(children[0]?.style.getPropertyValue('width')).toBe('calc(10% - 1px)');
    expect(children[1]?.style.getPropertyValue('width')).toBe('calc(20% - 1px)');
    expect(children[2]?.style.getPropertyValue('width')).toBe('40%');
  });

  it('should accept the rest of the props', () => {
    render(
      <Progress
        animated
        contrast
        floating
        rounded
        spaced
        unthemed
        className="progress"
        color="warning"
        id="progress"
        orientation="vertical"
        percent={20}
        size="large"
        style={{ color: 'red' }}
        themeId="dark"
        volume="quiet"
      />,
    );

    const progress = document.getElementById('progress');
    expect(progress?.nodeName).toBe('DIV');
    expect(progress?.style.getPropertyValue('color')).toBe('red');
  });
});
