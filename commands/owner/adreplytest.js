import {sendArticleCard} from '../../lib/wolflib.js';
export default {
  name: "adreplytest",
  aliases: ["externaladtest"],
  category: "owner",
  description: "Test VIPBOT external ad reply rendering",
  ownerOnly: true,
  async execute(_0x4a8188, _0x1ca50c) {
    const _0x426223 = _0x1ca50c.key.remoteJid;
    if (!_0x426223) return;
    await sendArticleCard(_0x4a8188, _0x426223, {
      text: "Testing VIPBOT article card with AI-bot context.",
      title: "VIPBOT Article Card",
      body: "VIPBOT · Lupin Stanley",
      url: 'https://github.com/peace-amani/norah',
      aiBot: {
        name: "VIPBOT"
      }
    }, _0x1ca50c);
  }
};
