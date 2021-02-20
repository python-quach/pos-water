import RenewReceipt from './RenewReceipt';
import BuyReceipt from './BuyReceipt';
import NewReceipt from './NewReceipt';

const Receipt = ({ receipt, setOpenReceipt }) => {
    if (receipt.renew)
        return (
            <RenewReceipt receipt={receipt} setOpenReceipt={setOpenReceipt} />
        );
    if (receipt.buy && receipt.buy !== '0')
        return <BuyReceipt receipt={receipt} setOpenReceipt={setOpenReceipt} />;
    return <NewReceipt receipt={receipt} />;
};

export default Receipt;
