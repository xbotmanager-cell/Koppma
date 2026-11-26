import {jidNormalizedUser} from 'wolfsocket';
import {UTILITY, ANIME, BRAND, CHANNEL, CONTENT, DESIGN, ECONOMY, GAMES, MEDIA, SOCIAL, STATUS, UI} from '../../lib/emojis.js';
function normalizeParticipantJid(_0x2f3cdf) {
  if (typeof _0x2f3cdf === "string") return _0x2f3cdf;
  return _0x2f3cdf.id || _0x2f3cdf.jid || _0x2f3cdf.userJid || _0x2f3cdf.participant || _0x2f3cdf.user || '';
}
function extractNumberFromJid(_0x54d53c) {
  if (!_0x54d53c) return null;
  if (_0x54d53c.includes("@lid")) return null;
  const _0x14655d = _0x54d53c.split('@')[0].replace(/[^0-9]/g, '');
  if (!_0x14655d || _0x14655d.length < 7 || _0x14655d.length > 15) return null;
  return _0x14655d;
}
function resolveRealNumber(_0x239718, _0x52f02e) {
  if (_0x239718.phoneNumber) {
    const _0x4d086b = String(_0x239718.phoneNumber).replace(/[^0-9]/g, '');
    if (_0x4d086b.length >= 7) return _0x4d086b;
  }
  const _0x239191 = normalizeParticipantJid(_0x239718), _0x1e06b5 = extractNumberFromJid(_0x239191);
  if (_0x1e06b5) return _0x1e06b5;
  if (_0x239718.lid || _0x239191 && _0x239191.includes('@lid')) {
    const _0x2096d1 = _0x239718.lid || _0x239191;
    try {
      if (_0x52f02e?.signalRepository?.lidMapping?.getPNForLID) {
        const _0x186a0f = _0x52f02e.signalRepository.lidMapping.getPNForLID(_0x2096d1);
        if (_0x186a0f) {
          const _0x49aa11 = String(_0x186a0f).split('@')[0].replace(/[^0-9]/g, '');
          if (_0x49aa11.length >= 7) return _0x49aa11;
        }
      }
    } catch {}
  }
  return null;
}
function getDisplayName(_0x517279, _0x3b0ebc) {
  if (_0x517279.notify) return _0x517279.notify;
  if (_0x517279.name) return _0x517279.name;
  if (_0x517279.verifiedName) return _0x517279.verifiedName;
  if (_0x517279.pushName) return _0x517279.pushName;
  const _0x8c5654 = normalizeParticipantJid(_0x517279), _0x6acc1d = _0x8c5654 ? _0x8c5654.split(':')[0].split('@')[0] : null;
  if (_0x6acc1d && global.contactNames && global.contactNames.has(_0x6acc1d)) return global.contactNames.get(_0x6acc1d);
  if (_0x6acc1d && _0x3b0ebc?.store?.contacts) {
    const _0x1cf7fa = _0x3b0ebc.store.contacts[_0x8c5654] || _0x3b0ebc.store.contacts[_0x6acc1d + "@s.whatsapp.net"];
    if (_0x1cf7fa) return _0x1cf7fa.notify || _0x1cf7fa.name || _0x1cf7fa.pushName || _0x1cf7fa.verifiedName || null;
  }
  return null;
}
const RANDOM_EMOJIS = ['' + BRAND.WOLF, '' + STATUS.FIRE, '' + BRAND.LIGHTNING, '' + DESIGN.CRYSTAL, '' + STATUS.NEW, '' + STATUS.SPARKLE, '' + UI.TARGET, '' + CHANNEL.U1F981, '' + DESIGN.DRAGON, '' + UTILITY.MOON, '' + DESIGN.MENU_GLOW, UTILITY.DAGGER + '️', SOCIAL.SHIELD + '️', '' + SOCIAL.CROWN, '' + UI.MASK, '' + UI.SWIRL, '' + DESIGN.ICE_GLOW, '' + DESIGN.MAGIC, '' + UTILITY.NAZAR, UTILITY.SNOW + '️', '' + DESIGN.AQUA, '' + UTILITY.CLOVER, '' + MEDIA.EAGLE, '' + CONTENT.PYTHON, '' + CHANNEL.U1F98A, '' + BRAND.PAW, '' + ECONOMY.SKULL, '' + ANIME.U1F3AA, '' + UTILITY.BLACK_FLAG, '' + STATUS.STAR, '' + ANIME.U1F338, '' + ANIME.U1F98B, '' + UTILITY.TRIDENT, UTILITY.MILITARY_MEDAL + '️', '' + GAMES.TROPHY, '' + UTILITY.EXPLOSION, '' + DESIGN.GRADIENT, '' + GAMES.DEALER, '' + UTILITY.FIRECRACKER, '' + GAMES.CARD, '' + CHANNEL.U1F987, '' + UTILITY.DRAGON_FACE, '' + UTILITY.SHARK, '' + UTILITY.SCORPION, UTILITY.SPIDER + '️', '' + UTILITY.PENGUIN, '' + CHANNEL.U1F98C, '' + UTILITY.LIZARD, '' + UTILITY.CROCODILE, '' + UTILITY.OWL];
function getRandomEmoji() {
  return RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
}
function escapeVcf(_0x176786) {
  if (!_0x176786) return '';
  return _0x176786.replace(/[\\;,]/g, _0x4def3f => '\x5c' + _0x4def3f);
}
export default {
  name: "vcf",
  alias: ["groupvcf", "groupcontacts", 'savecontacts'],
  category: 'utility',
  description: "Creates a VCF contact file with VIPBOT branded names and random emojis",
  groupOnly: true,
  async execute(_0xd929e8, _0x4bba2c, _0xa05e78, _0x2ec39f, _0x4af52a) {
    const _0x25893e = _0x4bba2c.key.remoteJid, _0x141080 = _0x4bba2c.key.participant || _0x4bba2c.key.remoteJid, _0x17bc3d = jidNormalizedUser(_0x141080);
    try {
      const _0x7ee9a4 = await _0xd929e8.groupMetadata(_0x25893e), _0x3b2f59 = _0x7ee9a4.participants.find(_0x4bead2 => {
        const _0x3ca621 = normalizeParticipantJid(_0x4bead2);
        try {
          return jidNormalizedUser(_0x3ca621) === _0x17bc3d;
        } catch {
          return false;
        }
      }), _0x554c01 = _0x3b2f59?.admin === "admin" || _0x3b2f59?.admin === 'superadmin';
      if (!_0x554c01 && !_0x4af52a?.jidManager?.isOwner(_0x4bba2c)) return _0xd929e8.sendMessage(_0x25893e, {
        text: STATUS.ERROR + " *Admin Only Command*\nYou need to be admin to use this command."
      }, {
        quoted: _0x4bba2c
      });
      const _0x5e701f = _0xa05e78.join('\x20').trim() || '', _0x534f22 = _0x5e701f || "VIPBOT", _0x293cd8 = _0x7ee9a4.participants || [], _0x1e4be9 = _0x7ee9a4.subject || 'Group';
      let _0x4e231b = '', _0x4a305b = 0, _0x31dd4b = 0;
      for (const _0x2453e6 of _0x293cd8) {
        const _0x3a2506 = resolveRealNumber(_0x2453e6, _0xd929e8);
        if (!_0x3a2506) {
          _0x31dd4b++;
          continue;
        }
        _0x4a305b++;
        const _0x529019 = getRandomEmoji(), _0x3a31e9 = _0x529019 + '\x20' + _0x534f22 + '\x20' + _0x4a305b;
        (_0x4e231b += "BEGIN:VCARD\r\n", _0x4e231b += "VERSION:3.0\r\n", _0x4e231b += "FN:" + escapeVcf(_0x3a31e9) + '\x0d\x0a', _0x4e231b += 'N:' + escapeVcf(_0x534f22) + ';' + _0x529019 + '\x20' + _0x4a305b + ";;;\r\n", _0x4e231b += "NICKNAME:" + escapeVcf(_0x3a31e9) + '\x0d\x0a', _0x4e231b += "ORG:" + escapeVcf(_0x534f22) + '\x0d\x0a', _0x4e231b += "TEL;type=CELL;type=pref:+" + _0x3a2506 + '\x0d\x0a', _0x4e231b += "END:VCARD\r\n");
      }
      if (_0x4a305b === 0) return _0xd929e8.sendMessage(_0x25893e, {
        text: STATUS.ERROR + " No real WhatsApp numbers could be extracted from this group."
      }, {
        quoted: _0x4bba2c
      });
      const _0x38ffb1 = _0x1e4be9.replace(/[^a-zA-Z0-9 ]/g, '_').trim();
      let _0x40ece7 = UTILITY.CARD_INDEX + '\x20*' + _0x4a305b + '*\x20contacts\x20saved\x20as\x20*' + _0x534f22 + '*\x0a' + BRAND.VIP + '\x20From:\x20*' + _0x1e4be9 + '*\x0a' + STATUS.SPARKLE + " Each contact has a unique emoji + number";
      (_0x31dd4b > 0 && (_0x40ece7 += '\x0a_' + _0x31dd4b + '\x20members\x20had\x20unavailable\x20numbers_'), await _0xd929e8.sendMessage(_0x25893e, {
        document: Buffer.from(_0x4e231b),
        fileName: _0x38ffb1 + "_VIPBOT.vcf",
        mimetype: 'text/vcard',
        caption: _0x40ece7
      }, {
        quoted: _0x4bba2c
      }));
    } catch (_0x1af3da) {
      (console.error('vcf\x20error:', _0x1af3da), await _0xd929e8.sendMessage(_0x25893e, {
        text: STATUS.ERROR + '\x20Failed\x20to\x20create\x20VCF:\x20' + _0x1af3da.message
      }, {
        quoted: _0x4bba2c
      }));
    }
  }
};
