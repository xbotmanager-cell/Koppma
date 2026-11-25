import {sendSubMenu, getBotName} from '../../lib/menuHelper.js';
import {UI, SOCIAL, MEDIA, BRAND} from '../../lib/emojis.js';
export default {
  name: "aimenu",
  description: 'AI\x20Commands\x20Menu',
  category: 'ai',
  aliases: ["aihelp", 'ai-cmds'],
  async execute(_0x85d023, _0xbf6210, _0x4f7bf4, _0x4d485b, _0x19f024) {
    const _0x5c4585 = _0xbf6210.key.remoteJid, _0x79d356 = getBotName(), _0x3ee7b3 = "╭─⊷ *" + UI.SEARCH + '\x20AI\x20SCANNERS\x20&\x20ANALYZERS*\x0a│\x0a│\x20\x20•\x20aiscanner\x0a│\x20\x20•\x20analyze\x0a│\x20\x20•\x20removebg\x0a│\x20\x20•\x20summarize\x0a│\x20\x20•\x20vision\x0a│\x20\x20•\x20visionpro\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*' + SOCIAL.BOT + " MAJOR AI MODELS*\n│\n│  • bard\n│  • bing\n│  • blackbox\n│  • chatgpt\n│  • claudeai\n│  • cohere\n│  • copilot\n│  • deepseek\n│  • deepseekv4\n│  • flux\n│  • gemini\n│  • gemma\n│  • glm\n│  • gpt\n│  • grok\n│  • groq\n│  • ilama\n│  • kimi\n│  • metai\n│  • mistral\n│  • notegpt\n│  • notegpt-deepseek\n│  • notegpt-pro\n│  • perplexity\n│  • qwenai\n│  • venice\n│  • wormgpt\n│\n╰─⊷\n\n╭─⊷ *" + UI.BRAIN + '\x20OPEN\x20SOURCE\x20AI\x20MODELS*\x0a│\x0a│\x20\x20•\x20chatglm\x0a│\x20\x20•\x20codellama\x0a│\x20\x20•\x20command\x0a│\x20\x20•\x20dolphin\x0a│\x20\x20•\x20falcon\x0a│\x20\x20•\x20internlm\x0a│\x20\x20•\x20mixtral\x0a│\x20\x20•\x20nemotron\x0a│\x20\x20•\x20neural\x0a│\x20\x20•\x20nous\x0a│\x20\x20•\x20openchat\x0a│\x20\x20•\x20openhermes\x0a│\x20\x20•\x20orca\x0a│\x20\x20•\x20phi\x0a│\x20\x20•\x20replitai\x0a│\x20\x20•\x20solar\x0a│\x20\x20•\x20starcoder\x0a│\x20\x20•\x20tinyllama\x0a│\x20\x20•\x20vicuna\x0a│\x20\x20•\x20wizard\x0a│\x20\x20•\x20yi\x0a│\x20\x20•\x20zephyr\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*' + MEDIA.DESIGN + " AI IMAGE GENERATION*\n│\n│  • brandlogo\n│  • companylogo\n│  • logoai\n│  • suno\n│\n╰─⊷\n\n╭─⊷ *" + UI.NOTE + " WRITING & CONTENT*\n│\n│  • humanizer\n│  • speechwriter\n│\n╰─⊷\n\n╭─⊷ *" + BRAND.WOLF + " WOLF AI ASSISTANT*\n│\n│  • wolf on/off — Toggle Wolf AI\n│  • wolf status — Show Wolf AI stats\n│  • wolf clear — Reset conversations\n│  ───────────────\n│  When active, just say \"wolf\"\n│  followed by anything to chat!\n│\n╰─⊷";
    await sendSubMenu(_0x85d023, _0x5c4585, SOCIAL.BOT + " AI MENU", _0x3ee7b3, _0xbf6210, _0x4d485b);
  }
};
