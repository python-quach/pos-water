import Account from './Account';
import AreaCode from './AreaCode';
import BuyGallon from './BuyGallon';
import Date from './Date';
import Fee from './Fee';
import GallonRemain from './GallonRemain';
import MemberSince from './MemberSince';
import Name from './Name';
import Phone from './Phone';
import PreviousGallon from './PreviousGallon';
import Record from './Record';
import RenewAmount from './RenewAmount';
import Time from './Time';
import FirstName from './FirstName';
import LastName from './LastName';
import Fullname from './Fullname';

export const Field = {
    FirstName,
    LastName,
    Account,
    AreaCode,
    Buy: BuyGallon,
    Date,
    Fee,
    Remain: GallonRemain,
    Since: MemberSince,
    Name,
    Phone,
    Previous: PreviousGallon,
    Record,
    Renew: RenewAmount,
    Time,
    Fullname,
};

export default Field;
