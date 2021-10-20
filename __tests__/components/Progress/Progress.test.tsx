import React from 'react';
import { Progress } from 'lib';
import { render } from '../../utils';

describe('<Progress />', () => {
  it('should render a progress bar', () => {
    const { container } = render(<Progress percent={80} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
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
});
