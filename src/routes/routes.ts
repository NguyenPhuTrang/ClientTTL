import config from '../config';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFoundPage from '../features/errors/pages/NotFoundPage';
import CategoryPage from '../pages/Category';
import CartPage from '../pages/Cart';
import CheckoutPage from '../pages/Checkout';
import { PaymentCancelPage, PaymentSuccessPage } from '../pages/PaymentResult';
import { Navigate } from 'react-router-dom';

function RedirectToLogin() {
    return Navigate({ to: '/login', replace: true });
}

const publicRoutes = [
    { path: '/', component: RedirectToLogin },
    { path: config.routes.login, component: Login },
    { path: config.routes.product, component: Product },
    { path: config.routes.register, component: Register },
    { path: config.routes.category, component: CategoryPage },
    { path: config.routes.notFoundPage, component: NotFoundPage },
    { path: '/cart', component: CartPage },
    { path: '/checkout', component: CheckoutPage },
    { path: '/payment/success', component: PaymentSuccessPage },
    { path: '/payment/cancel', component: PaymentCancelPage },
];

export { publicRoutes };