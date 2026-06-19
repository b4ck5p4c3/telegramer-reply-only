import { Bot, webhookCallback } from 'grammy'

import { config } from '../../config'
import { handler } from './handler'

/**
 * Serves the bot using Bun's built-in HTTP server and sets up the webhook.
 */
export async function serve () {
  let readyz = false

  const bot = new Bot(
    config.TLGRMR_REPLY_ONLY__BOT_TOKEN,
    {
      client: {
        apiRoot: config.TLGRMR_REPLY_ONLY__API_ROOT,
      }
    }
  )

  const serve = Bun.serve({
    fetch: () => new Response('Not Found', { status: 404 }),
    port: config.PORT,
    routes: {
      '/healthz': async function () {
        try {
          await bot.api.getMe()
          return new Response('', { status: 200 })
        } catch {
          return new Response('', { status: 500 })
        }
      },
      '/readyz': () => new Response('', { status: readyz ? 200 : 503 }),
      '/webhook': webhookCallback(bot, 'bun')
    }
  })

  // Announce the webhook URL to Telegram if it's configured
  if (config.TLGRMR_REPLY_ONLY__PUBLIC_WEBHOOK_URL) {
    await bot.api.setWebhook(`${config.TLGRMR_REPLY_ONLY__PUBLIC_WEBHOOK_URL}/webhook`)
  }

  bot.use(handler)

  // Mark for LB that we're ready to receive traffic
  readyz = true

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    readyz = false
    await bot.api.deleteWebhook()
    await serve.stop()
    process.exit(0)
  })
}
