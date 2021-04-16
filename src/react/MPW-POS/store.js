import { useState, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../MPW-POS/Api';

export const StoreContext = createContext(null);
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Store = ({ children, history }) => {
    const [error, setError] = useState(false);

    const store = {
        error,
        setError,
        history,
        api,
        sleep,
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
