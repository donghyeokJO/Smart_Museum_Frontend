import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function AdminRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('is_staff') === 'true' ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                    />
                )
            }
        />
    )
}

export default AdminRoute;