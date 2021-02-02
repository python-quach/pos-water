import { useEffect } from 'react';
import BuyPortal from '../Portal/Portal';

const BuyScreen = ({ api, history }) => {
    useEffect(() => {
        if (!history.location.state) {
            history.push('/dashboard');
        } else {
            console.log(history.location.state);
        }
    });

    return (
        <BuyPortal open={true}>{JSON.stringify(history, null, 2)}</BuyPortal>
    );
};

export default BuyScreen;
