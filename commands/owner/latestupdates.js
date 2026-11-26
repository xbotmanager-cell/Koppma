import {getBotName} from '../../lib/botname.js';
import {getOwnerName} from '../../lib/menuHelper.js';
export default {
  name: "latestupdates",
  alias: ["updates", 'newcommands', "changelog", "whatsnew", "latestcmds"],
  description: "Show latest bot updates, new commands and fixes",
  category: 'owner',
  async execute(_0x279a77, _0x95ac38, _0x275825, _0x17a8d2, _0x28494c) {
    const _0x3006ae = _0x95ac38.key.remoteJid, _0x30f965 = [{
      date: '2026-02-18',
      title: _0x20fe50.SHIELD + '\x20Ethical\x20Hacking\x20Suite\x20&\x20Fixes',
      changes: [_0x20fe50.BLUE_CIRCLE + " 44 NEW Ethical Hacking commands — Recon, Network, Web Security, Vulnerability, Hash Tools, Forensics", _0x20fe50.SUCCESS + " Fixed reaction-based view-once detection — reactions now trigger auto-download to owner DM", _0x20fe50.SUCCESS + " Fixed prefix command — works with ANY prefix or no prefix (for users who forgot their prefix)", _0x20fe50.SUCCESS + " Updated ytmp4 — switched to XWolf API as primary download source with Keith fallback", _0x20fe50.SUCCESS + " Fixed screenshot command — updated to working screenshot APIs", _0x20fe50.SUCCESS + " Prefix command redesigned with border style matching AI commands"]
    }, {
      date: "2026-02-17",
      title: _0x20fe50.TOOL + '\x20Connection\x20Stability\x20&\x20View-Once',
      changes: [_0x20fe50.SUCCESS + " Fixed 440 \"Stream Errored (conflict)\" reconnection loop with progressive backoff", _0x20fe50.SUCCESS + " Suppressed startup message spam during reconnections", _0x20fe50.SUCCESS + " Added conflict recovery mode with 30s stability timer"]
    }, {
      date: "2026-02-16",
      title: _0x20fe50.LIGHTNING + " Performance & Memory",
      changes: [_0x20fe50.SUCCESS + " Removed Defibrillator class — replaced with lightweight memory monitor", _0x20fe50.SUCCESS + '\x20Event\x20loop\x20deep\x20fix\x20—\x20eliminated\x20all\x20sync\x20blockers\x20(DiskManager,\x20autoLink)', _0x20fe50.SUCCESS + " Debounced saveCreds to prevent file write blocking", _0x20fe50.SUCCESS + " Pre-imported all dynamic modules at startup", _0x20fe50.SUCCESS + " Added session decryption recovery (smart signal key reset)"]
    }, {
      date: "2026-02-14",
      title: _0x20fe50.NEW_BADGE + '\x20Features\x20&\x20Integrations',
      changes: [_0x20fe50.BLUE_CIRCLE + " Supabase database integration — dual-write JSON + PostgreSQL for cross-platform portability", _0x20fe50.BLUE_CIRCLE + " 13 database tables for all bot systems", _0x20fe50.BLUE_CIRCLE + '\x20W.O.L.F\x20Chatbot\x20whitelist\x20system\x20—\x20per-group\x20and\x20per-DM\x20control', _0x20fe50.SUCCESS + " Fixed sudo system — sudos bypass silent mode with full owner access", _0x20fe50.SUCCESS + " Fixed console logs — real phone numbers instead of LIDs"]
    }];
    let _0x372036 = "╭─⌈ " + _0x20fe50.WOLF + '\x20*' + getBotName() + " — LATEST UPDATES* ⌋\n│\n";
    for (const _0x2211f8 of _0x30f965) {
      (_0x372036 += "├─⌈ " + _0x20fe50.CALENDAR + '\x20*' + _0x2211f8.date + "* ⌋\n", _0x372036 += '│\x20' + _0x2211f8.title + "\n│\n");
      for (const _0x4ae7ab of _0x2211f8.changes) {
        _0x372036 += '│\x20' + _0x4ae7ab + '\x0a';
      }
      _0x372036 += '│\x0a';
    }
    (_0x372036 += '├─⌈\x20' + _0x20fe50.CHART + " *STATS* ⌋\n", _0x372036 += "│ • Total commands: 735+\n", _0x372036 += "│ • AI models: 7\n", _0x372036 += "│ • Logo styles: 30+\n", _0x372036 += '│\x20•\x20Menu\x20styles:\x206\x0a', _0x372036 += "│ • Ethical Hacking tools: 44+\n│\n", _0x372036 += '╰───────────────\x0a', _0x372036 += "> *" + getOwnerName().toUpperCase() + " TECH*", await _0x279a77.sendMessage(_0x3006ae, {
      text: _0x372036
    }, {
      quoted: _0x95ac38
    }));
  }
};
import _0x20fe50 from '../../lib/emojis.js';
