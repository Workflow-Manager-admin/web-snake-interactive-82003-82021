import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App UI and Theme Control', () => {
  test('renders main elements (logo, link, theme toggle)', () => {
    render(<App />);
    // Logo
    const logoImg = screen.getByAltText(/logo/i);
    expect(logoImg).toBeInTheDocument();
    // Learn React link
    const link = screen.getByText(/learn react/i);
    expect(link).toBeInTheDocument();
    // Theme toggle button
    const btn = screen.getByRole('button', { name: /mode/i });
    expect(btn).toBeInTheDocument();
    // Theme indicator text
    const themeText = screen.getByText(/current theme:/i);
    expect(themeText).toBeInTheDocument();
  });

  test('shows light theme by default', () => {
    render(<App />);
    const themeIndicator = screen.getByText(/current theme:/i);
    expect(themeIndicator).toHaveTextContent(/light/i);
    const btn = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(btn).toHaveTextContent(/dark/i);
  });

  test('toggles to dark theme when button is clicked, and back to light', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(btn);
    // Theme text should now be "dark"
    expect(screen.getByText(/current theme:/i)).toHaveTextContent(/dark/i);
    // Button text should now indicate light mode available
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toHaveTextContent(/light/i);
    // Toggle back to light
    fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i }));
    expect(screen.getByText(/current theme:/i)).toHaveTextContent(/light/i);
  });

  test('correctly sets data-theme attribute on <html>', () => {
    render(<App />);
    // default theme
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    // Switch to dark
    const btn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

/**
 * NOTE:
 * No gameplay, score counter, or snake controls exist in the App code as of this test file.
 * When such features are implemented, UI and logic tests for them should be added.
 */
