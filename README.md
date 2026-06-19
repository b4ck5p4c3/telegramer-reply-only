# @bksp/telegramer-reply-only

[![Made with Bun](https://img.shields.io/badge/Made%20with%20Bun-f471b5?logo=bun&style=for-the-badge)](https://bun.sh)

Telegram bot for Discussion chats that warns on messages which are not replies to other messages.
Handful to keep all messages reflected in a comments of a corresponding posts.

## Setup

### Telegramer

```yaml
services:
  telegramer:
    environment:
      SUB_BOTS: http://reply-only:3000/webhook
      STUB_BOT_TOKEN: 1337008:B4CKSP4CEB4CKSP4CEB4CKSP4CEB4CKSP4C
    # ...
  reply-only:
    build:
      context: https://github.com/b4ck5p4c3/telegramer-reply-only.git
    environment:
      PORT: 3000
      TLGRMR_REPLY_ONLY__BOT_TOKEN: 1337008:B4CKSP4CEB4CKSP4CEB4CKSP4CEB4CKSP4C
      TLGRMR_REPLY_ONLY__CHATS_IDS: -1001337008000,-1001337008001
      TLGRMR_REPLY_ONLY__API_ROOT: http://telegramer:3001
    # ...
```

### Standalone

```bash
# Clone
git clone https://github.com/b4ck5p4c3/telegramer-reply-only.git

# Install deps
bun install

# Copy configuration example and adjust values
cp .env.example .env

# Run
bun start serve
```
