import type { Command } from 'commander'

import { config } from '../../config'

export async function healthcheck () {
  const response = await fetch(`http://localhost:${config.PORT}/healthz`)
  if (response.ok) {
    process.exit(0)
  }

  throw new Error(`Healthcheck failed with status ${response.status}`)
}

export default function register (program: Command) {
  program.command('healthcheck')
    .description('Executes a healthz call. Exits with code 0 if the service is healthy, otherwise exits with code 1.')
    .action(() => healthcheck())
}
