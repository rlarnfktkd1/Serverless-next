import * as React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Head from "next/head";
import initApollo from "../graphql/initApollo";

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component: any) {
  return Component.displayName || Component.name || "Unknown";
}

export default (ComposedComponent: any) => {
  return class WithApollo extends React.Component {
    public static displayName = `WithApollo(${getComponentDisplayName(
      ComposedComponent,
    )})`;

    public static async getInitialProps(ctx: any) {
      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {},
        },
      };

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (typeof window === "undefined") {
        const apollo: any = initApollo();

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} />
            </ApolloProvider>,
            {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query,
              },
            },
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the store
        const state = {};

        // Extract query data from the Apollo store
        serverState = {...state,
                       apollo: { data: apollo.cache.extract() }};
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }
    public apollo: any;

    constructor(props: any) {
      super(props);
      this.apollo = initApollo(props.serverState.apollo.data);
    }

    public render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
