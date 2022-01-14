import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <Suspense>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

