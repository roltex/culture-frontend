export const formatDate = (date: Date, locale: string, options: Intl.DateTimeFormatOptions = {}) => {
  return date.toLocaleDateString(locale, options)
}

export const formatTime = (date: Date, locale: string, options: Intl.DateTimeFormatOptions = {}) => {
  return date.toLocaleTimeString(locale, options)
}

export const formatDateTime = (date: Date, locale: string, options: Intl.DateTimeFormatOptions = {}) => {
  return date.toLocaleString(locale, options)
}

// Format event date for cards (short format)
export const formatEventDate = (dateString: string, locale: string) => {
  const date = new Date(dateString)
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Format event time for cards
export const formatEventTime = (dateString: string, locale: string) => {
  const date = new Date(dateString)
  return formatTime(date, locale, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Format selected date for display (full format)
export const formatSelectedDate = (date: Date, locale: string) => {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// Get month names for calendar
export const getMonthNames = (locale: string) => {
  const monthNames = {
    'ka': [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
      'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ],
    'en': [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  }
  return monthNames[locale as keyof typeof monthNames] || monthNames.en
}

// Get weekday names for calendar
export const getWeekdayNames = (locale: string) => {
  const weekdayNames = {
    'ka': ['ორ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'],
    'en': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
  return weekdayNames[locale as keyof typeof weekdayNames] || weekdayNames.en
}

export const getMonthName = (monthIndex: number, locale: string, type: 'short' | 'long' = 'short') => {
  type Locale = 'ka' | 'en';
  const months = {
    ka: {
      short: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
      long: [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
      ]
    },
    en: {
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      long: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    }
  }
  const lang: Locale = (locale === 'ka' ? 'ka' : 'en')
  return months[lang][type][monthIndex]
}

export const formatEventDateLocalized = (dateString: string, locale: string, type: 'short' | 'long' = 'short') => {
  const date = new Date(dateString)
  const day = date.getDate()
  const year = date.getFullYear()
  const monthIndex = date.getMonth()
  const month = getMonthName(monthIndex, locale, type)
  if (locale === 'ka') {
    return `${day} ${month}, ${year}`
  }
  return `${month} ${day}, ${year}`
}

export const getWeekdayName = (weekdayIndex: number, locale: string) => {
  const weekdays = {
    ka: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
  const lang = (locale === 'ka' ? 'ka' : 'en')
  return weekdays[lang][weekdayIndex]
}

export const formatFullEventDateLocalized = (dateString: string, locale: string, type: 'short' | 'long' = 'short') => {
  const date = new Date(dateString)
  const weekday = getWeekdayName(date.getDay(), locale)
  const day = date.getDate()
  const year = date.getFullYear()
  const monthIndex = date.getMonth()
  const month = getMonthName(monthIndex, locale, type)
  if (locale === 'ka') {
    return `${weekday}, ${day} ${month}, ${year}`
  }
  return `${weekday}, ${month} ${day}, ${year}`
} 