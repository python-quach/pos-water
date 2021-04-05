import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Divider, Transition } from 'semantic-ui-react';

export const LoginForm = (onSubmit, iconColor, errorMessage, visible) => (
    <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Field
                    name='username'
                    render={({ input }) => (
                        <Form.Input
                            id='username'
                            placeholder='username'
                            className={iconColor}
                            type='text'
                            size='massive'
                            icon='user circle'
                            iconPosition='left'
                            autoComplete='off'
                            spellCheck='false'
                            focus
                            fluid
                            transparent
                            inverted
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                        />
                    )}
                />
                <Field
                    name='password'
                    render={({ input }) => (
                        <Form.Input
                            id='password'
                            placeholder='password'
                            className={iconColor}
                            type='password'
                            size='massive'
                            icon='lock'
                            iconPosition='left'
                            focus
                            fluid
                            transparent
                            inverted
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                        />
                    )}
                />
                <Divider hidden />
                {!errorMessage ? (
                    <Form.Button
                        type='submit'
                        id='LoginButton'
                        content='Login'
                        className='LoginButton'
                        size='huge'
                        color='blue'
                        icon='sign in'
                        labelPosition='right'
                        primary
                        circular
                        fluid
                        disabled={!values.username || !values.password}
                    />
                ) : (
                    <Transition
                        animation='shake'
                        duration={500}
                        visible={visible}
                        unmountOnHide={true}>
                        <Form.Button
                            content='Invalid Login'
                            circular
                            fluid
                            size='huge'
                            id='LoginButton'
                            color='red'
                            icon='warning sign'
                            labelPosition='right'
                        />
                    </Transition>
                )}
                <Form.Button
                    type='button'
                    content='Admin'
                    size='huge'
                    icon='database'
                    labelPosition='right'
                    circular
                    color='yellow'
                    fluid
                    onClick={() => {
                        setOpenDashboard(false);
                        setOpenAdminPassword(true);
                    }}
                />
                <Form.Group widths={2}>
                    <Form.Button
                        content='Close'
                        type='button'
                        className='LoginButton'
                        size='huge'
                        icon='close'
                        color='black'
                        circular
                        fluid
                        onClick={handleCloseApplication}
                    />
                    <Form.Button
                        content={fileSave}
                        type='button'
                        className='LoginButton'
                        color='pink'
                        size='huge'
                        icon='save'
                        fluid
                        circular
                        loading={loading}
                        onClick={handleBackupDatabase}
                    />
                </Form.Group>
            </Form>
        )}
    />
);
