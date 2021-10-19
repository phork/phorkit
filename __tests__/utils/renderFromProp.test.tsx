import React from 'react';
import { renderFromProp, renderFromPropWithFallback } from 'lib';
import { render } from '../utils';

describe('renderFromProp', () => {
  it('should return an array of children without modification', () => {
    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp(() => (
          <React.Fragment>
            <div>Hello world</div>
            <div>How are you?</div>
          </React.Fragment>
        ))}
      </React.Fragment>,
    );

    expect(queryByText('Hello world')).toBeTruthy();
    expect(queryByText('How are you?')).toBeTruthy();
  });

  it('should render from a function', () => {
    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp(() => (
          <div>Hello world</div>
        ))}
      </React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a function with props', () => {
    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp<{ recipient: string }>(
          ({ recipient }) => (
            <div>Hello {recipient}</div>
          ),
          { recipient: 'world' },
        )}
      </React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a function with children', () => {
    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp(
          ({ children }) => (
            <div>Hello {children}</div>
          ),
          {},
          { children: 'world' },
        )}
      </React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a fragment containing a function with children', () => {
    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp(
          <React.Fragment>
            {({ children }: { children: React.ReactNode }) => <div>Hello {children}</div>}
          </React.Fragment>,
          {},
          { children: 'world' },
        )}
      </React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a React node', () => {
    const HelloWorld = () => <div>Hello world</div>;

    const { queryByText } = render(<React.Fragment>{renderFromProp(<HelloWorld />)}</React.Fragment>);
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a React node with props', () => {
    const HelloWorld = ({ recipient }: { recipient?: string }) => <div>Hello {recipient}</div>;

    const { queryByText } = render(
      <React.Fragment>{renderFromProp<{ recipient: string }>(<HelloWorld />, { recipient: 'world' })}</React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a React node with children', () => {
    const HelloWorld = ({ children }: { children?: React.ReactChild }) => <div>{children}</div>;

    const { queryByText } = render(
      <React.Fragment>{renderFromProp(<HelloWorld />, {}, { children: 'Hello world' })}</React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a fragment containing a React node with children', () => {
    const HelloWorld = ({ children }: { children?: React.ReactChild }) => <div>{children}</div>;

    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp(
          <React.Fragment>
            <HelloWorld />
          </React.Fragment>,
          {},
          { children: 'Hello world' },
        )}
      </React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a React element', () => {
    const HelloWorld = () => <div>Hello world</div>;

    const { queryByText } = render(<React.Fragment>{renderFromProp(HelloWorld)}</React.Fragment>);
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a React element with props', () => {
    const HelloWorld = ({ recipient }: { recipient?: string }) => <div>Hello {recipient}</div>;

    const { queryByText } = render(
      <React.Fragment>{renderFromProp<{ recipient: string }>(HelloWorld, { recipient: 'world' })}</React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a React element with children', () => {
    const HelloWorld = ({ children }: { children?: React.ReactChild }) => <div>{children}</div>;

    const { queryByText } = render(
      <React.Fragment>{renderFromProp(HelloWorld, {}, { children: 'Hello world' })}</React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a fragment containing a React element with children', () => {
    const HelloWorld = ({ children }: { children?: React.ReactChild }) => <div>{children}</div>;

    const { queryByText } = render(
      <React.Fragment>
        {renderFromProp(<React.Fragment>{HelloWorld}</React.Fragment>, {}, { children: 'Hello world' })}
      </React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render as a string with createFromString', () => {
    const { queryByText } = render(
      <React.Fragment>{renderFromProp('div', {}, { children: 'Hello world', createFromString: true })}</React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });
});

describe('renderFromPropWithFallback', () => {
  it('should render from a fallback string', () => {
    const { queryByText } = render(<React.Fragment>{renderFromPropWithFallback('Hello world')}</React.Fragment>);
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should render from a fragment containing a fallback string', () => {
    const { queryByText } = render(
      <React.Fragment>{renderFromPropWithFallback(<React.Fragment>Hello world</React.Fragment>)}</React.Fragment>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });
});
