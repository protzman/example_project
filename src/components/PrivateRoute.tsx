import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: any;
  authorized: boolean;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, authorized, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authorized ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
}
