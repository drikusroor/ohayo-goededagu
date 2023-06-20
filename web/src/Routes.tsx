// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private, Redirect } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import AdminDashboardLayout from './layouts/AdminDashboardLayout/AdminDashboardLayout'
import BlogLayout from './layouts/BlogLayout/BlogLayout'

const Routes = () => {
  const { currentUser } = useAuth()

  const adminRedirect = currentUser?.roles.includes('ADMIN') ? '/admin/posts' : '/admin/profile/self'

  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="login">
        <Set wrap={AdminDashboardLayout}>
          <Route path="/admin" page={() => <Redirect to={adminRedirect} />} name="admin" />
          <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
            <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
            <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
            <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
            <Route path="/admin/posts" page={PostPostsPage} name="posts" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Profile" titleTo="profileSelf" buttonLabel="New Profile" buttonTo="newProfile">
            <Route path="/admin/profile/new" page={ProfileNewProfilePage} name="newProfile" />
            <Route path="/admin/profile/self" page={ProfileProfileSelfPage} name="profileSelf" />
            <Route path="/admin/profile/self/edit" page={ProfileEditProfilePage} name="editProfile" />
            <Route path="/admin/profile/{id:Int}" page={ProfileProfilePage} name="profile" />
          </Set>
        </Set>
      </Private>
      <Set wrap={BlogLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/account" page={AccountPage} name="account" />
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
