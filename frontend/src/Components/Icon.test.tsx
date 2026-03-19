import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Icon from './Icon';

describe('Icon', () => {
  it('renders an SVG icon', () => {
    const { container } = render(<Icon name={faCheck} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies size as fontSize style', () => {
    const { container } = render(<Icon name={faCheck} size={20} />);
    const svg = container.querySelector('svg') as SVGElement;

    expect(svg.style.fontSize).toBe('20px');
  });

  it('defaults size to 14px', () => {
    const { container } = render(<Icon name={faCheck} />);
    const svg = container.querySelector('svg') as SVGElement;

    expect(svg.style.fontSize).toBe('14px');
  });

  it('wraps in a span with title when title string is provided', () => {
    render(<Icon name={faCheck} title="Check icon" />);
    const span = screen.getByTitle('Check icon');

    expect(span.tagName).toBe('SPAN');
    expect(span.querySelector('svg')).toBeInTheDocument();
  });

  it('calls title function when title is a function', () => {
    const titleFn = vi.fn(() => 'Dynamic title');

    render(<Icon name={faCheck} title={titleFn} />);

    expect(titleFn).toHaveBeenCalled();
    expect(screen.getByTitle('Dynamic title')).toBeInTheDocument();
  });

  it('does not wrap in span when no title', () => {
    const { container } = render(<Icon name={faCheck} />);

    expect(container.firstChild?.nodeName).toBe('svg');
  });

  it('applies containerClassName to the title wrapper span', () => {
    render(
      <Icon name={faCheck} title="Test" containerClassName="my-container" />
    );
    const span = screen.getByTitle('Test');

    expect(span.className).toContain('my-container');
  });

  it('applies kind class', () => {
    const { container } = render(<Icon name={faCheck} kind="danger" />);
    const svg = container.querySelector('svg') as SVGElement;

    expect(svg.classList.toString()).toContain('danger');
  });

  it('renders spinning icon when isSpinning is true', () => {
    const { container } = render(<Icon name={faSpinner} isSpinning={true} />);
    const svg = container.querySelector('svg') as SVGElement;

    expect(svg.classList.toString()).toContain('spin');
  });
});
