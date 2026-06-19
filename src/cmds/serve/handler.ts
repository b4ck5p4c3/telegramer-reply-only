import { Composer } from 'grammy'

import { config } from '../../config'

const chatsIds = new Set(config.TLGRMR_REPLY_ONLY__CHATS_IDS.map(Number))

export const handler = new Composer()

handler.on('message', context => {
  if (!chatsIds.has(context.msg.chat.id)) {
    return
  }

  if (context.msg.reply_to_message) {
    return
  }

  context.reply(
    '<b>Your message wasn\'t added as a comment.</b>\n\nReply to the message you want to comment on, then resend. Otherwise, it won\'t be reflected in the comments section.\n\n🖤',
    {
      parse_mode: 'HTML',
      reply_parameters: {
        message_id: context.msg.message_id
      }
    }
  )
})
