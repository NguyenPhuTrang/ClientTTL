import config from '../config';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFoundPage from '../features/errors/pages/NotFoundPage';
import CategoryPage from '../pages/Category';
import CartPage from '../pages/Cart';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.category, component: CategoryPage }, 
    { path: config.routes.notFoundPage, component: NotFoundPage },
    { path: '/cart', component: CartPage },
];

export { publicRoutes };
