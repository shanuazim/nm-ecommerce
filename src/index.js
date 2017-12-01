import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './vendor/ui-toolkit/css/nm-cx/main.css'
import Header from './components/common/Header'
import App from './app'

ReactDOM.render(
<div style={{margin: 20}}>
<Header title="Northwestern Mutual Store" />
<App />
</div>, 
document.getElementById('root'));
registerServiceWorker();
