import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x380edc from 'node-fetch';
export default {
  name: "bully",
  alias: ['tease'],
  desc: "Bully / tease someone with an anime reaction",
  category: 'Anime',
  usage: '.bully\x20@user',
  async execute(_0x4ef8e9, _0x3f1f64) {
    try {
      const _0x495fff = _0x3f1f64.key.remoteJid, _0x53a91b = _0x3f1f64.key.participant || _0x3f1f64.key.remoteJid, _0x1b9e26 = _0x3f1f64.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x32d592 = _0x1b9e26[0] || _0x53a91b, _0x362393 = await _0x380edc("https://api.waifu.pics/sfw/bully"), _0x1e02a8 = await _0x362393.json();
      if (!_0x1e02a8 || !_0x1e02a8.url) return _0x4ef8e9.sendMessage(_0x495fff, {
        text: ANIME.U274C + '\x20Failed\x20to\x20fetch\x20bully\x20reaction.'
      }, {
        quoted: _0x3f1f64
      });
      const _0x44e5b8 = ANIME.U1F608 + " *BULLY MODE* " + ANIME.U1F608 + '\x0a@' + _0x32d592.split('@')[0] + '\x20is\x20being\x20teased!\x20' + ANIME.U1F43A;
      (await _0x4ef8e9.sendMessage(_0x495fff, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x3f1f64.key
        }
      }), await _0x4ef8e9.sendMessage(_0x495fff, {
        image: {
          url: _0x1e02a8.url
        },
        caption: _0x44e5b8,
        mentions: [_0x32d592]
      }, {
        quoted: _0x3f1f64
      }));
    } catch (_0x4911da) {
      (await _0x4ef8e9.sendMessage(_0x3f1f64.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x3f1f64.key
        }
      }), console.error("Bully command error:", _0x4911da), await _0x4ef8e9.sendMessage(_0x3f1f64.key.remoteJid, {
        text: ANIME.U26A0_FE0F + '\x20An\x20error\x20occurred\x20while\x20fetching\x20bully\x20reaction.'
      }, {
        quoted: _0x3f1f64
      }));
    }
  }
};
