export interface ResponseUserInfo {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
  email: string
  email_verified: boolean
}

export interface ResponseProfile {
  firstName: {
    localized: Localized
    preferredLocale: PreferredLocale
  }
  localizedFirstName: string
  headline: Headline
  localizedHeadline: string
  vanityName: string
  id: string
  lastName: LastName
  localizedLastName: string
  profilePicture: ProfilePicture
}

export interface Headline {
  localized: Localized
  preferredLocale: PreferredLocale
}

interface Localized {
  en_US: string
}

interface PreferredLocale {
  country: string
  language: string
}

export interface LastName {
  localized: Localized
  preferredLocale: PreferredLocale
}

export interface ProfilePicture {
  displayImage: string
}
