import React from 'react';
import { PaperProvider } from 'react-native-paper';

import StudentsList from './app/screens/StudentsList';

const App = () => {
  return (
    <PaperProvider>
      <StudentsList />
    </PaperProvider>
  );
};

export default App;
