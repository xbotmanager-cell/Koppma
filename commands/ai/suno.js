import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "suno",
  description: "Generate AI songs with Suno - Surebet Edition",
  category: 'ai',
  surebetTemplates: {
    pop_hit: {
      prompt: "A catchy pop song with memorable melody, radio-friendly production, and uplifting lyrics about {theme}. Features clear vocals, driving beat, and modern synth elements. Professional mixing, chart-ready quality.",
      style: "pop",
      successRate: "92%"
    },
    emotional_ballad: {
      prompt: "An emotional piano ballad about {theme} with soaring vocals, heartfelt lyrics, and cinematic strings. Features dynamic build, emotional climax, and intimate vocal delivery. Professional production quality.",
      style: "ballad",
      successRate: "88%"
    },
    edm_banger: {
      prompt: "An epic EDM festival banger about {theme} with massive drop, euphoric melodies, and driving beat. Features build-up tension, explosive chorus, and atmospheric breakdown. Professional festival mix.",
      style: "edm",
      successRate: "90%"
    },
    hiphop_vibe: {
      prompt: "A hard-hitting hip hop track about {theme} with 808 bass, catchy flow, and atmospheric pads. Features modern trap elements, rhythmic delivery, and street-style authenticity. Radio-ready mix.",
      style: 'hiphop',
      successRate: "85%"
    },
    indie_folk: {
      prompt: "A warm indie folk song about {theme} with acoustic guitar, organic textures, and authentic vocals. Features gentle percussion, harmonica accents, and campfire intimacy. Professional authentic mix.",
      style: 'folk',
      successRate: "89%"
    }
  },
  surebetThemes: ["overcoming challenges and finding strength", "new beginnings and fresh starts", "summer nights and memories", "personal growth and transformation", "chasing dreams against all odds"],
  async execute(_0xa7dc99, _0x438fc4, _0x4c6811) {
    try {
      const _0x546162 = _0x438fc4.text || '', _0x1c0ebe = _0x546162.split('\x20').slice(1);
      if (!_0x1c0ebe.length || _0x1c0ebe[0] === "help") return this.showHelp(_0xa7dc99, _0x438fc4);
      const [_0xa17b8, ..._0x317a20] = _0x1c0ebe;
      switch (_0xa17b8.toLowerCase()) {
        case 'generate':
        case "create":
        case "make":
          return this.generateSong(_0xa7dc99, _0x438fc4, _0x317a20);
        case "quick":
        case "instant":
          return this.quickGenerate(_0xa7dc99, _0x438fc4, _0x317a20);
        case "templates":
        case 'styles':
          return this.showTemplates(_0xa7dc99, _0x438fc4);
        case 'themes':
          return this.showThemes(_0xa7dc99, _0x438fc4);
        default:
          return this.generateSong(_0xa7dc99, _0x438fc4, _0x1c0ebe);
      }
    } catch (_0x56bbc4) {
      (console.error("Suno command error:", _0x56bbc4), await _0xa7dc99.sendMessage(_0x438fc4.key.remoteJid, {
        text: STATUS.ERROR + " Error generating song: " + _0x56bbc4.message + "\n\nUse *.suno help* for usage instructions."
      }, {
        quoted: _0x438fc4
      }));
    }
  },
  async generateSong(_0x1f63ad, _0x2653bb, _0x32878f) {
    let _0x2796fd = "pop_hit", _0x5e196c = '', _0x435b1c = "medium";
    for (let _0x479160 = 0; _0x479160 < _0x32878f.length; _0x479160++) {
      const _0x4209cd = _0x32878f[_0x479160].toLowerCase();
      if (_0x4209cd.startsWith("style:") && _0x32878f[_0x479160]) {
        const _0x1580a4 = _0x4209cd.split(':')[1];
        this.surebetTemplates[_0x1580a4] && (_0x2796fd = _0x1580a4);
      } else {
        if (_0x4209cd.startsWith("theme:") && _0x32878f[_0x479160]) {
          _0x5e196c = _0x32878f.slice(_0x479160).join('\x20').replace("theme:", '').trim();
          break;
        } else {
          if (_0x4209cd.startsWith('length:') && _0x32878f[_0x479160 + 1]) (_0x435b1c = _0x32878f[_0x479160 + 1], _0x479160++); else this.surebetTemplates[_0x4209cd] && (_0x2796fd = _0x4209cd);
        }
      }
    }
    const _0x365d88 = this.surebetTemplates[_0x2796fd] || this.surebetTemplates.pop_hit;
    let _0x4d65a2 = _0x5e196c;
    if (!_0x4d65a2) {
      const _0x390c8a = Math.floor(Math.random() * this.surebetThemes.length);
      _0x4d65a2 = this.surebetThemes[_0x390c8a];
    }
    const _0x3f7d4e = _0x365d88.prompt.replace('{theme}', _0x4d65a2), _0x2145ee = await this.simulateSunoAPI(_0x3f7d4e);
    await this.sendResult(_0x1f63ad, _0x2653bb, {
      style: _0x2796fd,
      theme: _0x4d65a2,
      prompt: _0x3f7d4e,
      result: _0x2145ee,
      successRate: _0x365d88.successRate
    });
  },
  async quickGenerate(_0x4c5ed6, _0x11073a, _0x2ceb81) {
    const _0x3d379d = _0x2ceb81[0] || "viral", _0x3101ba = {
      viral: "A TikTok-ready viral pop song with catchy hook in first 15 seconds, dance-friendly beat, and relatable lyrics for Gen Z. Features short format optimization.",
      lofi: 'A\x20chill\x20lofi\x20study\x20beats\x20track\x20with\x20smooth\x20jazz\x20chords,\x20vinyl\x20crackle,\x20and\x20relaxed\x20vibe.\x20Features\x20gentle\x20piano\x20melody\x20and\x20soft\x20drums.',
      workout: 'A\x20high-energy\x20workout\x20motivation\x20song\x20with\x20powerful\x20beats,\x20inspiring\x20lyrics,\x20and\x20adrenaline-pumping\x20rhythm.\x20Features\x20build-ups\x20and\x20explosive\x20drops.'
    }, _0x1ac8c6 = _0x3101ba[_0x3d379d] || _0x3101ba.viral, _0x5a2a6a = await this.simulateSunoAPI(_0x1ac8c6), _0x1a0420 = MEDIA.MUSIC + '\x20*QUICK\x20SUNO\x20GENERATION*\x0a\x0a' + (UI.CHART + " *Style:* " + _0x3d379d.toUpperCase() + '\x0a') + (STATUS.SUCCESS + " *Success Rate:* 95%\n") + (STATUS.INFO + " *Prompt Used:* " + _0x1ac8c6.substring(0, 100) + "...\n\n") + "*Simulated Result:*\n" + (UI.FOLDER + " ID: suno_" + Date.now() + '\x0a') + (UI.TIMER + " Duration: 2:30\n") + (UI.CHART + " Status: Generated\n\n") + (UI.LINK + '\x20*Note:*\x20This\x20is\x20a\x20simulation.\x20For\x20real\x20generation,\x20use\x20Suno\x20AI\x20directly\x20at\x20suno.ai');
    await _0x4c5ed6.sendMessage(_0x11073a.key.remoteJid, {
      text: _0x1a0420
    }, {
      quoted: _0x11073a
    });
  },
  async simulateSunoAPI(_0x37b43a) {
    return (await new Promise(_0x571431 => setTimeout(_0x571431, 1000)), {
      id: 'suno_' + Date.now(),
      duration: "2:30",
      status: "completed",
      prompt: _0x37b43a.substring(0, 150)
    });
  },
  async sendResult(_0x1621f4, _0x1c1d17, _0x4bfeab) {
    const _0x9f34ef = MEDIA.MUSIC + " *SUNO AI SONG GENERATED!*\n\n" + (UI.TARGET + " *Style:* " + _0x4bfeab.style.replace('_', '\x20').toUpperCase() + '\x0a') + (STATUS.SUCCESS + " *Success Rate:* " + _0x4bfeab.successRate + '\x0a') + (UI.NOTE + '\x20*Theme:*\x20' + _0x4bfeab.theme + '\x0a\x0a') + (STATUS.INFO + '\x20*Prompt\x20Used:*\x0a' + _0x4bfeab.prompt.substring(0, 150) + "...\n\n") + (UI.CHART + " *Simulated Result:*\n") + (UI.FOLDER + " ID: " + _0x4bfeab.result.id + '\x0a') + (UI.TIMER + '\x20Duration:\x20' + _0x4bfeab.result.duration + '\x0a') + (UI.CHART + '\x20Status:\x20' + _0x4bfeab.result.status + '\x0a\x0a') + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + '*How\x20to\x20get\x20real\x20Suno\x20API:*\x0a' + '1.\x20Visit:\x20suno.ai\x0a' + "2. Join their Discord\n" + "3. Apply for API access\n" + "4. Or use RapidAPI Suno API\n\n" + "*Quick Commands:*\n" + '.suno\x20generate\x20pop_hit\x0a' + ".suno quick viral\n" + '.suno\x20templates';
    await _0x1621f4.sendMessage(_0x1c1d17.key.remoteJid, {
      text: _0x9f34ef
    }, {
      quoted: _0x1c1d17
    });
  },
  async showTemplates(_0x4c85f0, _0x1440a9) {
    let _0x4b20ca = MEDIA.MUSIC_NOTES + " *SUNO SURBET TEMPLATES*\n" + "High-success rate templates (85%+ success):\n\n";
    for (const [_0x4760fb, _0x52e883] of Object.entries(this.surebetTemplates)) {
      _0x4b20ca += MEDIA.MUSIC + '\x20*' + _0x4760fb.replace('_', '\x20').toUpperCase() + '*\x0a' + (STATUS.SUCCESS + '\x20' + _0x52e883.successRate + " success\n") + (STATUS.INFO + '\x20Style:\x20' + _0x52e883.style + '\x0a\x0a');
    }
    (_0x4b20ca += '┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + "*Usage Examples:*\n" + '.suno\x20generate\x20pop_hit\x0a' + ".suno generate emotional_ballad theme:\"lost love\"\n" + '.suno\x20generate\x20style:edm_banger\x0a\x0a' + '*Note:*\x20Currently\x20in\x20simulation\x20mode.\x20Replace\x20simulateSunoAPI()\x20with\x20real\x20API\x20call.', await _0x4c85f0.sendMessage(_0x1440a9.key.remoteJid, {
      text: _0x4b20ca
    }, {
      quoted: _0x1440a9
    }));
  },
  async showThemes(_0x1fc629, _0x222891) {
    let _0x5bce52 = STATUS.INFO + " *SUNO SURBET THEMES*\n" + 'High-success\x20themes\x20for\x20better\x20results:\x0a\x0a';
    (this.surebetThemes.forEach((_0x4bf003, _0xef226e) => {
      _0x5bce52 += _0xef226e + 1 + '.\x20' + _0x4bf003 + '\x0a';
    }), _0x5bce52 += "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + "*Example Commands:*\n" + '.suno\x20generate\x20pop_hit\x20theme:\x22overcoming\x20challenges\x22\x0a' + ".suno generate emotional_ballad theme:\"summer nights and memories\"\n\n" + "*Tip:* Use these themes for highest quality results", await _0x1fc629.sendMessage(_0x222891.key.remoteJid, {
      text: _0x5bce52
    }, {
      quoted: _0x222891
    }));
  },
  async showHelp(_0x3c1c5f, _0x3003a5) {
    const _0x1bfa9e = "╭┄〔 " + MEDIA.MUSIC + " *SUNO AI MUSIC* 〕┄╮\n┆ ✦ *.suno generate <style>*\n┆   └─ Generate song with style\n┆ ✦ *.suno quick <viral|lofi|workout>*\n┆   └─ Quick song generation\n┆ ✦ *.suno templates*\n┆   └─ View available templates\n┆ ✦ *.suno themes*\n┆   └─ View suggested themes\n┆ ✦ *.suno help*\n┆   └─ Show this help\n╰┄ " + getFooter(_0x3003a5.key.participant || _0x3003a5.key.remoteJid);
    await _0x3c1c5f.sendMessage(_0x3003a5.key.remoteJid, {
      text: _0x1bfa9e
    }, {
      quoted: _0x3003a5
    });
  },
  usage: ".suno <command> [options]\nCommands: generate, quick, templates, themes, help",
  examples: [".suno generate pop_hit", ".suno generate emotional_ballad theme:'lost love'", ".suno quick viral", '.suno\x20templates']
};
