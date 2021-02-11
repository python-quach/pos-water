import RenewReceipt from './RenewReceipt';
import BuyReceipt from './BuyReceipt';
import NewReceipt from './NewReceipt';

const Receipt = ({ receipt }) => {
    if (receipt.renew) return <RenewReceipt receipt={receipt} />;
    if (receipt.buy) return <BuyReceipt receipt={receipt} />;
    return <NewReceipt receipt={receipt} />;
};

export default Receipt;
