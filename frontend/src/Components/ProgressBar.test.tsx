import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import ColorImpairedContext from 'App/ColorImpairedContext';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct aria attributes', () => {
    render(<ProgressBar progress={50} />);
    const meter = screen.getByRole('meter');

    expect(meter).toHaveAttribute('aria-valuenow', '50');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets progress width as percentage', () => {
    render(<ProgressBar progress={75} />);
    const meter = screen.getByRole('meter');

    expect(meter.style.width).toBe('75%');
  });

  it('respects precision prop', () => {
    render(<ProgressBar progress={33.333} precision={2} />);
    const meter = screen.getByRole('meter');

    expect(meter.style.width).toBe('33.33%');
  });

  it('shows text when showText is true', () => {
    render(<ProgressBar progress={50} showText />);

    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  it('shows custom text when provided', () => {
    render(<ProgressBar progress={50} showText text="Half done" />);

    expect(screen.getByText('Half done')).toBeInTheDocument();
  });

  it('does not show text by default', () => {
    const { container } = render(<ProgressBar progress={50} />);

    expect(container.textContent).toBe('');
  });

  it('applies kind class', () => {
    render(<ProgressBar progress={50} kind="success" />);
    const meter = screen.getByRole('meter');

    expect(meter.className).toContain('success');
  });

  it('applies colorImpaired class when context is enabled', () => {
    render(
      <ColorImpairedContext.Provider value={true}>
        <ProgressBar progress={50} />
      </ColorImpairedContext.Provider>
    );
    const meter = screen.getByRole('meter');

    expect(meter.className).toContain('colorImpaired');
  });

  it('applies custom width', () => {
    const { container } = render(<ProgressBar progress={50} width={200} />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv.style.width).toBe('200px');
  });

  it('defaults to 100% width', () => {
    const { container } = render(<ProgressBar progress={50} />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv.style.width).toBe('100%');
  });
});
