import RenewReceipt from './RenewReceipt';
import BuyReceipt from './BuyReceipt';

const Receipt = ({ receipt }) => {
    if (receipt.renew) return <RenewReceipt receipt={receipt} />;
    if (receipt.buy) return <BuyReceipt receipt={receipt} />;
    return null;
};

export default Receipt;
