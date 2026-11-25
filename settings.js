export default {
  update: {
    autoCheck: false,
    checkInterval: 6,
    autoDownload: false,
    backupBeforeUpdate: true,
    method: "git",
    repository: {
      main: "https://github.com/peace-amani/norah",
      owner: "https://github.com/peace-amani/norah"
    },
    timeouts: {
      download: 120000,
      extraction: 180000,
      copy: 300000,
      preserve: 30000
    },
    behavior: {
      preserveSession: true,
      preserveConfig: true,
      preserveData: true,
      skipNodeModules: true,
      installDeps: true,
      restartAfterUpdate: true
    }
  }
};
