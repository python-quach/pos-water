import React from 'react';

const test = ({ forwardedRef, ...props }) => (
    <as ref={forwardedRef} {...props} />
);

export default test;
