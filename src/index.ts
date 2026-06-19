#!/usr/bin/env bun

import { Command } from 'commander'

import registerHealthcheck from './cmds/healthcheck'
import registerServe from './cmds/serve'

const program = new Command()

program
  .name('telegramer-reply-only')
  .version(process.env.npm_package_version ?? '0.0.0')

registerHealthcheck(program)
registerServe(program)

program.parse()
