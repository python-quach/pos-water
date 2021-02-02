import { useEffect } from 'react';
import BuyPortal from '../Portal/Portal';

const BuyScreen = ({ api, history }) => {
    const { state } = history.location;

    useEffect(() => {
        if (!state) history.push('/dashboard');
    });

    return (
        <BuyPortal open={true}>{JSON.stringify(history, null, 2)}</BuyPortal>
    );
};

export default BuyScreen;
