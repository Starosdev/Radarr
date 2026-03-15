import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Label from './Label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Label>Span label</Label>);
    const el = screen.getByText('Span label');

    expect(el.tagName).toBe('SPAN');
  });

  it('applies kind class', () => {
    render(<Label kind="success">Success</Label>);
    const el = screen.getByText('Success');

    expect(el.className).toContain('success');
  });

  it('applies size class', () => {
    render(<Label size="large">Large</Label>);
    const el = screen.getByText('Large');

    expect(el.className).toContain('large');
  });

  it('applies outline class when outline is true', () => {
    render(<Label outline>Outline</Label>);
    const el = screen.getByText('Outline');

    expect(el.className).toContain('outline');
  });

  it('does not apply outline class by default', () => {
    render(<Label>No Outline</Label>);
    const el = screen.getByText('No Outline');

    expect(el.className).not.toContain('outline');
  });

  it('spreads additional props onto the span', () => {
    render(<Label data-testid="my-label">Props</Label>);

    expect(screen.getByTestId('my-label')).toBeInTheDocument();
  });
});
