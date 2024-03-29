import type { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { DbAuthHandler, DbAuthHandlerOptions } from '@redwoodjs/auth-dbauth-api'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { emailFooter, emailFooterAsText } from 'src/lib/email/footer'

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  const forgotPasswordOptions: DbAuthHandlerOptions['forgotPassword'] = {
    // handler() is invoked after verifying that a user was found with the given
    // username. This is where you can send the user an email with a link to
    // reset their password. With the default dbAuth routes and field names, the
    // URL to reset the password will be:
    //
    // https://example.com/reset-password?resetToken=${user.resetToken}
    //
    // Whatever is returned from this function will be returned from
    // the `forgotPassword()` function that is destructured from `useAuth()`
    // You could use this return value to, for example, show the email
    // address in a toast message so the user will know it worked and where
    // to look for the email.
    handler: async (user) => {
      let userName = user.profile?.name
        ? user.profile.name
        : user.name
        ? user.name
        : 'bezoeker'

      // capitalize
      userName = userName.charAt(0).toUpperCase() + userName.slice(1)

      // Send email to user with password reset link
      sendEmail({
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Beste ${userName},</p><p>Je hebt een verzoek gedaan om je wachtwoord te resetten. Klik op de link om je wachtwoord te resetten: <a href="https://ohayo-goededagu.nl/reset-password?resetToken=${user.resetToken}">Reset Password</a>. Als de link niet werkt, kopieer dan het volgende adres naar je browser: https://ohayo-goededagu.nl/reset-password?resetToken=${user.resetToken}</p>

        <p>Als je geen verzoek hebt gedaan om je wachtwoord te resetten, dan kun je deze email negeren.</p>

        <p>Mocht je nog vragen hebben, dan kun je altijd contact met ons opnemen.</p>

        ${emailFooter}
        `,

        text: `Beste ${userName},

Je hebt een verzoek gedaan om je wachtwoord te resetten.

Klik op de link om je wachtwoord te resetten: https://ohayo-goededagu.nl/reset-password?resetToken=${user.resetToken}

Als je geen verzoek hebt gedaan om je wachtwoord te resetten, dan kun je deze email negeren.

Mocht je nog vragen hebben, dan kun je altijd contact met ons opnemen.

${emailFooterAsText}
`,
      })

      await db.userAction.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          targetId: user.resetToken ? user.resetToken.slice(-4) : '',
          action: 'FORGOT_PASSWORD',
        },
      })

      return user
    },

    // How long the resetToken is valid for, in seconds (default is 24 hours)
    expires: 60 * 60 * 24,

    errors: {
      // for security reasons you may want to be vague here rather than expose
      // the fact that the email address wasn't found (prevents fishing for
      // valid email addresses)
      usernameNotFound: 'Username not found',
      // if the user somehow gets around client validation
      usernameRequired: 'Username is required',
    },
  }

  const loginOptions: DbAuthHandlerOptions['login'] = {
    // handler() is called after finding the user that matches the
    // username/password provided at login, but before actually considering them
    // logged in. The `user` argument will be the user in the database that
    // matched the username/password.
    //
    // If you want to allow this user to log in simply return the user.
    //
    // If you want to prevent someone logging in for another reason (maybe they
    // didn't validate their email yet), throw an error and it will be returned
    // by the `logIn()` function from `useAuth()` in the form of:
    // `{ message: 'Error message' }`
    handler: async (user) => {
      await db.userAction.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          action: 'LOGIN',
        },
      })

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastLoginAt: new Date(),
        },
      })

      return user
    },

    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: 'Username ${username} not found',
      // For security reasons you may want to make this the same as the
      // usernameNotFound error so that a malicious user can't use the error
      // to narrow down if it's the username or password that's incorrect
      incorrectPassword: 'Incorrect password for ${username}',
    },

    // How long a user will remain logged in, in seconds
    expires: 60 * 60 * 24 * 365 * 10,
  }

  const resetPasswordOptions: DbAuthHandlerOptions['resetPassword'] = {
    // handler() is invoked after the password has been successfully updated in
    // the database. Returning anything truthy will automatically log the user
    // in. Return `false` otherwise, and in the Reset Password page redirect the
    // user to the login page.
    handler: (_user) => {
      return true
    },

    // If `false` then the new password MUST be different from the current one
    allowReusedPassword: true,

    errors: {
      // the resetToken is valid, but expired
      resetTokenExpired: 'resetToken is expired',
      // no user was found with the given resetToken
      resetTokenInvalid: 'resetToken is invalid',
      // the resetToken was not present in the URL
      resetTokenRequired: 'resetToken is required',
      // new password is the same as the old password (apparently they did not forget it)
      reusedPassword: 'Must choose a new password',
    },
  }

  const signupOptions: DbAuthHandlerOptions['signup'] = {
    // Whatever you want to happen to your data on new user signup. Redwood will
    // check for duplicate usernames before calling this handler. At a minimum
    // you need to save the `username`, `hashedPassword` and `salt` to your
    // user table. `userAttributes` contains any additional object members that
    // were included in the object given to the `signUp()` function you got
    // from `useAuth()`.
    //
    // If you want the user to be immediately logged in, return the user that
    // was created.
    //
    // If this handler throws an error, it will be returned by the `signUp()`
    // function in the form of: `{ error: 'Error message' }`.
    //
    // If this returns anything else, it will be returned by the
    // `signUp()` function in the form of: `{ message: 'String here' }`.
    handler: async ({ username, hashedPassword, salt, userAttributes }) => {
      const newUser = await db.user.create({
        data: {
          email: username.toLowerCase(),
          hashedPassword: hashedPassword,
          salt: salt,
          profile: {
            create: {
              name: userAttributes.name,
            },
          },
        },
      })

      await db.userAction.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
          action: 'SIGNUP',
        },
      })

      await sendEmail({
        to: 'info@ohayo-goededagu.nl',
        subject: 'Een nieuwe gebruiker heeft zich geregistreerd',
        html: `<p>Er heeft zich een nieuwe gebruiker geregistreerd op de website.</p>

        <p>Gebruiker: ${newUser.email}</p>
        <p>Naam: ${newUser.profile?.name || 'Geen naam opgegeven'}</p>

        <p>Ga naar de <a href="https://ohayo-goededagu.nl/admin/user-moderation">gebruikersmoderatie</a> om de gebruiker te activeren.</p>

        ${emailFooter}
        `,
        text: `Er heeft zich een nieuwe gebruiker geregistreerd op de website.

Gebruiker: ${newUser.email}
Naam: ${newUser.profile?.name || 'Geen naam opgegeven'}

Ga naar de https://ohayo-goededagu.nl/admin/user-moderation om de gebruiker te activeren.

${emailFooterAsText}
`,
      })

      await sendEmail({
        to: newUser.email,
        subject: 'Welkom bij Ohayo Goededagu',
        html: `<p>Beste ${newUser.profile?.name || 'bezoeker'},</p>

        <p>Welkom bij Ohayo Goededagu. Je kunt nu inloggen op de website. Wel kijken we nog even wie je bent voordat we je toegang geven tot de commentsectie.</p>

        <p>Vergeet niet om je profiel aan te vullen zodat andere gebruikers weten wie je bent. Ga daarvoor naar <a href="https://ohayo-goededagu.nl/admin/account/edit">je account instellingen</a>.</p>

        <p>Als je nog vragen hebt, dan kun je altijd contact met ons opnemen.</p>

        ${emailFooter}
        `,
        text: `Beste ${newUser.profile?.name || 'bezoeker'},

Welkom bij Ohayo Goededagu. Je kunt nu inloggen op de website. Wel kijken we nog even wie je bent voordat we je toegang geven tot de commentsectie.

Vergeet niet om je profiel aan te vullen zodat andere gebruikers weten wie je bent. Ga daarvoor naar https://ohayo-goededagu.nl/admin/account/edit.

Als je nog vragen hebt, dan kun je altijd contact met ons opnemen.

${emailFooterAsText}
`,
      })

      return newUser
    },

    // Include any format checks for password here. Return `true` if the
    // password is valid, otherwise throw a `PasswordValidationError`.
    // Import the error along with `DbAuthHandler` from `@redwoodjs/api` above.
    passwordValidation: (_password) => {
      return true
    },

    errors: {
      // `field` will be either "username" or "password"
      fieldMissing: '${field} is required',
      usernameTaken: 'Username `${username}` already in use',
    },
  }

  const authHandler = new DbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,

    // The name of the property you'd call on `db` to access your user table.
    // i.e. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',

    // A map of what dbAuth calls a field to what your database calls it.
    // `id` is whatever column you use to uniquely identify a user (probably
    // something like `id` or `userId` or even `email`)
    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
    },

    // Specifies attributes on the cookie that dbAuth sets in order to remember
    // who is logged in. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    cookie: {
      HttpOnly: true,
      Path: '/',
      SameSite: 'Strict',
      Secure: process.env.NODE_ENV !== 'development',

      // If you need to allow other domains (besides the api side) access to
      // the dbAuth session cookie:
      // Domain: 'example.com',
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,
  })

  return await authHandler.invoke()
}
