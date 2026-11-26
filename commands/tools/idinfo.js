import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {TOOLS} from '../../lib/emojis.js';
const GROUP_LINK_RE = /(?:https?:\/\/)?chat\.whatsapp\.com\/([A-Za-z0-9_-]{10,})/i, CHANNEL_LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:whatsapp\.com|wa\.me)\/channel\/([A-Za-z0-9_-]{10,})/i, INVITE_CODE_RE = /^[A-Za-z0-9_-]{10,}$/;
function fmtDate(_0x229b83) {
  if (!_0x229b83) return "Unknown";
  const _0x1194c9 = Number(_0x229b83), _0x4ff2ac = new Date(_0x1194c9 > 1000000000000 ? _0x1194c9 : _0x1194c9 * 1000);
  if (isNaN(_0x4ff2ac.getTime())) return "Unknown";
  return _0x4ff2ac.toLocaleDateString("en-US", {
    year: 'numeric',
    month: "long",
    day: "numeric"
  });
}
function fmtNum(_0x5c5c55) {
  if (_0x5c5c55 === null || _0x5c5c55 === undefined) return '—';
  return Number(_0x5c5c55).toLocaleString("en-US");
}
export default {
  name: "idinfo",
  description: "Show info about a group or channel by link, JID or invite code",
  category: "utility",
  aliases: ["chatinfo", "whois", "idcheck"],
  async execute(_0x1739a5, _0x42966e, _0x12e774) {
    const _0x59fa71 = _0x42966e.key.remoteJid;
    try {
      const _0x51632a = _0x12e774 && _0x12e774.join('\x20').trim() || (_0x42966e.quoted?.text || '').trim() || _0x42966e.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation?.trim() || _0x42966e.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text?.trim() || '';
      let _0xb76732 = null, _0x3d4cc0 = null, _0xf6d7e5 = null;
      const _0xfe2c47 = _0x51632a.match(CHANNEL_LINK_RE), _0x551f7b = _0x51632a.match(GROUP_LINK_RE);
      if (_0xfe2c47) (_0xb76732 = 'channel', _0x3d4cc0 = _0xfe2c47[1]); else {
        if (_0x551f7b) (_0xb76732 = "group", _0x3d4cc0 = _0x551f7b[1]); else {
          if (_0x51632a.endsWith("@newsletter")) (_0xb76732 = "channel", _0xf6d7e5 = _0x51632a); else {
            if (_0x51632a.endsWith("@g.us")) (_0xb76732 = "group", _0xf6d7e5 = _0x51632a); else {
              if (_0x51632a && INVITE_CODE_RE.test(_0x51632a)) _0x3d4cc0 = _0x51632a; else {
                if (!_0x51632a && _0x59fa71.endsWith("@g.us")) (_0xb76732 = "group", _0xf6d7e5 = _0x59fa71); else !_0x51632a && _0x59fa71.endsWith("@newsletter") && (_0xb76732 = "channel", _0xf6d7e5 = _0x59fa71);
              }
            }
          }
        }
      }
      if (!_0xb76732 && !_0x3d4cc0 && !_0xf6d7e5) return _0x1739a5.sendMessage(_0x59fa71, {
        text: "╭─⌈ " + TOOLS.U1F194 + " *ID INFO* ⌋\n├─⊷ *.idinfo <link / jid / code>*\n│  └⊷ Group or channel info\n╰⊷ " + getFooter(_0x42966e.key.participant || _0x42966e.key.remoteJid)
      }, {
        quoted: _0x42966e
      });
      await _0x1739a5.sendMessage(_0x59fa71, {
        react: {
          text: TOOLS.LOADING,
          key: _0x42966e.key
        }
      });
      let _0x1d005f = null;
      if (_0xb76732 === "group") _0x1d005f = await this.fetchGroup(_0x1739a5, {
        inviteCode: _0x3d4cc0,
        targetJid: _0xf6d7e5
      }); else {
        if (_0xb76732 === 'channel') _0x1d005f = await this.fetchChannel(_0x1739a5, {
          inviteCode: _0x3d4cc0,
          targetJid: _0xf6d7e5
        }); else {
          try {
            _0x1d005f = await this.fetchGroup(_0x1739a5, {
              inviteCode: _0x3d4cc0
            });
            if (_0x1d005f) _0xb76732 = "group";
          } catch {
            _0x1d005f = null;
          }
          if (!_0x1d005f) try {
            _0x1d005f = await this.fetchChannel(_0x1739a5, {
              inviteCode: _0x3d4cc0
            });
            if (_0x1d005f) _0xb76732 = "channel";
          } catch {
            _0x1d005f = null;
          }
        }
      }
      if (!_0x1d005f) return (await _0x1739a5.sendMessage(_0x59fa71, {
        react: {
          text: TOOLS.ERROR,
          key: _0x42966e.key
        }
      }), _0x1739a5.sendMessage(_0x59fa71, {
        text: TOOLS.ERROR + " Could not fetch info — link expired, revoked, or private."
      }, {
        quoted: _0x42966e
      }));
      (await _0x1739a5.sendMessage(_0x59fa71, {
        react: {
          text: TOOLS.SUCCESS,
          key: _0x42966e.key
        }
      }), await this.sendInfo(_0x1739a5, _0x42966e, _0xb76732, _0x1d005f));
    } catch (_0xaa059) {
      (await _0x1739a5.sendMessage(_0x59fa71, {
        react: {
          text: TOOLS.ERROR,
          key: _0x42966e.key
        }
      }), await _0x1739a5.sendMessage(_0x59fa71, {
        text: TOOLS.ERROR + '\x20' + _0xaa059.message
      }, {
        quoted: _0x42966e
      }));
    }
  },
  async fetchGroup(_0x35e465, {inviteCode: _0x438f68, targetJid: _0x448400}) {
    let _0x1fe2a2;
    if (_0x448400) _0x1fe2a2 = await _0x35e465.groupMetadata(_0x448400); else {
      if (_0x438f68) {
        _0x1fe2a2 = await _0x35e465.groupGetInviteInfo(_0x438f68);
        if (_0x1fe2a2?.id) try {
          const _0x140cb5 = await _0x35e465.groupMetadata(_0x1fe2a2.id);
          if (_0x140cb5) _0x1fe2a2 = {
            ..._0x1fe2a2,
            ..._0x140cb5
          };
        } catch {}
      }
    }
    if (!_0x1fe2a2?.id) return null;
    const _0x4f1c5a = _0x1fe2a2.participants || [], _0x1537cd = _0x4f1c5a.filter(_0x596912 => _0x596912.admin === "admin" || _0x596912.admin === 'superadmin');
    return {
      id: _0x1fe2a2.id,
      name: _0x1fe2a2.subject || "Unnamed group",
      desc: _0x1fe2a2.desc?.toString?.() || _0x1fe2a2.desc || '',
      members: (_0x1fe2a2.size ?? _0x4f1c5a.length) ?? null,
      admins: _0x1537cd.length || null,
      creation: _0x1fe2a2.creation || _0x1fe2a2.createdAt || null,
      owner: _0x1fe2a2.owner || _0x4f1c5a.find(_0x37554b => _0x37554b.admin === "superadmin")?.id || null,
      restrict: _0x1fe2a2.restrict ?? null,
      announce: _0x1fe2a2.announce ?? null
    };
  },
  async fetchChannel(_0x489a9d, {inviteCode: _0x3f7cda, targetJid: _0x5ccc25}) {
    let _0x5ca747;
    if (_0x5ccc25) _0x5ca747 = await _0x489a9d.newsletterMetadata("jid", _0x5ccc25); else _0x3f7cda && (_0x5ca747 = await _0x489a9d.newsletterMetadata("invite", _0x3f7cda));
    if (!_0x5ca747) return null;
    const _0x381b78 = _0x5ca747.id || _0x5ca747.jid || _0x5ca747.newsletter_id || null, _0x5e48e1 = _0x5ca747.name || _0x5ca747.subject || _0x5ca747.title || "Unnamed channel", _0x11485a = _0x5ca747.description || _0x5ca747.desc || '', _0x27d38c = ((((_0x5ca747.subscribers ?? _0x5ca747.subscribers_count) ?? _0x5ca747.subscriberCount) ?? _0x5ca747.followersCount) ?? _0x5ca747.followers) ?? null, _0x2d6f6e = _0x5ca747.creation_time || _0x5ca747.creation || _0x5ca747.createdAt || null, _0x302346 = _0x5ca747.verification === 'VERIFIED' || _0x5ca747.verified === true;
    if (!_0x381b78) return null;
    return {
      id: _0x381b78,
      name: _0x5e48e1,
      desc: _0x11485a,
      followers: _0x27d38c,
      creation: _0x2d6f6e,
      verified: _0x302346
    };
  },
  async sendInfo(_0x2be6f9, _0x573a11, _0x401843, _0x5716ed) {
    const _0x36e1bd = _0x573a11.key.remoteJid, _0x31e3b5 = getOwnerName().toUpperCase(), _0x4f8220 = "━━━━━━━━━━━━━━━━━", _0x46af3d = [];
    if (_0x401843 === "group") {
      (_0x46af3d.push(TOOLS.PEOPLE + " *GROUP INFO*"), _0x46af3d.push(_0x4f8220), _0x46af3d.push(TOOLS.NAME_BADGE + " *Name:* " + _0x5716ed.name), _0x46af3d.push(TOOLS.U1F194 + " *JID:* " + _0x5716ed.id), _0x46af3d.push(TOOLS.PEOPLE + '\x20*Members:*\x20' + fmtNum(_0x5716ed.members)));
      if (_0x5716ed.admins != null) _0x46af3d.push(TOOLS.U2B50 + " *Admins:* " + fmtNum(_0x5716ed.admins));
      if (_0x5716ed.creation != null) _0x46af3d.push(TOOLS.CALENDAR + '\x20*Created:*\x20' + fmtDate(_0x5716ed.creation));
      if (_0x5716ed.owner) _0x46af3d.push(TOOLS.CROWN + " *Owner:* " + _0x5716ed.owner.split('@')[0]);
      if (_0x5716ed.desc) _0x46af3d.push(TOOLS.SCROLL + " *Desc:* " + String(_0x5716ed.desc).slice(0, 200));
    } else {
      (_0x46af3d.push(TOOLS.MEGAPHONE + " *CHANNEL INFO*" + (_0x5716ed.verified ? ' ' + TOOLS.SUCCESS : '')), _0x46af3d.push(_0x4f8220), _0x46af3d.push(TOOLS.NAME_BADGE + " *Name:* " + _0x5716ed.name), _0x46af3d.push(TOOLS.U1F194 + " *JID:* " + _0x5716ed.id), _0x46af3d.push(TOOLS.HUGGING + " *Followers:* " + fmtNum(_0x5716ed.followers)));
      if (_0x5716ed.creation != null) _0x46af3d.push(TOOLS.CALENDAR + " *Created:* " + fmtDate(_0x5716ed.creation));
      if (_0x5716ed.desc) _0x46af3d.push(TOOLS.SCROLL + '\x20*Desc:*\x20' + String(_0x5716ed.desc).slice(0, 200));
    }
    (_0x46af3d.push(_0x4f8220), _0x46af3d.push('' + getFooter(_0x573a11.key.participant || _0x573a11.key.remoteJid)));
    const _0x331be5 = _0x46af3d.join('\x0a');
    let _0x10f957 = null;
    try {
      _0x10f957 = await _0x2be6f9.profilePictureUrl(_0x5716ed.id, "image");
    } catch {}
    if (_0x10f957) try {
      const _0xaed84e = await fetch(_0x10f957), _0x4eb140 = Buffer.from(await _0xaed84e.arrayBuffer());
      await _0x2be6f9.sendMessage(_0x36e1bd, {
        image: _0x4eb140,
        caption: _0x331be5
      }, {
        quoted: _0x573a11
      });
      return;
    } catch {}
    await _0x2be6f9.sendMessage(_0x36e1bd, {
      text: _0x331be5
    }, {
      quoted: _0x573a11
    });
  }
};
