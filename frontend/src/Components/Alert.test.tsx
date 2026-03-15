import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Alert from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('defaults to info kind', () => {
    const { container } = render(<Alert>Info alert</Alert>);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain('info');
  });

  it('applies the specified kind class', () => {
    const { container } = render(<Alert kind="danger">Danger alert</Alert>);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain('danger');
  });

  it('applies a custom className', () => {
    const { container } = render(
      <Alert className="custom-class">Custom alert</Alert>
    );
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain('custom-class');
  });
});
