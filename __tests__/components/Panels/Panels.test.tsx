import { render } from '@testing-library/react';
import { PanelContainer, MainPanel, SidePanel, StackPanel } from 'lib';
import * as React from 'react';

describe('<Panels />', () => {
  it('should render a set of panels', () => {
    const { getByText } = render(
      <PanelContainer orientation="horizontal" viewport>
        <StackPanel position="top" height={50}>
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
