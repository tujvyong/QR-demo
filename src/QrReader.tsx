import * as React from 'react';
import dynamic from 'next/dynamic';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const delay = 500;
const QrReaderComponent = () => {
  const [state, setState] = React.useState<any>({ result: 'No result' });
  const handleError = React.useCallback((err) => {
    console.error(err);
  }, []);

  const handleScan = React.useCallback((result) => {
    console.log(result);
    setState({ result: result });
  }, []);

  const previewStyle = {
    // height: 240,
    width: '100%'
  };
  return (
    <div>
      <QrReader delay={delay} style={previewStyle} onError={handleError} onScan={handleScan} />
      <p style={{ textAlign: 'center' }}>{state.result}</p>
    </div>
  );
};

export default QrReaderComponent;
