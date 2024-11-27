import config from '../config';

import Home from '../pages/Home';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFoundPage from '../features/errors/pages/NotFoundPage';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.notFoundPage, component: NotFoundPage },
];


export { publicRoutes };