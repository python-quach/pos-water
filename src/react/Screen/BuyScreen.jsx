import { useEffect } from 'react';
import Portal from '../Portal/Portal';
import BuyForm from '../Form/BuyForm';

const BuyScreen = ({ api, history }) => {
    const { state } = history.location;

    const onSubmit = async (data) => {
        console.log(data);
    };

    useEffect(() => {
        if (!state) history.push('/dashboard');
    });

    return (
        <Portal
            segment={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                zIndex: 1000,
                backgroundColor: '#002b487d',
            }}
            grid={{
                // textAlign: 'center',
                style: { height: '100vh' },
                verticalAlign: 'middle',
            }}
            gridColumn={{}}>
            <BuyForm onSubmit={onSubmit} state={state} />
            {JSON.stringify(state, null, 2)}
        </Portal>
    );
};

export default BuyScreen;
