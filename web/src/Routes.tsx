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

const BlogLoader = () => <BlogLayout skeleton />

const Routes = () => {
  const { currentUser } = useAuth()

  const requiredRolesAdminPosts = ['ADMIN', 'MODERATOR']
  const adminRedirect = currentUser?.roles.some((role) => requiredRolesAdminPosts.includes(role)) ? '/admin/posts' : '/admin/profile/self'

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
          <Set wrap={ScaffoldLayout} title="My Posts" titleTo="myPosts" buttonLabel="New Post" buttonTo="newPost">
            <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
            <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
            <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
            <Route path="/admin/my-posts" page={PostMyPostsPage} name="myPosts" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Profile" titleTo="profileSelf" buttonLabel="New Profile" buttonTo="newProfile">
            <Route path="/admin/profile/new" page={ProfileNewProfilePage} name="newProfile" />
            <Route path="/admin/profile/self" page={ProfileProfileSelfPage} name="profileSelf" />
            <Route path="/admin/profile/self/edit" page={ProfileEditProfilePage} name="editProfile" />
            <Route path="/admin/profile/{id:Int}" page={ProfileProfilePage} name="profile" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Account" titleTo="account">
            <Route path="/admin/account/edit" page={AccountEditAccountPage} name="editAccount" />
            <Route path="/admin/account" page={AccountAccountPage} name="account" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Moderate Users" titleTo="userModeration">
            <Route path="/user-moderation" page={UserModerationPage} name="userModeration" />
          </Set>
        </Set>
      </Private>
      <Set wrap={BlogLayout} whileLoadingAuth={() => BlogLoader()}>
        <Private unauthenticated="login">
          <Route path="/" page={HomePage} name="home" prerender />
          <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
          <Route path="/vlog" page={VlogPage} name="vlog" />
        </Private>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
