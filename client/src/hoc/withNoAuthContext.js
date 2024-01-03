import { Navigate, useNavigate } from "react-router-dom"

function PublicPageInfo({ logout }) {
  const navigate = useNavigate();
  return (
    <div>
      User is already logged in but not authorised to view dashboard. Maybe try  <a href="#" onClick={logout}>logout</a> and login as authoorised user.
    </div>
  )
}

export function withNoAuthContext(Component) {
  return function ComponentWithoutAuthContext({ authenticatedUser, setAuthenticatedUser, ...restProps }) {
    if (authenticatedUser && !authenticatedUser.scopes.includes('dashboard')) {
      return <PublicPageInfo logout={() => setAuthenticatedUser(null)} />
    }

    return <Navigate to='/dashboard' />;
  }
}