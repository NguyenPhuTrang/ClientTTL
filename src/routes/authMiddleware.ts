import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorageAuthService from '../common/storages/authStorage';
import { PageName } from '../common/constants';

const useAuthMiddleware = () => {
    const navigate = useNavigate();
    const tokenExpiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    const hasToken = localStorageAuthService.getAccessToken() ? true : false;
    const isAuthenticated = tokenExpiredAt && hasToken;
    const currentPath = window.location.pathname;

    useEffect(() => {
        if (isAuthenticated && (currentPath === PageName.LOGIN_PAGE || currentPath === PageName.REGISTER_PAGE)) {
            navigate(PageName.PRODUCT_PAGE, { replace: true });
        }
        else if (!isAuthenticated && currentPath !== PageName.LOGIN_PAGE && currentPath !== PageName.REGISTER_PAGE && currentPath !== PageName.PRODUCT_PAGE) {
            // navigate(PageName.LOGIN_PAGE, { replace: true });
        }
    }, [isAuthenticated, currentPath, navigate]);
};

export default useAuthMiddleware;
