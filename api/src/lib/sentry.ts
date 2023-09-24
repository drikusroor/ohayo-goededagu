import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

Sentry.init({
  dsn: 'https://0a31bfc51a00df59a4436abeeb6915f4@o4505913207160832.ingest.sentry.io/4505913211748352',
  integrations: [new ProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 0.2, // Capture 100% of the transactions, reduce in production!
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 0.2, // Capture 100% of the transactions, reduce in production!
})
