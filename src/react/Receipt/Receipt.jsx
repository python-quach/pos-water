import RenewReceipt from './RenewReceipt';
import BuyReceipt from './BuyReceipt';
import NewReceipt from './NewReceipt';

const Receipt = ({ receipt, setOpenReceipt, openReceipt }) => {
    if (receipt.renew)
        return (
            <RenewReceipt
                receipt={receipt}
                openReceipt={openReceipt}
                setOpenReceipt={setOpenReceipt}
            />
        );
    if (receipt.buy && receipt.buy !== '0')
        return (
            <BuyReceipt
                receipt={receipt}
                setOpenReceipt={setOpenReceipt}
                openReceipt={openReceipt}
            />
        );
    return (
        <NewReceipt
            receipt={receipt}
            // openReceipt={openReceipt}
            setOpenReceipt={setOpenReceipt}
        />
    );
};

export default Receipt;
