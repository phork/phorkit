import React from 'react';
import { InlineTextTooltip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<InlineTextTooltip />', () => {
  it('should render a tooltip', () => {
    const { getByText } = render(
      <InlineTextTooltip
        permanent
        height={80}
        position="top-center"
        toggler={<TimesIcon scale="3xlarge" />}
        width={300}
      >
        Hello world
      </InlineTextTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
