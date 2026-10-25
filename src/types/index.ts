export type PostType = 'request' | 'offer' | 'resource' | 'team' | 'lost-found';

export type PostStatus = 'open' | 'help_offered' | 'resolved' | 'closed';

export type UrgencyLevel = 'normal' | 'high' | 'urgent';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  department: string;
  year: string;
  reputationScore: number;
  badge?: string;
}

export interface HelpOffer {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDept: string;
  authorYear: string;
  message: string;
  createdAt: string;
  accepted?: boolean;
}

export interface ResourceDetails {
  fileType: 'pdf' | 'figma' | 'code' | 'slides' | 'cheatsheet';
  fileName: string;
  fileSize: string;
  downloadsCount: number;
  previewSummary: string;
  linkUrl?: string;
  courseCode?: string;
  semester?: string;
}

export interface TeamDetails {
  projectName: string;
  event: string;
  rolesNeeded: string[];
  totalSpots: number;
  filledSpots: number;
  deadline?: string;
  applicants: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    message: string;
    date: string;
  }[];
}

export interface LostFoundDetails {
  itemType: 'lost' | 'found';
  itemCategory: 'Electronics' | 'IDs & Cards' | 'Personal Accessories' | 'Stationery & Books' | 'Clothing & Bags';
  location: string;
  dateReported: string;
  contactDropoff: string;
  isReunited?: boolean;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: Author;
  createdAt: string;
  status: PostStatus;
  urgency?: UrgencyLevel;
  deadline?: string;
  resolvedBy?: string;
  resolvedNote?: string;
  responsesCount: number;
  savesCount: number;
  likesCount?: number;
  isSaved?: boolean;
  isLiked?: boolean;
  resourceDetails?: ResourceDetails;
  teamDetails?: TeamDetails;
  lostFoundDetails?: LostFoundDetails;
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  action: 'Register' | 'Save';
  registered?: boolean;
}

export interface PopularResource {
  id: string;
  title: string;
  author: string;
  views: string;
  fileType: string;
  postId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  tagline: string;
  department: string;
  year: string;
  campus: string;
  avatar: string;
  bio: string;
  skills: string[];
  interests: string[];
  stats: {
    helpsGiven: number;
    resourcesShared: number;
    resolutionRate: number;
    hivePoints: number;
  };
  badges: Badge[];
  privacy: {
    showEmail: boolean;
    allowDirectMessages: boolean;
    campusVisibility: boolean;
  };
}

export interface NotificationItem {
  id: string;
  type: 'help_offer' | 'resolved' | 'team_applied' | 'resource_download' | 'welcome';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  postId?: string;
  actorAvatar?: string;
}

export type TabType = 'discover' | 'ask' | 'resources' | 'teams' | 'lost-found' | 'activity' | 'profile';
