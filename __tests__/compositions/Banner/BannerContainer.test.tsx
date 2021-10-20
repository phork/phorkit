import React from 'react';
import { BannerContainer, Banner } from 'lib';
import { render } from '../../utils';

describe('<Banners />', () => {
  it('should render a banner container', () => {
    const { getByText } = render(
      <BannerContainer>
        <Banner immediate level="info">
          This is an info banner because something interesting happened. Exciting!
        </Banner>
        <Banner immediate level="danger">
          This is a danger banner because something bad happened. Uh oh!
        </Banner>
        <Banner immediate level="warning">
          This is a warning banner because something not so great happened. Meh.
        </Banner>
        <Banner immediate level="success">
          This is a success banner because something excellent happened. Yay!
        </Banner>
        <Banner immediate level="success">
          This is another success banner. It cannot be removed.
        </Banner>
      </BannerContainer>,
    );
    expect(getByText('This is an info banner because something interesting happened. Exciting!')).toBeTruthy();
    expect(getByText('This is a danger banner because something bad happened. Uh oh!')).toBeTruthy();
    expect(getByText('This is a warning banner because something not so great happened. Meh.')).toBeTruthy();
    expect(getByText('This is a success banner because something excellent happened. Yay!')).toBeTruthy();
    expect(getByText('This is another success banner. It cannot be removed.')).toBeTruthy();
  });
});
