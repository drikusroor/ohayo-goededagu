// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import AdminDashboardLayout from './layouts/AdminDashboardLayout/AdminDashboardLayout'
import RedirectAdmin from './layouts/AdminDashboardLayout/AdminRedirect/AdminRedirect'
import BlogLayout from './layouts/BlogLayout/BlogLayout'
import BlogLoader from './layouts/BlogLayout/BlogLoader/BlogLoader'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="login">
        <Set wrap={AdminDashboardLayout}>
          <Route path="/admin" page={RedirectAdmin} name="admin" />
          <Set wrap={ScaffoldLayout} title="My Posts" titleTo="myPosts" buttonLabel="New Post" buttonTo="newPost">
            <Route path="/admin/my-posts" page={PostMyPostsPage} name="myPosts" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
            <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
            <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
            <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
            <Route path="/admin/posts" page={PostPostsPage} name="posts" />
          </Set>
          <Set wrap={ScaffoldLayout} title="ImageGalleries" titleTo="imageGalleries">
            <Route path="/admin/image-galleries/new" page={ImageGalleryNewImageGalleryPage} name="newImageGallery" />
            <Route path="/admin/image-galleries/{id:Int}/edit" page={ImageGalleryEditImageGalleryPage} name="editImageGallery" />
            <Route path="/admin/image-galleries/{id:Int}" page={ImageGalleryImageGalleryPage} name="imageGallery" />
            <Route path="/admin/image-galleries" page={ImageGalleryImageGalleriesPage} name="imageGalleries" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Comments" titleTo="comments">
            <Route path="/admin/comments/new" page={CommentNewCommentPage} name="newComment" />
            <Route path="/admin/comments/{id:Int}/edit" page={CommentEditCommentPage} name="editComment" />
            <Route path="/admin/comments/{id:Int}" page={CommentCommentPage} name="comment" />
            <Route path="/admin/comments" page={CommentCommentsPage} name="comments" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Account" titleTo="editAccount">
            <Route path="/admin/account/edit" page={AccountEditAccountPage} name="editAccount" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Email settings" titleTo="emailSettings">
            <Route path="/admin/email-settings" page={EmailSettingsPage} name="emailSettings" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Moderate Users" titleTo="userModeration">
            <Route path="/admin/user-moderation" page={UserModerationPage} name="userModeration" />
          </Set>
          <Set wrap={ScaffoldLayout} title="UserActions" titleTo="userActions">
            <Route path="/admin/user-actions/{id:Int}" page={UserActionUserActionPage} name="userAction" />
            <Route path="/admin/user-actions" page={UserActionUserActionsPage} name="userActions" />
          </Set>
        </Set>
      </Private>
      <Set wrap={BlogLayout} whileLoadingAuth={() => BlogLoader()}>
        <Private unauthenticated="login">
          <Route path="/" page={HomePage} name="home" prerender />
          <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
        </Private>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/user/{id:Int}" page={ViewProfilePage} name="viewProfile" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
