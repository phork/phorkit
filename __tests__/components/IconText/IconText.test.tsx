import React from 'react';
import { IconText, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<IconText />', () => {
  it('should render an icon with text', () => {
    const { container, getByText } = render(<IconText icon={<TimesIcon scale="medium" />} text="Hello world" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <IconText
        inline
        reverse
        className="iconText"
        icon={<TimesIcon scale="medium" />}
        iconClassName="iconTextIcon"
        id="iconText"
        style={{ color: 'red' }}
        text="Hello world"
        textClassName="iconTextText"
      />,
    );

    const iconText = document.getElementById('iconText');
    expect(iconText?.nodeName).toBe('DIV');
    expect(iconText?.style.getPropertyValue('color')).toBe('red');
  });
});
