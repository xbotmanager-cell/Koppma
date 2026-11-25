export const OWNER = 'peace-amani';
export const REPO = 'norah';
export const BRANCH = "main";
export const FULL_NAME = OWNER + '/' + REPO;
export const PROFILE_URL = "https://github.com/" + OWNER;
export const REPO_URL = "https://github.com/" + OWNER + '/' + REPO;
export const REPO_GIT = REPO_URL + ".git";
export const REPO_ZIP = REPO_URL + "/archive/HEAD.zip";
export const STAR_URL = REPO_URL + "/stargazers";
export const FORK_URL = REPO_URL + "/fork";
export const AVATAR_URL = 'https://github.com/' + OWNER + ".png";
export const API_URL = 'https://api.github.com/repos/' + OWNER + '/' + REPO;
export default {
  OWNER: OWNER,
  REPO: REPO,
  BRANCH: BRANCH,
  FULL_NAME: FULL_NAME,
  PROFILE_URL: PROFILE_URL,
  REPO_URL: REPO_URL,
  REPO_GIT: REPO_GIT,
  REPO_ZIP: REPO_ZIP,
  STAR_URL: STAR_URL,
  FORK_URL: FORK_URL,
  AVATAR_URL: AVATAR_URL,
  API_URL: API_URL
};
