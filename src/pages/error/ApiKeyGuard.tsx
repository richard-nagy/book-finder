import { googleBooksApiKey } from '@/lib/constants';
import { Page } from '@/lib/types';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ApiKeyGuard: FC = () => {
    if (!googleBooksApiKey) {
        return <Navigate to={Page.noApiKey} replace />;
    }

    return <Outlet />;
};

export default ApiKeyGuard;