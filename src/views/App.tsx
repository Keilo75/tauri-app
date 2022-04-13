import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ colorScheme: 'dark' }}
    ></MantineProvider>
  );
}

export default App;
