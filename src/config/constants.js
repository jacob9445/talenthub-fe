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

export const CONTACT_METHOD_TYPES = [
  {
    value: 'Skype',
    display: 'Skype'
  },
  {
    value: 'Whatsapp',
    display: 'Whatsapp'
  }
]

export const CLIENT_TYPE_OPTIONS = [
  {
    value: CLIENT_TYPES.COMPANY,
    display: 'Company'
  },
  {
    value: CLIENT_TYPES.INDIVIDUAL,
    display: 'Individual'
  }
]

export const PROJECT_TYPE = {
  BUDGET: 1,
  HOULYFT: 2,
  HOULYPT: 3,
  CONTRACT: 4
}

export const PROJECT_TYPE_LABELS = {
  [PROJECT_TYPE.BUDGET]: 'Budget',
  [PROJECT_TYPE.HOULYFT]: 'Houly FT',
  [PROJECT_TYPE.HOULYPT]: 'Houly PT',
  [PROJECT_TYPE.CONTRACT]: 'Contract'
}

export const PROJECT_TYPE_OPTIONS = [
  {
    value: PROJECT_TYPE.BUDGET,
    display: 'Budget'
  },
  {
    value: PROJECT_TYPE.HOULYFT,
    display: 'Houly FT'
  },
  {
    value: PROJECT_TYPE.HOULYPT,
    display: 'Houly PT'
  },
  {
    value: PROJECT_TYPE.CONTRACT,
    display: 'Contract'
  }
]

export const PROJECT_STATUS = {
  ONGOING: 1,
  PAUSED: 2,
  ENDED: 3
}

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.ONGOING]: 'Ongoing',
  [PROJECT_STATUS.PAUSED]: 'Paused',
  [PROJECT_STATUS.ENDED]: 'Ended'
}

export const PROJECT_STATUS_OPTIONS = [
  {
    value: PROJECT_STATUS.ONGOING,
    display: 'Ongoing'
  },
  {
    value: PROJECT_STATUS.PAUSED,
    display: 'Paused'
  },
  {
    value: PROJECT_STATUS.ENDED,
    display: 'Ended'
  }
]
