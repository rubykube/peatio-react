'use strict';

import dva from 'dva';
import './index.css';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/formMode').default);
app.model(require('./models/auth').default);
app.model(require('./models/peatioapi').default);
app.model(require('./models/visuals').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
