import _0x42747a from 'axios';
import {TOOLS} from '../../lib/emojis.js';
import {createCanvas, loadImage} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'bf',
  description: "Add boyfriend overlay to profile picture",
  category: 'fun',
  aliases: ["boyfriend", "boyfriendpic", "man", "hubby"],
  usage: "bf (reply to any message)",
  async execute(_0x45ff1d, _0x2b0f09, _0x524893, _0x3b4d98, _0x91bfa1) {
    const _0x4282eb = _0x2b0f09.key.remoteJid, _0x155a1a = _0x2b0f09.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (_0x524893.length === 0 && !_0x155a1a) {
      const _0xd67b8d = "╭─⌈ " + TOOLS.BLUE_HEART + " *BOYFRIEND PROFILE* ⌋\n│\n├─⊷ *" + _0x3b4d98 + "bf*\n│  └⊷ Reply to any message to get boyfriend profile pic\n│\n├─⊷ *Aliases:* boyfriend, hubby\n│\n╰⊷ " + getFooter(_0x2b0f09.key.participant || _0x2b0f09.key.remoteJid);
      return _0x45ff1d.sendMessage(_0x4282eb, {
        text: _0xd67b8d
      }, {
        quoted: _0x2b0f09
      });
    }
    if (_0x524893[0]?.toLowerCase() === "help") {
      const _0x4bbfc3 = "╭─⌈ " + TOOLS.BLUE_HEART + " *BOYFRIEND PROFILE* ⌋\n│\n├─⊷ *" + _0x3b4d98 + "bf*\n│  └⊷ Reply to any message to create couple picture\n│\n├─⊷ *Aliases:* boyfriend, hubby\n│\n╰⊷ " + getFooter(_0x2b0f09.key.participant || _0x2b0f09.key.remoteJid);
      return _0x45ff1d.sendMessage(_0x4282eb, {
        text: _0x4bbfc3
      }, {
        quoted: _0x2b0f09
      });
    }
    try {
      let _0x28df55 = null, _0x5e30fc = "User", _0x134dbf = false;
      if (_0x2b0f09.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        console.log(TOOLS.U2705 + " Detected reply to message");
        const _0x30e6e9 = _0x2b0f09.message.extendedTextMessage.contextInfo;
        _0x30e6e9.participant ? (_0x28df55 = _0x30e6e9.participant, _0x5e30fc = _0x30e6e9.pushName || "User", console.log(TOOLS.TARGET + " Target from reply: " + _0x28df55 + '\x20(' + _0x5e30fc + ')')) : (_0x28df55 = _0x30e6e9.remoteJid || _0x4282eb, _0x5e30fc = "User", console.log(TOOLS.TARGET + " Target from remoteJid: " + _0x28df55));
      } else (_0x28df55 = _0x2b0f09.key.participant || _0x4282eb, _0x5e30fc = "You", console.log(TOOLS.TARGET + " Using sender as target: " + _0x28df55 + '\x20(' + _0x5e30fc + ')'));
      if (!_0x28df55) return _0x45ff1d.sendMessage(_0x4282eb, {
        text: TOOLS.ERROR + " *COULDN'T FIND USER!*\n\nReply to someone's message first.\n\n" + TOOLS.INFO + '\x20Example:\x20Reply\x20to\x20a\x20message\x20with\x20`' + _0x3b4d98 + "bf`"
      }, {
        quoted: _0x2b0f09
      });
      const _0x38e5d8 = _0x28df55.split('@')[0] || "Unknown", _0x3ce8ba = ["sarah", "emma", "sophia", "olivia", "ava", 'mia', "charlotte", "amelia", "isabella", "evelyn"];
      (_0x134dbf = _0x3ce8ba.some(_0x1f6e44 => _0x5e30fc.toLowerCase().includes(_0x1f6e44)), console.log(TOOLS.CLIPBOARD + '\x20Processing\x20for:\x20' + _0x5e30fc + '\x20(' + _0x38e5d8 + ") - " + (_0x134dbf ? TOOLS.U2640FE0F + " Female" : TOOLS.U2642FE0F + " Male")), await _0x45ff1d.sendMessage(_0x4282eb, {
        react: {
          text: TOOLS.LOADING,
          key: _0x2b0f09.key
        }
      }));
      let _0x9579dc = null, _0x3d53b9 = null;
      try {
        const _0x44a8c8 = await _0x45ff1d.profilePictureUrl(_0x28df55, 'image');
        if (!_0x44a8c8) throw new Error("No profile picture found");
        console.log(TOOLS.CAMERA + " Downloading profile picture...");
        const _0x36fba6 = await _0x42747a.get(_0x44a8c8, {
          responseType: "arraybuffer",
          timeout: 15000,
          headers: {
            'User-Agent': "WhatsApp-Bot/1.0"
          }
        });
        (_0x9579dc = Buffer.from(_0x36fba6.data), _0x3d53b9 = await loadImage(_0x9579dc), console.log(TOOLS.SUCCESS + '\x20Profile\x20picture\x20downloaded:\x20' + _0x9579dc.length + " bytes"));
      } catch (_0x4e88fc) {
        console.log(TOOLS.WARNING + " Profile picture error: " + _0x4e88fc.message);
        const _0x2ee3f0 = createCanvas(400, 400), _0x52b42d = _0x2ee3f0.getContext('2d'), _0x5dca3a = _0x134dbf ? "#FFB6C1" : "#87CEEB";
        (_0x52b42d.fillStyle = _0x5dca3a, _0x52b42d.fillRect(0, 0, 400, 400), _0x52b42d.fillStyle = 'white', _0x52b42d.beginPath(), _0x52b42d.arc(200, 200, 150, 0, Math.PI * 2), _0x52b42d.fill(), _0x52b42d.fillStyle = _0x5dca3a, _0x52b42d.font = "bold 120px Arial", _0x52b42d.textAlign = "center", _0x52b42d.textBaseline = "middle");
        const _0x5860a1 = _0x5e30fc.charAt(0).toUpperCase();
        (_0x52b42d.fillText(_0x5860a1, 200, 200), _0x9579dc = _0x2ee3f0.toBuffer(), _0x3d53b9 = await loadImage(_0x9579dc));
      }
      let _0x32dac3 = null, _0x1a96cc = '', _0x440b32 = '';
      try {
        const _0x3187d5 = await getRandomBoyfriendImage();
        (_0x32dac3 = _0x3187d5.image, _0x1a96cc = _0x3187d5.name, _0x440b32 = _0x3187d5.type, console.log(TOOLS.SUCCESS + " Got boyfriend image: " + _0x1a96cc + '\x20(' + _0x440b32 + ')'));
      } catch (_0x584717) {
        console.error("Boyfriend image error:", _0x584717);
        const _0xc76efd = createCanvas(400, 400), _0x1ea83b = _0xc76efd.getContext('2d');
        (_0x1ea83b.fillStyle = "#4A90E2", _0x1ea83b.fillRect(0, 0, 400, 400), _0x1ea83b.fillStyle = "#F5D0A9", _0x1ea83b.beginPath(), _0x1ea83b.arc(200, 150, 80, 0, Math.PI * 2), _0x1ea83b.fill(), _0x1ea83b.fillStyle = "#2C3E50", _0x1ea83b.beginPath(), _0x1ea83b.ellipse(200, 120, 100, 50, 0, 0, Math.PI * 2), _0x1ea83b.fill(), _0x1ea83b.fillStyle = "black", _0x1ea83b.beginPath(), _0x1ea83b.arc(170, 140, 10, 0, Math.PI * 2), _0x1ea83b.fill(), _0x1ea83b.beginPath(), _0x1ea83b.arc(230, 140, 10, 0, Math.PI * 2), _0x1ea83b.fill(), _0x1ea83b.strokeStyle = "black", _0x1ea83b.lineWidth = 3, _0x1ea83b.beginPath(), _0x1ea83b.moveTo(160, 180), _0x1ea83b.quadraticCurveTo(200, 220, 240, 180), _0x1ea83b.stroke(), _0x1ea83b.fillStyle = "#E74C3C", _0x1ea83b.beginPath(), _0x1ea83b.moveTo(200, 240), _0x1ea83b.lineTo(180, 280), _0x1ea83b.lineTo(220, 280), _0x1ea83b.closePath(), _0x1ea83b.fill(), _0x32dac3 = await loadImage(_0xc76efd.toBuffer()), _0x1a96cc = "AI Boyfriend", _0x440b32 = 'Handsome');
      }
      let _0x15df41;
      try {
        (_0x15df41 = await createCouplePicture(_0x3d53b9, _0x32dac3, _0x5e30fc, _0x1a96cc, _0x134dbf ? TOOLS.WOMAN : TOOLS.PERSON), console.log(TOOLS.SUCCESS + '\x20Couple\x20picture\x20created\x20successfully'));
      } catch (_0x27c116) {
        (console.error("Couple picture error:", _0x27c116), _0x15df41 = await simpleOverlay(_0x3d53b9, _0x32dac3, _0x134dbf));
      }
      const _0xd65585 = ["The Handsome Protector " + TOOLS.SHIELD, "The Romantic Gentleman " + TOOLS.BOUQUET, 'The\x20Cool\x20Boyfriend\x20' + TOOLS.COOL, "The Strong & Caring " + TOOLS.MUSCLE, "The Smart & Successful " + TOOLS.BRAIN + TOOLS.U1F4BC, 'The\x20Loyal\x20Partner\x20' + TOOLS.HANDSHAKE, "The Charming Prince " + TOOLS.PRINCE, "The Athletic Hunk " + TOOLS.GYM], _0x2c8b3e = ["You found your perfect match! " + TOOLS.HEART_ARROW, 'Love\x20is\x20in\x20the\x20air!\x20' + TOOLS.HEART, "A match made in heaven! " + TOOLS.U2728, "Your soulmate has arrived! " + TOOLS.COUPLE, "Destiny brought you together! " + TOOLS.STAR, "True love detected! " + TOOLS.SPARKLE_HEART, "He's the one for you! " + TOOLS.U1F451], _0x2f22ff = _0xd65585[Math.floor(Math.random() * _0xd65585.length)], _0x25de00 = _0x2c8b3e[Math.floor(Math.random() * _0x2c8b3e.length)], _0x102e85 = _0x134dbf ? "Girlfriend" : "Partner";
      (await _0x45ff1d.sendMessage(_0x4282eb, {
        image: _0x15df41,
        caption: TOOLS.BLUE_HEART + '\x20*BOYFRIEND\x20PROFILE\x20CREATED!*\x0a\x0a' + ((_0x134dbf ? TOOLS.WOMAN : TOOLS.PERSON) + '\x20*' + _0x102e85 + ":* " + _0x5e30fc + '\x0a') + (TOOLS.TUXEDO + " *Boyfriend:* " + _0x1a96cc + '\x0a') + (TOOLS.STAR + '\x20*Type:*\x20' + _0x2f22ff + '\x0a') + (TOOLS.U1F3F7FE0F + " *Style:* " + _0x440b32 + '\x0a\x0a') + (TOOLS.HEART + '\x20' + _0x25de00 + '\x0a') + (TOOLS.U2728 + " Use `" + _0x3b4d98 + "bf` to find more boyfriends!"),
        quoted: _0x2b0f09
      }), await _0x45ff1d.sendMessage(_0x4282eb, {
        react: {
          text: TOOLS.SUCCESS,
          key: _0x2b0f09.key
        }
      }));
    } catch (_0x4272f9) {
      (console.error(TOOLS.ERROR + " [BF] ERROR:", _0x4272f9), await _0x45ff1d.sendMessage(_0x4282eb, {
        react: {
          text: TOOLS.ERROR,
          key: _0x2b0f09.key
        }
      }), await _0x45ff1d.sendMessage(_0x4282eb, {
        text: TOOLS.ERROR + '\x20Failed:\x20' + _0x4272f9.message
      }, {
        quoted: _0x2b0f09
      }));
    }
  }
};
async function getRandomBoyfriendImage() {
  const _0x1a887c = [{
    name: 'James',
    type: 'Professional',
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  }, {
    name: "Michael",
    type: "Casual",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  }, {
    name: 'David',
    type: "Formal",
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
  }, {
    name: 'Robert',
    type: "Athletic",
    url: "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=400&fit=crop&crop=face"
  }, {
    name: "William",
    type: "Stylish",
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
  }, {
    name: "Richard",
    type: "Business",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
  }, {
    name: "Joseph",
    type: "Cool",
    url: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?w=400&h=400&fit=crop&crop=face"
  }, {
    name: 'Thomas',
    type: "Charming",
    url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face'
  }, {
    name: "Charles",
    type: "Classic",
    url: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop&crop=face"
  }, {
    name: "Christopher",
    type: 'Trendy',
    url: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=400&h=400&fit=crop&crop=face"
  }], _0x2992db = _0x1a887c[Math.floor(Math.random() * _0x1a887c.length)];
  try {
    const _0x20d2dd = await _0x42747a.get(_0x2992db.url, {
      responseType: "arraybuffer",
      timeout: 15000,
      headers: {
        'User-Agent': "WhatsApp-Bot/1.0"
      }
    }), _0x42f72b = Buffer.from(_0x20d2dd.data), _0x580f7a = createCanvas(400, 400), _0x8dee41 = _0x580f7a.getContext('2d');
    return (_0x8dee41.beginPath(), _0x8dee41.arc(200, 200, 200, 0, Math.PI * 2), _0x8dee41.closePath(), _0x8dee41.clip(), _0x8dee41.drawImage(await loadImage(_0x42f72b), 0, 0, 400, 400), {
      name: _0x2992db.name,
      type: _0x2992db.type,
      image: await loadImage(_0x580f7a.toBuffer())
    });
  } catch (_0x48131e) {
    console.error("Error downloading boyfriend image:", _0x48131e);
    throw _0x48131e;
  }
}
async function createCouplePicture(_0x1544eb, _0x58f565, _0x352046, _0x37ee42, _0xdac0f7 = TOOLS.PERSON) {
  const _0x1194af = createCanvas(700, 450), _0x4a3ec8 = _0x1194af.getContext('2d'), _0x4c36e9 = _0x4a3ec8.createLinearGradient(0, 0, 700, 450);
  (_0x4c36e9.addColorStop(0, '#4A90E2'), _0x4c36e9.addColorStop(0.5, "#87CEEB"), _0x4c36e9.addColorStop(1, "#1E3A8A"), _0x4a3ec8.fillStyle = _0x4c36e9, _0x4a3ec8.fillRect(0, 0, 700, 450), _0x4a3ec8.fillStyle = "rgba(255, 255, 255, 0.1)");
  for (let _0x108cdb = 0; _0x108cdb < 20; _0x108cdb++) {
    const _0x52ae99 = Math.random() * 700, _0x2a9549 = Math.random() * 450, _0x29d2f5 = Math.random() * 15 + 5;
    (_0x4a3ec8.beginPath(), _0x4a3ec8.arc(_0x52ae99, _0x2a9549, _0x29d2f5, 0, Math.PI * 2), _0x4a3ec8.fill());
  }
  return (_0x4a3ec8.save(), _0x4a3ec8.beginPath(), _0x4a3ec8.arc(175, 175, 100, 0, Math.PI * 2), _0x4a3ec8.closePath(), _0x4a3ec8.clip(), _0x4a3ec8.drawImage(_0x1544eb, 75, 75, 200, 200), _0x4a3ec8.restore(), _0x4a3ec8.strokeStyle = "#FFFFFF", _0x4a3ec8.lineWidth = 6, _0x4a3ec8.beginPath(), _0x4a3ec8.arc(175, 175, 100, 0, Math.PI * 2), _0x4a3ec8.stroke(), _0x4a3ec8.save(), _0x4a3ec8.beginPath(), _0x4a3ec8.arc(525, 175, 100, 0, Math.PI * 2), _0x4a3ec8.closePath(), _0x4a3ec8.clip(), _0x4a3ec8.drawImage(_0x58f565, 425, 75, 200, 200), _0x4a3ec8.restore(), _0x4a3ec8.beginPath(), _0x4a3ec8.arc(525, 175, 100, 0, Math.PI * 2), _0x4a3ec8.stroke(), drawHeart(_0x4a3ec8, 350, 175, 50, "#FF6B8B"), _0x4a3ec8.fillStyle = "white", _0x4a3ec8.font = 'bold\x2040px\x20Arial', _0x4a3ec8.textAlign = "center", _0x4a3ec8.fillText('→', 300, 185), _0x4a3ec8.fillText(TOOLS.U2764FE0F, 350, 195), _0x4a3ec8.fillText('←', 400, 185), _0x4a3ec8.fillStyle = "#FFFFFF", _0x4a3ec8.font = "bold 24px Arial", _0x4a3ec8.textAlign = "center", _0x4a3ec8.shadowColor = 'rgba(0,\x200,\x200,\x200.5)', _0x4a3ec8.shadowBlur = 5, _0x4a3ec8.fillText(_0xdac0f7 + '\x20' + _0x352046, 175, 320), _0x4a3ec8.fillText(TOOLS.TUXEDO + '\x20' + _0x37ee42, 525, 320), _0x4a3ec8.shadowBlur = 0, _0x4a3ec8.fillStyle = '#FFD700', _0x4a3ec8.font = 'bold\x2032px\x20Arial', _0x4a3ec8.shadowColor = "rgba(0, 0, 0, 0.3)", _0x4a3ec8.shadowBlur = 3, _0x4a3ec8.fillText(TOOLS.BLUE_HEART + " PERFECT COUPLE " + TOOLS.BLUE_HEART, 350, 390), _0x4a3ec8.shadowBlur = 0, _0x4a3ec8.strokeStyle = '#FFD700', _0x4a3ec8.lineWidth = 4, drawCorner(_0x4a3ec8, 50, 50, 30), drawCorner(_0x4a3ec8, 650, 50, 30), drawCorner(_0x4a3ec8, 50, 400, 30), drawCorner(_0x4a3ec8, 650, 400, 30), _0x1194af.toBuffer("image/jpeg", {
    quality: 0.95
  }));
}
function drawHeart(_0x4cab3c, _0x1b8355, _0x489d9e, _0x6168eb, _0xf61a4f) {
  (_0x4cab3c.save(), _0x4cab3c.translate(_0x1b8355, _0x489d9e), _0x4cab3c.fillStyle = _0xf61a4f, _0x4cab3c.beginPath(), _0x4cab3c.moveTo(0, _0x6168eb / 4), _0x4cab3c.bezierCurveTo(-_0x6168eb / 2, -_0x6168eb / 3, -_0x6168eb, _0x6168eb / 3, 0, _0x6168eb), _0x4cab3c.bezierCurveTo(_0x6168eb, _0x6168eb / 3, _0x6168eb / 2, -_0x6168eb / 3, 0, _0x6168eb / 4), _0x4cab3c.closePath(), _0x4cab3c.fill(), _0x4cab3c.fillStyle = 'rgba(255,\x20255,\x20255,\x200.4)', _0x4cab3c.beginPath(), _0x4cab3c.ellipse(-_0x6168eb / 6, -_0x6168eb / 4, _0x6168eb / 8, _0x6168eb / 6, 0, 0, Math.PI * 2), _0x4cab3c.fill(), _0x4cab3c.restore());
}
function drawCorner(_0x3dae4b, _0x337c45, _0xbe4fa4, _0x5192d2) {
  (_0x3dae4b.beginPath(), _0x3dae4b.moveTo(_0x337c45, _0xbe4fa4 - _0x5192d2), _0x3dae4b.lineTo(_0x337c45, _0xbe4fa4), _0x3dae4b.lineTo(_0x337c45 - _0x5192d2, _0xbe4fa4), _0x3dae4b.stroke(), _0x3dae4b.beginPath(), _0x3dae4b.moveTo(_0x337c45, _0xbe4fa4 + _0x5192d2), _0x3dae4b.lineTo(_0x337c45, _0xbe4fa4), _0x3dae4b.lineTo(_0x337c45 - _0x5192d2, _0xbe4fa4), _0x3dae4b.stroke(), _0x3dae4b.beginPath(), _0x3dae4b.moveTo(_0x337c45, _0xbe4fa4 - _0x5192d2), _0x3dae4b.lineTo(_0x337c45, _0xbe4fa4), _0x3dae4b.lineTo(_0x337c45 + _0x5192d2, _0xbe4fa4), _0x3dae4b.stroke(), _0x3dae4b.beginPath(), _0x3dae4b.moveTo(_0x337c45, _0xbe4fa4 + _0x5192d2), _0x3dae4b.lineTo(_0x337c45, _0xbe4fa4), _0x3dae4b.lineTo(_0x337c45 + _0x5192d2, _0xbe4fa4), _0x3dae4b.stroke());
}
async function simpleOverlay(_0x234817, _0x250027, _0x543fed = false) {
  const _0xfeaaf0 = createCanvas(600, 350), _0x1813f9 = _0xfeaaf0.getContext('2d'), _0x271af9 = _0x1813f9.createLinearGradient(0, 0, 600, 350);
  return (_0x543fed ? (_0x271af9.addColorStop(0, "#FFB6C1"), _0x271af9.addColorStop(1, '#87CEEB')) : (_0x271af9.addColorStop(0, '#4A90E2'), _0x271af9.addColorStop(1, "#1E3A8A")), _0x1813f9.fillStyle = _0x271af9, _0x1813f9.fillRect(0, 0, 600, 350), _0x1813f9.save(), _0x1813f9.beginPath(), _0x1813f9.arc(150, 150, 80, 0, Math.PI * 2), _0x1813f9.closePath(), _0x1813f9.clip(), _0x1813f9.drawImage(_0x234817, 70, 70, 160, 160), _0x1813f9.restore(), _0x1813f9.save(), _0x1813f9.beginPath(), _0x1813f9.arc(450, 125, 70, 0, Math.PI * 2), _0x1813f9.closePath(), _0x1813f9.clip(), _0x1813f9.drawImage(_0x250027, 380, 55, 140, 140), _0x1813f9.restore(), _0x1813f9.fillStyle = "white", _0x1813f9.font = "bold 28px Arial", _0x1813f9.textAlign = 'center', _0x1813f9.fillText(TOOLS.TUXEDO + '\x20Boyfriend\x20Added!\x20' + TOOLS.BLUE_HEART, 300, 300), _0x1813f9.strokeStyle = "white", _0x1813f9.lineWidth = 3, _0x1813f9.beginPath(), _0x1813f9.moveTo(250, 150), _0x1813f9.lineTo(380, 125), _0x1813f9.stroke(), _0x1813f9.beginPath(), _0x1813f9.moveTo(380, 125), _0x1813f9.lineTo(370, 115), _0x1813f9.lineTo(370, 135), _0x1813f9.closePath(), _0x1813f9.fillStyle = "white", _0x1813f9.fill(), _0xfeaaf0.toBuffer("image/jpeg", {
    quality: 0.9
  }));
}
