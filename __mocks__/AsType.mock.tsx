import React from 'react';

export interface AsTypeAProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactChild | React.ReactFragment;
}

export function AsTypeA({ children, ...props }: AsTypeAProps): React.ReactElement<AsTypeAProps, 'a'> {
  return <a {...props}>{children}</a>;
}

export interface AsTypeDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild | React.ReactFragment;
}

export function AsTypeDiv({ children, ...props }: AsTypeDivProps): React.ReactElement<AsTypeDivProps, 'div'> {
  return <div {...props}>{children}</div>;
}

export interface AsTypePProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactChild | React.ReactFragment;
}

export function AsTypeP({ children, ...props }: AsTypePProps): React.ReactElement<AsTypePProps, 'p'> {
  return <p {...props}>{children}</p>;
}

export interface AsTypeUlProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactChild | React.ReactFragment;
}

export function AsTypeUl({ children, ...props }: AsTypeUlProps): React.ReactElement<AsTypeUlProps, 'ul'> {
  return <ul {...props}>{children}</ul>;
}

export interface AsTypeLiProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactChild | React.ReactFragment;
}

export function AsTypeLi({ children, ...props }: AsTypeLiProps): React.ReactElement<AsTypeLiProps, 'li'> {
  return <li {...props}>{children}</li>;
}
