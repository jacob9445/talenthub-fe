export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/'

export const ROLES = {
  ADMIN: 1,
  TEAM_MANAGER: 2,
  DEVELOPER: 3
}

export const URL_PREFIXES = {
  [ROLES.ADMIN]: 'admin',
  [ROLES.TEAM_MANAGER]: 'team-manager',
  [ROLES.DEVELOPER]: 'developer'
}

export const PROFILE_TYPES = {
  SELF: 1,
  PARTNER: 2
}

export const GENDER = {
  MALE: 1,
  FEMALE: 2
}

export const PLATFORMS = {
  EMAIL: 'email',
  SKYPE: 'skype',
  SLACK: 'slack',
  MS_TEAM: 'ms_team',
  GITHUB: 'github',
  BITBUCKET: 'bitbucket'
}

export const PLATFORM_LABELS = {
  [PLATFORMS.EMAIL]: 'Email',
  [PLATFORMS.SKYPE]: 'Skype',
  [PLATFORMS.SLACK]: 'Slack',
  [PLATFORMS.MS_TEAM]: 'MS Team',
  [PLATFORMS.GITHUB]: 'Github',
  [PLATFORMS.BITBUCKET]: 'Bitbucket'
}

export const CLIENT_TYPES = {
  INDIVIDUAL: 1,
  COMPANY: 2
}

export const CLIENT_TYPE_LABELS = {
  [CLIENT_TYPES.INDIVIDUAL]: 'Individual',
  [CLIENT_TYPES.COMPANY]: 'Company'
}
