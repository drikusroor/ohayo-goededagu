import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { username: string }) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'Wachtwoord reset link is verstuurd naar het opgegeven email adres: ' +
          response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Wachtwoord vergeten" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <span className="text-sm text-slate-700">
            <b>Opgelet</b>: Er zijn af en toe problemen met het versturen van de
            reset wachtwoord link e-mails. Check je spam folder of neem contact
            op met een van de beheerders cq. reisgenoten via{' '}
            <a
              href="mailto:info@ohayo-goededagu.nl"
              className="text-blue-500 underline hover:text-blue-700"
              aria-label="E-mail"
              title="E-mail"
            >
              info@ohayo-goededagu.nl
            </a>{' '}
            als je geen e-mail ontvangt.
          </span>

          <div className="rw-segment mt-5">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Wachtwoord vergeten
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="username"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      E-mail
                    </Label>
                    <TextField
                      name="username"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={usernameRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'E-mail is vereist',
                        },
                      }}
                    />

                    <FieldError name="username" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Verstuur
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
