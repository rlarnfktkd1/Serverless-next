import { NextPage } from "next";
import * as React from "react";
import { connect } from "react-redux";
import { firebaseCloudMessaging } from "../utils/webPush.js";
import Counter from "../components/Counter/Counter";
import { increase } from "../store/counter/counter.store";
import { loadData } from "../store/placeholder/Placeholder.store";

import withApollo from "../lib/withApollo";
interface StateProps {
  data?: any;
}

interface DispatchProps {
  loadData: () => void;
  increase: () => void;
}

type Props = StateProps & DispatchProps;

const IndexPage: NextPage<Props> = ({ increase }) => {
  React.useEffect(() => {
    increase();
    firebaseCloudMessaging.init();
  }, []);
  return (
    <div>
      <Counter />
    </div>
  );
};

export default withApollo(
  connect(
    ({ placeholder }: { placeholder: any }) => ({
      data: placeholder.data,
    }),
    {
      increase,
      loadData,
    },
  )(IndexPage),
);
