import React from 'react';
import { PanelContainer, MainPanel, SidePanel, StackPanel } from 'lib';
import { render } from '../../utils';

describe('<Panels />', () => {
  it('should render a set of panels', () => {
    const { getByText } = render(
      <PanelContainer viewport orientation="horizontal">
        <StackPanel height={50} position="top">
          Top panel
        </StackPanel>
        <MainPanel>
          <PanelContainer orientation="vertical">
            <SidePanel position="left" width={200}>
              Left panel
            </SidePanel>
            <MainPanel>Main panel</MainPanel>
          </PanelContainer>
        </MainPanel>
      </PanelContainer>,
    );
    expect(getByText('Top panel')).toBeTruthy();
    expect(getByText('Left panel')).toBeTruthy();
    expect(getByText('Main panel')).toBeTruthy();
  });
});
