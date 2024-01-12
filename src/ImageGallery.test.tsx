import React from 'react';
const axios = require('axios');
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageGallery from './components/ImageGallery';
import '@testing-library/jest-dom';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockImages = [
  { id: 1, title: 'accusamus beatae ad facilis cum similique qui sunt', url: "https://via.placeholder.com/150/92c952", like: false },
  { id: 2, title: 'reprehenderit est deserunt velit ipsam', url: "https://via.placeholder.com/150/771796", like: false },
];

beforeEach(() => {
  mockedAxios.get.mockResolvedValue({ data: mockImages });
});

test('renders ImageGallery component', async () => {
  render(<ImageGallery />);

  await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

  await waitFor(() => {
    expect(screen.getByAltText('accusamus beatae ad facilis cum similique qui sunt')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByAltText('reprehenderit est deserunt velit ipsam')).toBeInTheDocument();
  });  

  expect(screen.getByText('Show Liked Images')).toBeInTheDocument();
});

test('likes an image when like button is clicked', async () => {
  render(<ImageGallery />);

  await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

  fireEvent.click(screen.getByTestId('like-button-1'));

  expect(screen.getByTestId('like-icon-1')).toBeInTheDocument();

  expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Axios should not be called again
});

