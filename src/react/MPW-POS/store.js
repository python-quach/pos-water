import { useState, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../MPW-POS/Api';

export const StoreContext = createContext(null);

const Store = ({ children, history }) => {
    const [error, setError] = useState(false);

    const store = {
        error,
        setError,
        history,
        api,
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
