import { z } from 'zod'

const ConfigSchema = z.object({
  PORT: z.coerce.number().transform((input, context) => {
    const port = Number(input)
    if (Number.isNaN(port) || port < 1 || port > 65_535) {
      context.addIssue({
        code: 'custom',
        message: 'PORT must be a valid number between 1 and 65535'
      })
      return z.NEVER
    }
    return port
  }).default(3000),
  TLGRMR_REPLY_ONLY__API_ROOT: z.url().default('https://api.telegram.org'),
  TLGRMR_REPLY_ONLY__BOT_TOKEN: z.string().min(1),
  TLGRMR_REPLY_ONLY__CHATS_IDS: z.string().transform((input, context) => {
    const ids = input.split(',').map((s) => s.trim())
    if (ids.some((id) => !/^-?\d+$/.test(id))) {
      context.addIssue({
        code: 'custom',
        message: 'TLGRMR_REPLY_ONLY__CHATS_IDS must be a comma-separated list of numeric IDs'
      })
      return z.NEVER
    }
    return ids
  }),
  TLGRMR_REPLY_ONLY__PUBLIC_WEBHOOK_URL: z.url().optional()
})

export type Config = z.infer<typeof ConfigSchema>

export const config = ConfigSchema.parse(process.env)
