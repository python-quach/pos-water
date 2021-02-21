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
    return (
        <Form.Button
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
