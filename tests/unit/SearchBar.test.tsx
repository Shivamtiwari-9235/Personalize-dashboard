import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import SearchBar from '@/components/common/SearchBar';

jest.useFakeTimers();

describe('SearchBar', () => {
  it('renders input and calls onSearch debounced', async () => {
    const onSearch = jest.fn();
    renderWithProviders(<SearchBar query="" onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'react' } });

    // should not have been called immediately
    expect(onSearch).not.toHaveBeenCalled();

    // advance time past debounce (500ms)
    jest.advanceTimersByTime(600);
    expect(onSearch).toHaveBeenCalledWith('react');

    // typing more and clearing
    fireEvent.change(input, { target: { value: '' } });
    jest.advanceTimersByTime(600);
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('does not call onSearch on every keystroke', () => {
    const onSearch = jest.fn();
    renderWithProviders(<SearchBar query="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: 'r' } });
    fireEvent.change(input, { target: { value: 're' } });
    fireEvent.change(input, { target: { value: 'rea' } });

    jest.advanceTimersByTime(499);
    expect(onSearch).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
