import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import React from 'react';
import mockData from './mockData';
import userEvent from '@testing-library/user-event';

// beforeEach(() => {
//   fetchMock.resetMocks();
//   fetchMock.once(JSON.stringify(mockData));
// });

describe('<App /> tests', () => {
  it('should add a todo list', async () => {
    fetchMock.once(
      JSON.stringify({
        userId: 3,
        id: Math.floor(Math.random() * 100) + 1,
        title: 'Do math homework',
        completed: false,
      })
    );
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    userEvent.type(screen.getByRole('textbox'), 'Do math homework');
    userEvent.click(screen.getByText(/Add new todo/i));
    await waitForElementToBeRemoved(() => screen.getByText(/saving/i));
    expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
  });
});

it('remove todo from list', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  userEvent.click(screen.getByTestId('close-btn-3'));
  expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
});

it('todo item should be crossed out after completing', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  userEvent.click(screen.getByTestId('checkbox-1'));
  expect(screen.queryByText(/eat breakfast/i)).toHaveClass('completed');
})
// it('renders <App />', async () => {
//   render(<App />);
//   await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
// });

