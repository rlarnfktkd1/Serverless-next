import * as React from "react";
import { connect } from "react-redux";

interface StateProps {
  data?: any;
}

type Props = StateProps;

const Placeholder: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h1>
        JSON:
        {!!data && (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )}
      </h1>
    </div>
  );
};

export default connect(({ placeholder }: { placeholder: any }) => ({
  error: placeholder.error,
}))(Placeholder);
