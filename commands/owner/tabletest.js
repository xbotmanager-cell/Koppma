export default {
  name: 'tabletest',
  aliases: ["nativetable"],
  category: "owner",
  description: 'Test\x20WhatsApp\x20native\x20markdown-table\x20rendering',
  ownerOnly: true,
  async execute(_0x2fadb2, _0x54356b) {
    const _0x4b148c = 'Native\x20table\x20rendering\x20is\x20active.\x0a\x0a|\x20Feature\x20|\x20Status\x20|\x20Details\x20|\x0a|\x20---\x20|\x20:---:\x20|\x20---\x20|\x0a|\x20Markdown\x20parser\x20|\x20✅\x20|\x20Working\x20|\x0a|\x20Native\x20rows\x20|\x20✅\x20|\x20Heading\x20and\x20data\x20rows\x20|\x0a|\x20AI\x20responses\x20|\x20✅\x20|\x20Ready\x20for\x20integration\x20|\x0a\x0aThis\x20sentence\x20should\x20render\x20below\x20the\x20table.';
    await _0x2fadb2.sendMessage(_0x54356b.key.remoteJid, {
      markdownTable: _0x4b148c,
      tableTitle: "VIPBOT Table Test"
    }, {
      quoted: _0x54356b
    });
  }
};
