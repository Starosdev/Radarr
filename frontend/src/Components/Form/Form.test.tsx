import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Form from './Form';

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form>
        <input data-testid="child-input" />
      </Form>
    );

    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('renders with an id', () => {
    const { container } = render(<Form id="my-form">Content</Form>);

    expect(container.querySelector('#my-form')).toBeInTheDocument();
  });

  it('renders validation errors', () => {
    const errors = [
      {
        isWarning: false as const,
        propertyName: 'path',
        errorMessage: 'Path is required',
        severity: 'error' as const,
      },
      {
        isWarning: false as const,
        propertyName: 'name',
        errorMessage: 'Name is required',
        severity: 'error' as const,
      },
    ];

    render(
      <Form validationErrors={errors}>
        <div>Form content</div>
      </Form>
    );

    expect(screen.getByText('Path is required')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('renders validation warnings', () => {
    const warnings = [
      {
        isWarning: true as const,
        propertyName: 'quality',
        errorMessage: 'Quality may be too high',
        severity: 'warning' as const,
      },
    ];

    render(
      <Form validationWarnings={warnings}>
        <div>Form content</div>
      </Form>
    );

    expect(screen.getByText('Quality may be too high')).toBeInTheDocument();
  });

  it('renders both errors and warnings', () => {
    const errors = [
      {
        isWarning: false as const,
        propertyName: 'path',
        errorMessage: 'Error message',
        severity: 'error' as const,
      },
    ];
    const warnings = [
      {
        isWarning: true as const,
        propertyName: 'quality',
        errorMessage: 'Warning message',
        severity: 'warning' as const,
      },
    ];

    render(
      <Form validationErrors={errors} validationWarnings={warnings}>
        <div>Form content</div>
      </Form>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('does not render validation section when no errors or warnings', () => {
    const { container } = render(
      <Form>
        <div>Form content</div>
      </Form>
    );

    expect(
      container.querySelector('.validationFailures')
    ).not.toBeInTheDocument();
  });
});
