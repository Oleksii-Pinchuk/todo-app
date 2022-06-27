import React from 'react';

type Props = {
  message: string,
};

const Error: React.FC<Props> = ({ message }) => (
  <p className="Error">{`${message}`}</p>
);

export default Error;
