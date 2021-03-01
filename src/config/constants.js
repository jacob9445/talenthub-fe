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

export const FINANCIALREQUEST_TYPE = {
  SENDINVOICE: 1,
  SENDPAYMENT: 2,
  RECEIVEPAYMENT: 3,
  REFUNDPAYMENT: 4
}

export const FINANCIALREQUEST_TYPE_LABELS = {
  [FINANCIALREQUEST_TYPE.SENDINVOICE]: 'Send Invoice',
  [FINANCIALREQUEST_TYPE.SENDPAYMENT]: 'Send Payment',
  [FINANCIALREQUEST_TYPE.RECEIVEPAYMENT]: 'Receive Payment',
  [FINANCIALREQUEST_TYPE.REFUNDPAYMENT]: 'Refund Payment'
}

export const FINANCIALREQUEST_TYPE_OPTIONS = [
  {
    value: FINANCIALREQUEST_TYPE.SENDINVOICE,
    display: 'Send Invoice'
  },
  {
    value: FINANCIALREQUEST_TYPE.SENDPAYMENT,
    display: 'Send Payment'
  },
  {
    value: FINANCIALREQUEST_TYPE.RECEIVEPAYMENT,
    display: 'Receive Payment'
  },
  {
    value: FINANCIALREQUEST_TYPE.REFUNDPAYMENT,
    display: 'Refund Payment'
  }
]

export const FINANCIALREQUEST_STATUS = {
  PENDING: 1,
  APPROVED: 2,
  DECLINED: 3,
  CANCELED: 4
}

export const FINANCIALREQUEST_STATUS_LABELS = {
  [FINANCIALREQUEST_STATUS.PENDING]: 'Pending',
  [FINANCIALREQUEST_STATUS.APPROVED]: 'Approved',
  [FINANCIALREQUEST_STATUS.DECLINED]: 'Declined',
  [FINANCIALREQUEST_STATUS.CANCELED]: 'Canceled'
}

export const FINANCIALREQUEST_STATUS_OPTIONS = [
  {
    value: FINANCIALREQUEST_STATUS.PENDING,
    display: 'Pending'
  },
  {
    value: FINANCIALREQUEST_STATUS.APPROVED,
    display: 'Approved'
  },
  {
    value: FINANCIALREQUEST_STATUS.DECLINED,
    display: 'Declined'
  },
  {
    value: FINANCIALREQUEST_STATUS.CANCELED,
    display: 'Canceled'
  }
]

export const FINANCIALREQUEST_COUNTER_PARTY_TYPE = {
  CLIENT: 6,
  PARTNER: 8
}

export const FINANCIALREQUEST_COUNTER_PARTY_OPTIONS = [
  {
    value: FINANCIALREQUEST_COUNTER_PARTY_TYPE.CLIENT,
    display: 'Client'
  },
  {
    value: FINANCIALREQUEST_COUNTER_PARTY_TYPE.PARTNER,
    display: 'Partner'
  }
]

export const PAYMENT_PLATFORM_TYPE = {
  PAYPAL: 'paypal',
  PAYONEER: 'payoneer',
  UPWORK: 'upwork',
  FREELANCER: 'freelancer',
  TOPTAL: 'toptal'
}

export const PAYMENT_PLATFORM_OPTIONS = [
  {
    value: PAYMENT_PLATFORM_TYPE.PAYPAL,
    display: 'Paypal'
  },
  {
    value: PAYMENT_PLATFORM_TYPE.PAYONEER,
    display: 'Payoneer'
  },
  {
    value: PAYMENT_PLATFORM_TYPE.UPWORK,
    display: 'Upwork'
  },
  {
    value: PAYMENT_PLATFORM_TYPE.FREELANCER,
    display: 'Freelancer'
  },
  {
    value: PAYMENT_PLATFORM_TYPE.TOPTAL,
    display: 'Toptal'
  }
]

export const platformOptions = [
  {
    display: 'Email',
    value: PLATFORMS.EMAIL
  },
  {
    display: 'Skype',
    value: PLATFORMS.SKYPE
  },
  {
    display: 'Slack',
    value: PLATFORMS.SLACK
  },
  {
    display: 'MS Team',
    value: PLATFORMS.MS_TEAM
  },
  {
    display: 'Github',
    value: PLATFORMS.GITHUB
  },
  {
    display: 'Bitbucket',
    value: PLATFORMS.BITBUCKET
  }
]

export const profileTypeOptions = [
  {
    display: 'Self',
    value: PROFILE_TYPES.SELF
  },
  {
    display: 'Partner',
    value: PROFILE_TYPES.PARTNER
  }
]

export const genderOptions = [
  {
    display: 'Male',
    value: GENDER.MALE
  },
  {
    display: 'Female',
    value: GENDER.FEMALE
  }
]

export const profile_type_patterns = [
  {
    id: 0,
    role: null,
    color: ''
  },
  {
    id: PROFILE_TYPES.SELF,
    type: 'Self',
    color: 'success'
  },
  {
    id: PROFILE_TYPES.PARTNER,
    type: 'Partner',
    color: 'info'
  }
]

export const gender_patterns = {
  [GENDER.MALE]: 'Male',
  [GENDER.FEMALE]: 'Female'
}

export const periodOptions = [
  {
    value: 'weekly',
    label: 'This Week'
  },
  {
    value: 'monthly',
    label: 'This Month'
  },
  {
    value: 'quarterly',
    label: 'This Quarter'
  },
  {
    value: 'custom',
    label: 'Custom'
  }
]
