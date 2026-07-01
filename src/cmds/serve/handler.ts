import type { Message } from 'grammy/types'

import { Composer } from 'grammy'

import { config } from '../../config'

/**
 * List of Bot API Updates' traits which we consider
 * as "service" messages we don't need to reply to.
 */
const IGNORED_MESSAGE_TRAITS = new Set<keyof Message>([
  'boost_added',
  'chat_background_set',
  'chat_owner_changed',
  'chat_owner_left',
  'delete_chat_photo',
  'left_chat_member',
  'new_chat_members',
  'new_chat_photo',
  'video_chat_ended',
  'video_chat_participants_invited',
  'video_chat_scheduled',
  'video_chat_started'
])

const chatsIds = new Set(config.TLGRMR_REPLY_ONLY__CHATS_IDS.map(Number))

export const handler = new Composer()

handler.on('message', context => {
  if (!chatsIds.has(context.msg.chat.id)) {
    return
  }

  if (context.msg.reply_to_message || context.msg.is_automatic_forward) {
    return
  }

  // Check whether this update is a service message we shouldn't care about.
  const updateTraits = Object.keys(context.msg) as (keyof Message)[]
  if (updateTraits.some(trait => IGNORED_MESSAGE_TRAITS.has(trait))) {
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
