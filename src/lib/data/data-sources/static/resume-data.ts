import type { ExperienceItem } from '@/lib/models/experience-item'
import { type RecommendationItem } from '@/lib/models/recommendation-item'

const educationData: ExperienceItem[] = [
  {
    startedDate: '2009',
    endDate: '2015',
    position: 'Software Engineering',
    site: 'Universidad Nacional de Colombia',
    description:
      'I learned the basics of programming and software engineering. I participated in the development of a few projects, including as assistant teacher.',
    image: '/static/images/unal.jpeg'
  }
]

const recommendationData: RecommendationItem[] = [
  {
    name: 'Ben Le Cun',
    position: 'Software Engineer & Tech Advisor',
    description:
      'What impresses me the most about James isn’t his strong technical knowledge in mobile development, dart and flutter, but his fearlessness to learn and work with new technologies. He is passionate and curious on top of being deeply technical. He’s a strong engineer and architect that can help any engineering team step up their game, and he’s a real pleasure to work with. His ability to deliver on hard technical problems makes him an invaluable member of our team.',
    image: '/static/images/ben_le_cun.jpeg'
  }
]

const languages = {
  esp: { icon: '🇪🇸', label: 'Spanish', percent: 100 },
  eng: { icon: '🇺🇸', label: 'English', percent: 80 }
}

export { languages, educationData, recommendationData }