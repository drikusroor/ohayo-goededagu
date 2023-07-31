import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    setIsLoggingIn(true)
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welkom terug!')
    }

    setIsLoggingIn(false)
  }

  return (
    <>
      <MetaTags title="Inloggen" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container mt-0">
          <h3 className="group select-none overflow-hidden rounded text-2xl font-bold leading-6">
            <span className="inline-block py-3 pl-3 text-cobalt-blue-500 transition-colors duration-300 ease-in-out group-hover:bg-cobalt-blue-500 group-hover:text-white">
              Wel
            </span>
            <span className="inline-block py-3 pr-3 text-monza-red-500 transition-colors duration-300 ease-in-out group-hover:bg-monza-red-500 group-hover:text-white">
              kom!
            </span>
          </h3>
          <p className="text-sm text-slate-700">
            Je moet eerst inloggen om de inhoud van deze blog te kunnen
            aanschouwen.
          </p>

          <p className="mt-3 text-sm text-slate-700">
            Als je nog geen account hebt, kun je je{' '}
            <Link
              to={routes.signup()}
              className="text-sky-500 underline hover:text-sky-600"
            >
              hier
            </Link>{' '}
            registreren. Wij zullen je aanvraag zo snel mogelijk controleren en
            verwerken. De controle is bedoeld om te voorkomen dat er ongewenste
            bezoekers op de blog komen.
          </p>

          <div className="rw-segment mt-5">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Inloggen</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Gebruikersnaam
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Gebruikersnaam is vereist',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Wachtwoord
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Wachtwoord is vereist',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
                      Wachtwoord vergeten?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit
                      className={`rw-button rw-button-blue ${
                        isLoggingIn
                          ? 'animate-bounce cursor-wait opacity-50'
                          : ''
                      }`}
                      disabled={isLoggingIn}
                    >
                      Inloggen
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Heb je nog geen account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Registreer
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
