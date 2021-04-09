import { Form } from 'semantic-ui-react';

export const EditButton = ({ onClick, style }) => (
    <Form.Button
        content='Edit'
        type='button'
        size='huge'
        color='vk'
        style={style}
        onClick={onClick}
    />
);

export const CancelButton = ({ onClick, style }) => (
    <Form.Button
        content='Cancel'
        type='button'
        size='huge'
        color='blue'
        style={style}
        onClick={onClick}
    />
);

export const SaveButton = ({ onClick, style, disabled }) => (
    <Form.Button
        content='Save'
        type='button'
        size='huge'
        color='google plus'
        style={style}
        disabled={disabled}
        onClick={onClick}
    />
);

export const BuyButton = ({ disabled, style }) => {
    return (
        <Form.Button
            content='Buy'
            type='submit'
            size='huge'
            style={style}
            color='green'
            disabled={disabled}
        />
    );
};

export const RenewButton = ({ style, disabled }) => (
    <Form.Button
        type='submit'
        content='Renew'
        color='facebook'
        size='huge'
        style={style}
        disabled={disabled}
    />
);

export const DoneButton = ({ onClick, disabled, style }) => {
    return (
        <Form.Button
            size='huge'
            floated='right'
            type='button'
            content='Done'
            disabled={disabled}
            style={style}
            onClick={onClick}
        />
    );
};

export const HistoryButton = ({ open, disabled, onClick, style }) => {
    return (
        <Form.Button
            type='button'
            size='huge'
            content={open ? 'Close' : 'History'}
            color={open ? 'red' : 'teal'}
            floated='right'
            style={style}
            disabled={disabled}
            onClick={onClick}
        />
    );
};

export const Button = {
    Edit: EditButton,
    Cancel: CancelButton,
    Save: SaveButton,
    Buy: BuyButton,
    Renew: RenewButton,
    Done: DoneButton,
    History: HistoryButton,
};

export default Button;
