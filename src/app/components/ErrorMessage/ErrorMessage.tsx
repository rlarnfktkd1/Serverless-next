import * as React from "react";

interface Props {
  message?: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => <aside>{message}</aside>;

export default ErrorMessage;
