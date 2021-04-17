import * as React from 'react';
import { NextPage } from 'next';
import QrReaderComponent from '../src/QrReader';

const Home: NextPage = () => {
  return (
    <div>
      <QrReaderComponent />
    </div>
  );
};

export default Home;
