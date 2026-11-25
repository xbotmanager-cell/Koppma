import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x1774d8 from 'node-fetch';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'companylogo',
  alias: ["companyinfo", "businesslogo", 'enrich'],
  desc: "Get company logos with business information " + UI.CHART,
  category: "Logo",
  usage: ".companylogo <company name or domain>",
  async execute(_0xbd366d, _0x42470b, _0x5c1b4d) {
    try {
      const _0x2c0378 = _0x5c1b4d.join('\x20');
      if (!_0x2c0378) return _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
        text: "╭─⌈ " + UI.CHART + '\x20*COMPANY\x20LOGO*\x20⌋\x0a├─⊷\x20*.companylogo\x20<domain>*\x0a│\x20\x20└⊷\x20Get\x20company\x20logo\x20&\x20info\x0a├─⊷\x20*.companylogo\x20<company\x20name>*\x0a│\x20\x20└⊷\x20Search\x20by\x20company\x20name\x0a╰⊷\x20' + getFooter(_0x42470b.key.participant || _0x42470b.key.remoteJid)
      }, {
        quoted: _0x42470b
      });
      const _0x594f12 = process.env.COMPANYENRICH_API_KEY;
      if (!_0x594f12 || _0x594f12.includes("E7IzOSG4o6VfOZkYe1eOmP")) return _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
        text: UI.KEY + " *CompanyEnrich API Key Required*\n━━━━━━━━━━━━━━━━━\n1. Get key: https://clearbit.com/enrichment\n2. Set as COMPANYENRICH_API_KEY\n3. Free: 50 lookups/month"
      }, {
        quoted: _0x42470b
      });
      await _0xbd366d.sendPresenceUpdate("composing", _0x42470b.key.remoteJid);
      const _0x542d47 = await _0x1774d8("https://company.clearbit.com/v2/companies/find?domain=" + encodeURIComponent(_0x2c0378), {
        headers: {
          Authorization: "Bearer " + _0x594f12,
          'User-Agent': "WolfBot/1.0"
        }
      });
      if (!_0x542d47.ok) {
        if (_0x542d47.status === 404) return _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
          text: UI.SEARCH + " *Company Not Found by Domain*\nTry: .companylogo " + _0x2c0378 + ".com\nOr use: .brandlogo for brand search"
        }, {
          quoted: _0x42470b
        });
        if (_0x542d47.status === 422) return _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
          text: "╭─⌈ " + STATUS.ERROR + " *INVALID DOMAIN* ⌋\n├─⊷ *.companylogo <domain>*\n│  └⊷ Use company.com format\n╰⊷ " + getFooter(_0x42470b.key.participant || _0x42470b.key.remoteJid)
        }, {
          quoted: _0x42470b
        });
        throw new Error("Company API Error: " + _0x542d47.status);
      }
      const _0x4a4c48 = await _0x542d47.json();
      let _0x2643d8 = UI.OFFICE + '\x20*' + (_0x4a4c48.name || _0x2c0378) + '*\x0a━━━━━━━━━━━━━━━━━\x0a';
      if (_0x4a4c48.domain) _0x2643d8 += SOCIAL.GLOBE + " *Domain:* " + _0x4a4c48.domain + '\x0a';
      if (_0x4a4c48.description) _0x2643d8 += UI.NOTE + " *Description:* " + _0x4a4c48.description.substring(0, 120) + '...\x0a';
      if (_0x4a4c48.industry) _0x2643d8 += UI.INDUSTRY + " *Industry:* " + _0x4a4c48.industry + '\x0a';
      if (_0x4a4c48.location) _0x2643d8 += UI.LOCATION + " *Location:* " + _0x4a4c48.location + '\x0a';
      if (_0x4a4c48.employees) _0x2643d8 += SOCIAL.PEOPLE + " *Employees:* " + _0x4a4c48.employees + '\x0a';
      if (_0x4a4c48.foundedYear) _0x2643d8 += UI.CALENDAR + " *Founded:* " + _0x4a4c48.foundedYear + '\x0a';
      _0x2643d8 += '\x0a' + UI.BRIEFCASE + " *Tags:* " + (_0x4a4c48.tags?.slice(0, 5).join(',\x20') || "N/A");
      if (_0x4a4c48.logo) try {
        const _0x3358fe = await _0x1774d8(_0x4a4c48.logo), _0x54b7e6 = await _0x3358fe.buffer();
        await _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
          image: _0x54b7e6,
          caption: _0x2643d8
        }, {
          quoted: _0x42470b
        });
      } catch (_0x5cd384) {
        (_0x2643d8 += '\x0a\x0a' + MEDIA.IMAGE + " *Logo:* " + _0x4a4c48.logo, await _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
          text: _0x2643d8
        }, {
          quoted: _0x42470b
        }));
      } else (_0x2643d8 += '\x0a\x0a' + STATUS.WARNING + " *No logo available for this company*", await _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
        text: _0x2643d8
      }, {
        quoted: _0x42470b
      }));
    } catch (_0x9ee57f) {
      (console.error('CompanyLogo\x20Error:', _0x9ee57f), await _0xbd366d.sendMessage(_0x42470b.key.remoteJid, {
        text: STATUS.ERROR + " *Company Lookup Failed*\n" + _0x9ee57f.message + "\n\n*Note:* CompanyEnrich works best with exact domains"
      }, {
        quoted: _0x42470b
      }));
    }
  }
};
