import React from 'react';

/**
 * Renders a list of all the props passed to it.
 */
export function ListProps(props: Record<string, string>): React.ReactElement {
  const items = [] as React.ReactElement[];

  Object.keys(props).forEach(key => {
    items.push(<li key={key}>{`${key}: ${props[key]}`}</li>);
  });

  return <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>{items}</ul>;
}

ListProps.displayName = 'ListProps';
