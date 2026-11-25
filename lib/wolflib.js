import {generateWAMessageFromContent, proto} from 'wolfsocket';
const DEFAULT_THUMB = "https://i.ibb.co/PGzQmvLf/silentwolf.jpg", DEFAULT_URL = "https://github.com/peace-amani/norah";
export function makeTable(_0x59ae3c, _0x361568) {
  const _0x628c77 = ['|\x20' + _0x59ae3c.join('\x20|\x20') + '\x20|', '|\x20' + _0x59ae3c.map(() => "---").join('\x20|\x20') + '\x20|', ..._0x361568.map(_0x1a147d => '|\x20' + _0x1a147d.join(" | ") + '\x20|')];
  return _0x628c77.join('\x0a');
}
export async function sendTable(_0x10ddc4, _0x52d20b, _0x562731, _0x291d2f, _0x5f0a98, _0x156f41) {
  return _0x10ddc4.sendMessage(_0x52d20b, {
    text: _0x562731 + '\x0a\x0a' + makeTable(_0x291d2f, _0x5f0a98)
  }, {
    quoted: _0x156f41
  });
}
export async function sendArticleCard(_0x4d4a42, _0x2fd53d, _0x33344e = {}, _0x5669dc) {
  const _0x5b138e = _0x33344e.thumb || _0x33344e.thumbnailUrl || DEFAULT_THUMB;
  let _0x4c27fa;
  try {
    const _0x9909a0 = await fetch(_0x5b138e);
    if (_0x9909a0.ok) _0x4c27fa = Buffer.from(await _0x9909a0.arrayBuffer());
  } catch (_0x4c756a) {
    console.warn('[VIPBOT] Could not fetch article-card thumbnail:', _0x4c756a.message);
  }
  const _0x2dc32d = {
    externalAdReply: {
      title: _0x33344e.title || "How to create and share a status",
      body: _0x33344e.body || "WhatsApp Help Center",
      mediaType: 1,
      thumbnailUrl: _0x5b138e,
      ..._0x4c27fa ? {
        thumbnail: _0x4c27fa
      } : {},
      sourceUrl: _0x33344e.url || DEFAULT_URL,
      renderLargerThumbnail: _0x33344e.renderLargerThumbnail ?? true,
      showAdAttribution: _0x33344e.showAdAttribution ?? false,
      containsAutoReply: _0x33344e.containsAutoReply ?? false
    }
  };
  return (_0x33344e.aiBot && (_0x2dc32d.forwardedAiBotMessageInfo = {
    botName: _0x33344e.aiBot.name || "VIPBOT",
    botJid: _0x33344e.aiBot.jid || _0x4d4a42.user?.id,
    creatorName: _0x33344e.aiBot.creatorName || "Lupin Stanley"
  }), _0x4d4a42.sendMessage(_0x2fd53d, {
    text: _0x33344e.text || "Learn more in these articles:",
    contextInfo: _0x2dc32d
  }, {
    quoted: _0x5669dc
  }));
}
export async function sendVideoCard(_0x225fc8, _0x1713f2, _0x2e89c6 = {}, _0x3f926d) {
  return _0x225fc8.sendMessage(_0x1713f2, {
    video: {
      url: _0x2e89c6.videoUrl
    },
    caption: _0x2e89c6.caption || _0x2e89c6.text || '',
    contextInfo: {
      externalAdReply: {
        title: _0x2e89c6.title || "VIPBOT Media",
        body: _0x2e89c6.body || 'VIPBOT · Lupin Stanley',
        mediaType: 2,
        thumbnailUrl: _0x2e89c6.thumb || DEFAULT_THUMB,
        sourceUrl: _0x2e89c6.url || DEFAULT_URL,
        renderLargerThumbnail: _0x2e89c6.renderLargerThumbnail ?? true,
        showAdAttribution: _0x2e89c6.showAdAttribution ?? false
      }
    }
  }, {
    quoted: _0x3f926d
  });
}
export async function sendCarousel(_0x21f0b5, _0x4f5ff1, _0x43d90b, _0xcbf901) {
  const _0x5994f9 = _0x43d90b.map(_0x2a8744 => proto.Message.InteractiveMessage.create({
    header: proto.Message.InteractiveMessage.Header.create({
      title: _0x2a8744.title || '',
      subtitle: _0x2a8744.body || '',
      hasMediaAttachment: false
    }),
    body: proto.Message.InteractiveMessage.Body.create({
      text: _0x2a8744.text || _0x2a8744.title || ''
    }),
    footer: proto.Message.InteractiveMessage.Footer.create({
      text: _0x2a8744.footer || "VIPBOT · Lupin Stanley"
    }),
    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
      buttons: [{
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: _0x2a8744.buttonText || "Learn More",
          url: _0x2a8744.url || DEFAULT_URL,
          merchant_url: _0x2a8744.url || DEFAULT_URL
        })
      }]
    })
  })), _0x33bb36 = generateWAMessageFromContent(_0x4f5ff1, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "Choose an option:"
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
            cards: _0x5994f9,
            messageVersion: 1
          })
        })
      }
    }
  }, {
    userJid: _0x21f0b5.user?.id,
    quoted: _0xcbf901
  });
  return _0x21f0b5.relayMessage(_0x4f5ff1, _0x33bb36.message, {
    messageId: _0x33bb36.key.id
  });
}
export async function sendChannelCard(_0x8c3fe6, _0x3656ea, _0x44a687 = {}, _0xc91fd7) {
  return sendArticleCard(_0x8c3fe6, _0x3656ea, {
    ..._0x44a687,
    text: _0x44a687.text || "Join our channel for VIPBOT updates 💎",
    title: _0x44a687.title || "VIPBOT Official Channel",
    body: _0x44a687.body || "VIPBOT • Lupin Stanley",
    url: _0x44a687.channelUrl || _0x44a687.url || DEFAULT_URL,
    showAdAttribution: _0x44a687.showAdAttribution ?? false
  }, _0xc91fd7);
}
export async function sendWolfCard(_0x1b60cb, _0x21b166, _0x5a1dd4) {
  return sendArticleCard(_0x1b60cb, _0x21b166, {
    text: "💎 *VIPBOT* — Elite Edition\nOwned & developed by Lupin Stanley.",
    title: "VIPBOT • 2000+ Commands",
    body: "VIPBOT • Lupin Stanley",
    aiBot: {
      name: "VIPBOT",
      creatorName: "Lupin Stanley"
    }
  }, _0x5a1dd4);
}
export default {
  makeTable: makeTable,
  sendTable: sendTable,
  sendArticleCard: sendArticleCard,
  sendVideoCard: sendVideoCard,
  sendCarousel: sendCarousel,
  sendChannelCard: sendChannelCard,
  sendWolfCard: sendWolfCard
};
