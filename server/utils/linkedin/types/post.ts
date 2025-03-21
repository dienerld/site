export interface RequestPost {
  author: string
  commentary?: string // new api
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
  }
  distribution?: Distribution
  lifecycleState: string
  isReshareDisabledByAuthor?: boolean // new api
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string
      }
      shareMediaCategory: 'ARTICLE' | 'NONE'
      media?: {
        status: 'READY'
        originalUrl: string
      }[]
    }
  }
}

export interface Distribution {
  feedDistribution: string
  targetEntities: any[]
  thirdPartyDistributionChannels: any[]
}
