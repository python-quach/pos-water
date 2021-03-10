import { Form } from 'semantic-ui-react';

const HistoryButton = ({
    open,
    setOpenPortal,
    api,
    setRecord,
    data,
    offset,
    edit,
    size,
}) => {
    // console.log('LOOK HERE:', { data });
    return (
        <Form.Button
            style={{ width: '160px', marginRight: '15px' }}
            size={size}
            content={open ? 'Close' : 'History'}
            color={open ? 'red' : 'teal'}
            disabled={edit}
            floated='right'
            type='button'
            onClick={() => {
                setOpenPortal((prev) => !prev);
                api.history(
                    {
                        account: data.account,
                        limit: 10,
                        offset: offset,
                        phone: data.account,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        memberSince: data.memberSince,
                    },
                    (response) => {
                        setRecord(response);
                    }
                );
            }}
        />
    );
};

export default HistoryButton;
