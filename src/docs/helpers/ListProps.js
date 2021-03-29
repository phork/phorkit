import React from 'react';

export function ListProps(props) {
  const items = [];

  Object.keys(props).forEach(key => {
    items.push(<li key={key}>{`${key}: ${props[key]}`}</li>);
  });

  return <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>{items}</ul>;
}
