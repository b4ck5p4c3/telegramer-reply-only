import type { Command } from 'commander'

import { serve } from './serve'

export default function register (program: Command) {
  program.command('serve')
    .description('Starts the server.')
    .action(() => serve())
}
