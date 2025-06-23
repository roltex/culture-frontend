import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Ministry of Culture and Sport of Georgia',
      welcome: 'Welcome to the official website',
      loading: 'Loading...',
      error: 'An error occurred',
      readMore: 'Read More',
      viewAll: 'View All',
      apply: 'Apply',
      deadline: 'Deadline',
      status: 'Status',
      contact: 'Contact',
      about: 'About',
      home: 'Home',
      news: 'News',
      projects: 'Projects',
      competitions: 'Competitions',
      vacancies: 'Vacancies',
      legislation: 'Legislation',
      institutions: 'Institutions',
      pressCenter: 'Press Center',
      publicInfo: 'Public Information',
      director: 'Director',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      visitWebsite: 'Visit Website',
      established: 'Established',
      backToInstitutions: 'Back to Institutions',
      noNews: 'No news available',
      noProjects: 'No projects available',
      noInstitutions: 'No institutions available',
      tryAgain: 'Try Again',
      budget: 'Budget'
    },
    header: {
      subtitle: 'Promoting culture, preserving heritage, and developing sports',
      searchPlaceholder: 'Search the website...',
      topBar: {
        emailAddress: 'info@culture.gov.ge',
        phone: '+995 32 2 000 000'
      },
      tryAgain: 'სცადეთ თავიდან',
      budget: 'ბიუჯეტი'
    },
    home: {
      hero: {
        title: 'Ministry of Culture and Sport of Georgia',
        subtitle: 'Promoting culture, preserving heritage, and developing sports in Georgia',
        cta: 'Learn More'
      },
      sections: {
        latestNews: 'Latest News',
        featuredProjects: 'Featured Projects',
        activeCompetitions: 'Competitions\nMinistry Announced',
        currentVacancies: 'Current Vacancies',
        featuredInstitutions: 'Featured Institutions'
      },
      stats: {
        title: 'Our Impact in Numbers',
        subtitle: 'Discover the scale of our cultural and sports initiatives',
        projects: 'Active Projects',
        competitions: 'Open Competitions',
        vacancies: 'Vacancies',
        institutions: 'Subordinate Institutions',
        impact_badge: 'Our Impact',
        main_title_p1: 'Ministry by the ',
        main_title_p2: 'Numbers',
        title_line_1: 'Ministry',
        title_line_2: 'by the Numbers',
        background_text: 'Stats'
      },
      news: {
        subtitle: 'Stay updated with the latest news and announcements from the ministry'
      },
      latest_news: {
        title: 'Latest News',
        background_text: 'NEWS',
        subtitle: 'Stay updated with the latest news and announcements from the ministry',
        view_all: 'View All News'
      },
      projects: {
        title: 'Featured Projects',
        background_text: 'PROJECTS',
        subtitle: 'Explore our ongoing and planned cultural and sports projects',
        view_all: 'View All Projects'
      },
      competitions: {
        subtitle: 'Participate in cultural competitions and opportunities',
        noActive: 'No active competitions at the moment',
        background_text: 'COMPETITIONS'
      },
      institutions: {
        subtitle: 'Discover the organizations and institutions under the Ministry of Culture and Sport',
        carousel_title: 'Our Subordinate Institutions',
        background_text: 'LEPL'
      }
    },
    institutions: {
      title: 'Subordinate Institutions',
      subtitle: 'Discover the organizations and institutions under the Ministry of Culture and Sport',
      about: 'About',
      mission: 'Mission',
      vision: 'Vision',
      contactInfo: 'Contact Information',
      followUs: 'Follow Us',
      filterByType: 'Filter by Type',
      allTypes: 'All Types',
      searchPlaceholder: 'Search institutions...',
      noInstitutions: 'No institutions found',
      showingResults: 'Showing {count} of {total} institutions',
      types: {
        museum: 'Museum',
        educational: 'Educational',
        theater: 'Theater',
        ministry: 'Ministry',
        film: 'Film',
        youth: 'Youth',
        archives: 'Archives',
        library: 'Library',
        medical: 'Medical',
        tourism: 'Tourism',
        academy: 'Academy'
      }
    },
    footer: {
      description: 'The Ministry of Culture and Sport of Georgia is committed to promoting cultural development, preserving national heritage, and fostering sports excellence throughout the country.',
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      socialDescription: 'Stay connected with us on social media for the latest updates and announcements.',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    status: {
      planned: 'Planned',
      ongoing: 'Ongoing',
      completed: 'Completed',
      active: 'Active',
      inactive: 'Inactive',
      featured: 'Featured'
    },
    dates: {
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December'
      },
      months_short: {
        january: 'Jan',
        february: 'Feb',
        march: 'Mar',
        april: 'Apr',
        may: 'May',
        june: 'Jun',
        july: 'Jul',
        august: 'Aug',
        september: 'Sep',
        october: 'Oct',
        november: 'Nov',
        december: 'Dec'
      }
    },
    news: {
      subtitle: 'Stay updated with the latest news and announcements from the ministry',
      description: 'Stay informed with the latest news, announcements, and updates from the Ministry of Culture and Sport of Georgia',
      noNewsDescription: 'No news articles are currently available. Please check back later.',
      backToNews: 'Back to News',
      views: 'views',
      publishedOn: 'Published on',
      otherNews: 'Other News',
      share: 'Share This Article'
    },
    projects: {
      title: 'Projects',
      description: 'Explore our ongoing and planned cultural and sports projects',
      subtitle: 'Discover the scale of our cultural and sports initiatives',
      noProjectsDescription: 'No projects are currently available. Please check back later.',
      backToProjects: 'Back to Projects',
      otherProjects: 'Other Projects'
    },
    common: {
      comingSoon: 'Coming Soon',
      loading: 'Loading...',
      error: 'An error occurred',
      noData: 'No data available'
    },
    general: {
      online: 'Online'
    }
  },
  ka: {
    message: {
      hello: 'საქართველოს კულტურის სამინისტრო',
      welcome: 'კეთილი იყოს თქვენი მობრძანება ოფიციალურ ვებსაიტზე',
      loading: 'იტვირთება...',
      error: 'დაფიქსირდა შეცდომა',
      readMore: 'მეტის ნახვა',
      viewAll: 'ყველას ნახვა',
      apply: 'განაცხადი',
      deadline: 'ვადა',
      status: 'სტატუსი',
      contact: 'კონტაქტი',
      about: 'შესახებ',
      home: 'მთავარი',
      news: 'სიახლეები',
      projects: 'პროექტები',
      competitions: 'კონკურსები',
      vacancies: 'ვაკანსიები',
      legislation: 'კანონმდებლობა',
      institutions: 'სსიპები',
      pressCenter: 'პრეს ცენტრი',
      publicInfo: 'საჯარო ინფორმაცია',
      director: 'დირექტორი',
      address: 'მისამართი',
      phone: 'ტელეფონი',
      email: 'ელ-ფოსტა',
      website: 'ვებსაიტი',
      visitWebsite: 'ვებსაიტზე გადასვლა',
      established: 'დაარსდა',
      backToInstitutions: 'დაწესებულებებზე დაბრუნება',
      noNews: 'სიახლეები არ არის ხელმისაწვდომი',
      noProjects: 'პროექტები არ არის ხელმისაწვდომი',
      noInstitutions: 'დაწესებულებები არ არის ხელმისაწვდომი',
      tryAgain: 'სცადეთ თავიდან',
      budget: 'ბიუჯეტი'
    },
    header: {
      subtitle: 'კულტურის ხელშეწყობა, მემკვიდრეობის შენარჩუნება და სპორტის განვითარება',
      searchPlaceholder: 'ვებსაიტზე ძიება...',
      topBar: {
        emailAddress: 'info@culture.gov.ge',
        phone: '+995 32 2 000 000'
      },
      tryAgain: 'სცადეთ თავიდან',
      budget: 'ბიუჯეტი'
    },
    home: {
      hero: {
        title: 'საქართველოს კულტურის სამინისტრო',
        subtitle: 'კულტურის ხელშეწყობა, მემკვიდრეობის შენარჩუნება და სპორტის განვითარება საქართველოში',
        cta: 'მეტის ნახვა'
      },
      sections: {
        latestNews: 'ბოლო სიახლეები',
        featuredProjects: 'შერჩეული პროექტები',
        activeCompetitions: 'სამინისტროს\nკონკურსები',
        currentVacancies: 'მიმდინარე ვაკანსიები',
        featuredInstitutions: 'შერჩეული დაწესებულებები'
      },
      stats: {
        title: 'ჩვენი გავლენა რიცხვებში',
        subtitle: 'გაიგეთ ჩვენი კულტურული და სპორტული ინიციატივების მასშტაბი',
        projects: 'აქტიური პროექტები',
        competitions: 'ღია კონკურსები',
        vacancies: 'ვაკანსიები',
        institutions: 'სსიპები',
        impact_badge: 'ჩვენი გავლენა',
        main_title_p1: 'სამინისტრო ',
        main_title_p2: 'ციფრებში',
        title_line_1: 'სამინისტრო',
        title_line_2: 'ციფრებში',
        background_text: 'სტატისტიკა'
      },
      news: {
        subtitle: 'თვალყური ადევნეთ სამინისტროს უახლეს სიახლეებს და განცხადებებს'
      },
      latest_news: {
        title: 'ბოლო სიახლეები',
        background_text: 'სიახლეები',
        subtitle: 'იყავით განახლებული სამინისტროს უახლესი ამბებისა და განცხადებების შესახებ',
        view_all: 'ყველა სიახლის ნახვა'
      },
      projects: {
        title: 'გამორჩეული პროექტები',
        background_text: 'პროექტები',
        subtitle: 'გამოიკვლიეთ ჩვენი მიმდინარე და დაგეგმილი კულტურული და სპორტული პროექტები',
        view_all: 'ყველა პროექტის ნახვა'
      },
      competitions: {
        subtitle: 'მიიღეთ მონაწილეობა კულტურულ კონკურსებში და შესაძლებლობებში',
        description: 'მიიღეთ მონაწილეობა კულტურულ კონკურსებში და შესაძლებლობებში',
        noActive: 'ამ მომენტში არ არის აქტიური კონკურსები',
        background_text: 'კონკურსები'
      },
      institutions: {
        subtitle: 'გაიცანით კულტურისა და სპორტის სამინისტროს დაქვემდებარებული ორგანიზაციები და დაწესებულებები',
        carousel_title: 'კულტურის სამინისტროს\nსსიპები',
        background_text: 'სსიპები'
      }
    },
    institutions: {
      title: 'სსიპები',
      subtitle: 'გაიცანით კულტურისა და სპორტის სამინისტროს დაქვემდებარებული ორგანიზაციები და დაწესებულებები',
      about: 'შესახებ',
      mission: 'მისია',
      vision: 'ვიზია',
      contactInfo: 'საკონტაქტო ინფორმაცია',
      followUs: 'გამოგვყევით',
      filterByType: 'ტიპის მიხედვით ფილტრი',
      allTypes: 'ყველა ტიპი',
      searchPlaceholder: 'დაწესებულებების ძიება...',
      noInstitutions: 'დაწესებულებები ვერ მოიძებნა',
      showingResults: 'ნაჩვენებია {count} {total}-დან დაწესებულება',
      types: {
        museum: 'მუზეუმი',
        educational: 'საგანმანათლებლო',
        theater: 'თეატრი',
        ministry: 'სამინისტრო',
        film: 'კინო',
        youth: 'ახალგაზრდობა',
        archives: 'არქივი',
        library: 'ბიბლიოთეკა',
        medical: 'სამედიცინო',
        tourism: 'ტურიზმი',
        academy: 'აკადემია'
      }
    },
    footer: {
      description: 'საქართველოს კულტურის სამინისტრო ეწევა კულტურული განვითარების ხელშეწყობას, ეროვნული მემკვიდრეობის შენარჩუნებას და სპორტული ღირსების ხელშეწყობას მთელი ქვეყნის მასშტაბით.',
      quickLinks: 'სწრაფი ბმულები',
      followUs: 'გამოგვყევით',
      socialDescription: 'დაგვიკავშირდით სოციალურ ქსელებში უახლესი სიახლეებისა და განცხადებების მისაღებად.',
      rights: 'ყველა უფლება დაცულია.',
      privacy: 'კონფიდენციალურობის პოლიტიკა',
      terms: 'სამსახურის პირობები'
    },
    status: {
      planned: 'დაგეგმილი',
      ongoing: 'მიმდინარე',
      completed: 'დასრულებული',
      active: 'აქტიური',
      inactive: 'არააქტიური',
      featured: 'შერჩეული'
    },
    dates: {
      months: {
        january: 'იანვარი',
        february: 'თებერვალი',
        march: 'მარტი',
        april: 'აპრილი',
        may: 'მაისი',
        june: 'ივნისი',
        july: 'ივლისი',
        august: 'აგვისტო',
        september: 'სექტემბერი',
        october: 'ოქტომბერი',
        november: 'ნოემბერი',
        december: 'დეკემბერი'
      },
      months_short: {
        january: 'იან',
        february: 'თებ',
        march: 'მარ',
        april: 'აპრ',
        may: 'მაი',
        june: 'ივნ',
        july: 'ივლ',
        august: 'აგვ',
        september: 'სექ',
        october: 'ოქტ',
        november: 'ნოე',
        december: 'დეკ'
      }
    },
    news: {
      subtitle: 'თვალყური ადევნეთ სამინისტროს უახლეს სიახლეებს და განცხადებებს',
      description: 'გაიგეთ უახლესი სიახლეები, განცხადებები და განახლებები საქართველოს კულტურისა და სპორტის სამინისტროდან',
      noNewsDescription: 'ამ მომენტში სიახლეები არ არის ხელმისაწვდომი. გთხოვთ, მოგვიანებით შეამოწმოთ.',
      backToNews: 'სიახლეების სიაში დაბრუნება',
      views: 'ნახვა',
      publishedOn: 'გამოქვეყნდა',
      otherNews: 'სხვა სიახლეები',
      share: 'სტატიის გაზიარება'
    },
    projects: {
      title: 'პროექტები',
      description: 'გამოიკვლიეთ ჩვენი მიმდინარე და დაგეგმილი კულტურული და სპორტული პროექტები',
      subtitle: 'გაიგეთ ჩვენი კულტურული და სპორტული ინიციატივების მასშტაბი',
      noProjectsDescription: 'ამ მომენტში პროექტები არ არის ხელმისაწვდომი. გთხოვთ, მოგვიანებით შეამოწმოთ.',
      backToProjects: 'პროექტების სიაში დაბრუნება',
      otherProjects: 'სხვა პროექტები'
    },
    common: {
      comingSoon: 'მალე',
      loading: 'იტვირთება...',
      error: 'დაფიქსირდა შეცდომა',
      noData: 'მონაცემები არ არის ხელმისაწვდომი'
    },
    general: {
      online: 'ონლაინ'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'ka',
  fallbackLocale: 'en',
  messages,
})

export default i18n
