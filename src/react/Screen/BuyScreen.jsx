import { useEffect } from 'react';

const BuyScreen = ({ history }) => {
    useEffect(() => {
        if (!history.location.state) {
            history.push('/dashboard');
        }
    });

    return (
        <div>
            <pre>{JSON.stringify(history, null, 2)}</pre>
        </div>
    );
};

export default BuyScreen;
