import { Navigate } from "react-router-dom"

function ForbiddenPage({ logout }) {
  return (
    <div>
      User not allowed to access this page. Maybe <a href="#" onClick={logout}>logout</a> and login again as authorised user.
    </div>
  )
}

export function withAuthenticatedContext(Component, scope) {
  return function ComponentWithAuthContext({ authenticatedUser, setAuthenticatedUser, ...restProps }) {
    if (!authenticatedUser) {
      return <Navigate to='/login' />
    }

    if (!authenticatedUser.scopes.includes(scope)) {
      return <ForbiddenPage logout={() => setAuthenticatedUser(null)} />
    }

    return <Component {...restProps} />
  }
}