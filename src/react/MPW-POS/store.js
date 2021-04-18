import { useState, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { channels } from '../../shared/constants';
import api from '../MPW-POS/api';

export const StoreContext = createContext(null);
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};
export const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 9) return onlyNums;
    return onlyNums.slice(0, 9);
};

const Store = ({ children, history }) => {
    const [error, setError] = useState(false);

    const store = {
        error,
        setError,
        history,
        api,
        sleep,
        channels,
        normalize: {
            phone: normalizePhone,
            account: normalizeAccount,
        },
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
