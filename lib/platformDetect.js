export function getPlatformInfo() {
  if (process.env.HEROKU_APP_NAME || process.env.DYNO || process.env.HEROKU_API_KEY || (process.env.PORT && process.env.PORT !== '3000' && process.env.PORT !== '8080')) {
    return { name: "Heroku", status: "Active", icon: "🦸" };
  }
  if (process.env.RENDER_SERVICE_ID || process.env.RENDER_SERVICE_NAME || process.env.RENDER) {
    return { name: "Render", status: "Active", icon: "⚡" };
  }
  if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME || process.env.RAILWAY_SERVICE_NAME) {
    return { name: "Railway", status: "Active", icon: "🚂" };
  }
  if (process.env.REPL_ID || process.env.REPLIT_DB_URL || process.env.REPLIT_USER || process.env.REPL_SLUG) {
    return { name: "Replit", status: "Active", icon: "🌀" };
  }
  if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL) {
    return { name: "Vercel", status: "Active", icon: "▲" };
  }
  if (process.env.GLITCH_PROJECT_REMIX || process.env.PROJECT_REMIX_CHAIN || process.env.GLITCH) {
    return { name: "Glitch", status: "Active", icon: "🎏" };
  }
  if (process.env.KOYEB_APP || process.env.KOYEB_REGION || process.env.KOYEB_SERVICE) {
    return { name: "Koyeb", status: "Active", icon: "☁️" };
  }
  if (process.env.CYCLIC_URL || process.env.CYCLIC_APP_ID || process.env.CYCLIC_DB) {
    return { name: "Cyclic", status: "Active", icon: "🔄" };
  }
  if (process.env.FLY_APP_NAME || process.env.FLY_REGION) {
    return { name: "Fly.io", status: "Active", icon: "🎈" };
  }
  if (process.env.K_SERVICE || process.env.K_REVISION || process.env.CLOUD_RUN_JOB) {
    return { name: "Cloud Run", status: "Active", icon: "☁️" };
  }
  if (process.env.BASE44_APP_ID || process.env.BASE44_PUBLIC_HOST_SUFFIX) {
    return { name: "Base44", status: "Active", icon: "⚡" };
  }
  if (process.env.PANEL || process.env.PTERODACTYL || (process.env.NODE_ENV === "production" && process.platform === "linux" && !process.env.SSH_CONNECTION)) {
    return { name: "Panel/VPS", status: "Active", icon: "🖥️" };
  }
  if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || (process.platform === "linux" && process.env.USER === "root")) {
    return { name: "VPS/SSH", status: "Active", icon: "🖥️" };
  }
  if (process.platform === "win32") {
    return { name: "Windows PC", status: "Active", icon: "💻" };
  }
  if (process.platform === "darwin") {
    return { name: "MacOS", status: "Active", icon: "🍎" };
  }
  if (process.platform === "linux") {
    return { name: "Linux Local", status: "Active", icon: "🐧" };
  }
  return { name: "Local Machine", status: "Active", icon: "🏠" };
}

export default getPlatformInfo;
