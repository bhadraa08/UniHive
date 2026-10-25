import { Post, UserProfile, NotificationItem, HelpOffer, CampusEvent, PopularResource } from '../types';
import {
  bhadraAvatar,
  ananyaAvatar,
  arjunAvatar,
  priyaAvatar,
  rithikAvatar,
  diyaAvatar,
  snehaAvatar
} from '../utils/avatarMap';

export const CURRENT_USER: UserProfile = {
  id: 'user_bhadra',
  name: 'Bhadra',
  tagline: 'Designing thoughtful interfaces & building connected campus communities.',
  department: 'Computer Science & Design',
  year: '3rd Year Undergraduate',
  campus: 'North Campus Hub',
  avatar: bhadraAvatar,
  bio: 'Hey! I study Computer Science & Design. I love UI/UX prototyping, full-stack web builds, and collaborative design hackathons.',
  skills: ['Figma & Prototyping', 'React & TypeScript', 'Design Systems', 'Python', 'User Research'],
  interests: ['Design Thinking', 'Open Source', 'Hackathons', 'Book Clubs', 'Photography'],
  stats: {
    helpsGiven: 14,
    resourcesShared: 9,
    resolutionRate: 98,
    hivePoints: 640
  },
  badges: [
    {
      id: 'b1',
      name: 'Campus Anchor',
      description: 'Helped 10+ students solve critical academic questions',
      iconName: 'ShieldCheck'
    },
    {
      id: 'b2',
      name: 'Knowledge Hive',
      description: 'Shared notes downloaded by over 150 campus peers',
      iconName: 'BookOpen'
    },
    {
      id: 'b3',
      name: 'Hackathon Collaborator',
      description: 'Successfully formed and competed with 3 multidisciplinary teams',
      iconName: 'Users'
    },
    {
      id: 'b4',
      name: 'Good Samaritan',
      description: 'Reunited 2 lost personal items with their rightful owners',
      iconName: 'Sparkles'
    }
  ],
  privacy: {
    showEmail: true,
    allowDirectMessages: true,
    campusVisibility: true
  }
};

export const INITIAL_HELP_OFFERS: Record<string, HelpOffer[]> = {
  'post_help_1': [
    {
      id: 'offer_1',
      postId: 'post_help_1',
      authorId: 'user_priya',
      authorName: 'Priya Sharma',
      authorAvatar: priyaAvatar,
      authorDept: 'Data Science & AI',
      authorYear: '4th Year',
      message: 'Hey Ananya! The key mental model for SQL joins is treating LEFT JOIN as preservation of the base table. Happy to explain it over at the Library 2nd floor study nook around 4 PM!',
      createdAt: '1 hour ago',
      accepted: false
    }
  ]
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_help_1',
    type: 'request',
    title: 'Looking for help understanding SQL joins',
    description: "I'm struggling with SQL joins, especially the difference between inner join, left join and right join. If anyone could explain it with simple examples or share notes, it would be really helpful!",
    category: 'Computer Science',
    tags: ['DBMS', 'SQL', 'Study'],
    author: {
      id: 'user_ananya',
      name: 'Ananya S',
      avatar: ananyaAvatar,
      department: 'Computer Science',
      year: '2nd Year',
      reputationScore: 320,
      badge: 'Active Peer'
    },
    createdAt: '2h ago',
    status: 'open',
    urgency: 'high',
    deadline: 'Tomorrow, 5:00 PM',
    responsesCount: 4,
    savesCount: 15,
    likesCount: 15,
    isSaved: false
  },
  {
    id: 'post_res_1',
    type: 'resource',
    title: 'DBMS revision notes (KTU S5)',
    description: 'Short and crisp notes covering all important topics. Hope it helps!',
    category: 'Computer Science',
    tags: ['DBMS', 'Notes'],
    author: {
      id: 'user_diya',
      name: 'Diya M',
      avatar: diyaAvatar,
      department: 'Information Technology',
      year: '3rd Year',
      reputationScore: 480,
      badge: 'Top Contributor'
    },
    createdAt: '4h ago',
    status: 'open',
    responsesCount: 5,
    savesCount: 28,
    likesCount: 28,
    isSaved: true,
    resourceDetails: {
      fileType: 'pdf',
      fileName: 'DBMS_Revision_KTU_S5.pdf',
      fileSize: '3.4 MB',
      downloadsCount: 142,
      previewSummary: 'Covers relational algebra, ER diagrams, normalization (1NF-BCNF), and SQL queries with examples.',
      courseCode: 'CS 301'
    }
  },
  {
    id: 'post_team_1',
    type: 'team',
    title: 'Looking for a UI/UX designer for college fest',
    description: "We're building a website for the upcoming fest. Need a creative UI/UX designer who can work with a small team.",
    category: 'Design & Tech',
    tags: ['UI/UX', 'Design', 'Team'],
    author: {
      id: 'user_rithik',
      name: 'Rithik R',
      avatar: rithikAvatar,
      department: 'Electronics & Comm',
      year: '3rd Year',
      reputationScore: 410,
      badge: 'Lead Organizer'
    },
    createdAt: '6h ago',
    status: 'open',
    deadline: 'Closes Friday',
    responsesCount: 3,
    savesCount: 12,
    likesCount: 12,
    isSaved: false,
    teamDetails: {
      projectName: 'Aura Fest 2026 Portal',
      event: 'Annual Cultural & Tech Fest',
      rolesNeeded: ['UI/UX Designer', 'Motion Designer'],
      totalSpots: 3,
      filledSpots: 2,
      deadline: 'Oct 28',
      applicants: [
        {
          id: 'app_1',
          name: 'Bhadra',
          avatar: bhadraAvatar,
          role: 'UI/UX Designer',
          message: 'Would love to design the interactive events portal!',
          date: 'Yesterday'
        }
      ]
    }
  },
  {
    id: 'post_lost_1',
    type: 'lost-found',
    title: 'Found a student ID card near the library',
    description: "It has the name 'Adithya S' on it. Please DM me if it's yours.",
    category: 'Campus Life',
    tags: ['Lost & Found', 'ID Card'],
    author: {
      id: 'user_sneha',
      name: 'Sneha K',
      avatar: snehaAvatar,
      department: 'Biotechnology',
      year: '2nd Year',
      reputationScore: 290
    },
    createdAt: '8h ago',
    status: 'open',
    responsesCount: 2,
    savesCount: 7,
    likesCount: 7,
    isSaved: false,
    lostFoundDetails: {
      itemType: 'found',
      itemCategory: 'IDs & Cards',
      location: 'Main Library 1st Floor Desk',
      dateReported: 'Today, 11:30 AM',
      contactDropoff: 'Left at security desk',
      isReunited: false
    }
  },
  {
    id: 'post_res_2',
    type: 'resource',
    title: 'Python Data Structures Cheat Sheet',
    description: 'Concise reference sheet for Python lists, dictionaries, sets, tuples, and time complexities.',
    category: 'Computer Science',
    tags: ['Python', 'Data Structures', 'Cheat Sheet'],
    author: {
      id: 'user_arjun_n',
      name: 'Arjun Nair',
      avatar: arjunAvatar,
      department: 'Computer Science',
      year: '4th Year',
      reputationScore: 560,
      badge: 'Hackathon Winner'
    },
    createdAt: '1d ago',
    status: 'open',
    responsesCount: 8,
    savesCount: 42,
    likesCount: 42,
    isSaved: false,
    resourceDetails: {
      fileType: 'cheatsheet',
      fileName: 'Python_DS_Cheatsheet.pdf',
      fileSize: '1.2 MB',
      downloadsCount: 310,
      previewSummary: 'Covers list comprehensions, dict methods, heap queue, bisect, and Big-O lookup complexities.',
      courseCode: 'CS 202'
    }
  },
  {
    id: 'post_res_3',
    type: 'resource',
    title: 'UniDesign — Campus Mobile UI Kit',
    description: 'Figma design tokens, responsive cards, and mobile navigation components built for student hackathons.',
    category: 'Design & Tech',
    tags: ['Figma', 'UI/UX', 'Design System'],
    author: {
      id: 'user_sneha_k',
      name: 'Sneha K',
      avatar: snehaAvatar,
      department: 'Biotechnology',
      year: '2nd Year',
      reputationScore: 290
    },
    createdAt: '2d ago',
    status: 'open',
    responsesCount: 12,
    savesCount: 65,
    likesCount: 65,
    isSaved: true,
    resourceDetails: {
      fileType: 'figma',
      fileName: 'UniDesign_Tokens_v2.fig',
      fileSize: '8.4 MB',
      downloadsCount: 520,
      previewSummary: 'Complete component set including dream pastel cards, badges, modal dialogs, and navigation bars.',
      linkUrl: 'https://figma.com/@campus-unihive'
    }
  },
  {
    id: 'post_res_4',
    type: 'resource',
    title: 'DBMS End-Semester Question Bank with Solutions',
    description: 'Past 5 years solved university question papers covering relational calculus, ACID, concurrency, and B+ trees.',
    category: 'Computer Science',
    tags: ['DBMS', 'Question Bank', 'Exams'],
    author: {
      id: 'user_rithik_r',
      name: 'Rithik R',
      avatar: rithikAvatar,
      department: 'Electronics & Comm',
      year: '3rd Year',
      reputationScore: 410,
      badge: 'Lead Organizer'
    },
    createdAt: '3d ago',
    status: 'open',
    responsesCount: 19,
    savesCount: 88,
    likesCount: 88,
    isSaved: false,
    resourceDetails: {
      fileType: 'pdf',
      fileName: 'DBMS_Solved_QuestionBank_2022-2025.pdf',
      fileSize: '5.1 MB',
      downloadsCount: 780,
      previewSummary: 'Step-by-step solutions to normalization problems, transaction conflict serializability, and SQL queries.',
      courseCode: 'CS 301'
    }
  },
  {
    id: 'post_team_2',
    type: 'team',
    title: 'Need a teammate for our upcoming hackathon',
    description: "We're a team of 2 looking for 1 more member. We're building a web app and need someone with good frontend skills. DM if interested!",
    category: 'Computer Science',
    tags: ['Hackathon', 'Web Development', 'Teammate'],
    author: {
      id: 'user_arjun',
      name: 'Arjun Nair',
      avatar: arjunAvatar,
      department: 'Computer Science',
      year: '4th Year',
      reputationScore: 560,
      badge: 'Hackathon Winner'
    },
    createdAt: '10h ago',
    status: 'open',
    deadline: 'Registration closes in 3 days',
    responsesCount: 6,
    savesCount: 18,
    likesCount: 18,
    isSaved: false,
    teamDetails: {
      projectName: 'GreenHive Energy Tracker',
      event: 'GreenHacks 2026',
      rolesNeeded: ['Frontend Dev (React)', 'Pitch Presenter'],
      totalSpots: 3,
      filledSpots: 2,
      deadline: 'Oct 30',
      applicants: []
    }
  }
];

export const UPCOMING_EVENTS: CampusEvent[] = [
  {
    id: 'evt_1',
    title: 'Campus Hackathon 2025',
    date: 'Apr 12',
    location: 'CSE Block',
    action: 'Register',
    registered: false
  },
  {
    id: 'evt_2',
    title: 'Tech Talk: Building Products',
    date: 'Apr 18',
    location: 'Seminar Hall',
    action: 'Save',
    registered: false
  },
  {
    id: 'evt_3',
    title: 'Design Workshop',
    date: 'Apr 24',
    location: 'CS Lab',
    action: 'Save',
    registered: false
  }
];

export const POPULAR_RESOURCES: PopularResource[] = [
  {
    id: 'pop_1',
    title: 'Operating Systems Notes',
    author: 'Meera',
    views: '2.4k views',
    fileType: 'pdf',
    postId: 'post_res_1'
  },
  {
    id: 'pop_2',
    title: 'Python Cheat Sheet',
    author: 'Arjun',
    views: '1.8k views',
    fileType: 'cheatsheet',
    postId: 'post_res_2'
  },
  {
    id: 'pop_3',
    title: 'Figma UI Kit',
    author: 'Sneha',
    views: '1.2k views',
    fileType: 'figma',
    postId: 'post_res_3'
  },
  {
    id: 'pop_4',
    title: 'DBMS Question Bank',
    author: 'Rithik',
    views: '980 views',
    fileType: 'pdf',
    postId: 'post_res_4'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'help_offer',
    title: 'New Help Offer',
    message: 'Priya Sharma offered to help with your SQL joins question at the Library.',
    timestamp: '1 hour ago',
    read: false,
    postId: 'post_help_1',
    actorAvatar: priyaAvatar
  },
  {
    id: 'notif_2',
    type: 'welcome',
    title: 'Welcome to UniHive',
    message: 'Your campus community is active. Explore notes, ask questions, and connect with peers.',
    timestamp: 'Yesterday',
    read: true
  }
];
