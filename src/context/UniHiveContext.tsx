import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  Post, 
  UserProfile, 
  NotificationItem, 
  HelpOffer, 
  TabType, 
  PostType 
} from '../types';
import { 
  CURRENT_USER, 
  INITIAL_POSTS, 
  INITIAL_HELP_OFFERS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { getIllustratedAvatar } from '../utils/avatarMap';
import { deriveDisplayNameFromEmail } from '../utils/userUtils';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'celebrate' | 'warning';
  title: string;
  message: string;
}

interface UniHiveContextType {
  // Auth & Journey State
  isAuthenticated: boolean;
  introSeen: boolean;
  loginDemoUser: (email: string) => void;
  registerDemoUser: (userData: {
    name?: string;
    email: string;
    college?: string;
    department?: string;
    year?: string;
  }) => void;
  logout: () => void;
  replayIntro: () => void;
  completeIntro: () => void;

  // Navigation & View
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Modals & Panels
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  createModalInitialType: PostType;
  openCreateModalWithType: (type: PostType) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Data
  posts: Post[];
  userProfile: UserProfile;
  helpOffers: Record<string, HelpOffer[]>;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;

  // Actions
  createPost: (postData: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  offerHelp: (postId: string, message: string) => void;
  resolvePost: (postId: string, helperName?: string, note?: string) => void;
  applyForTeam: (postId: string, role: string, message: string) => void;
  claimLostFound: (postId: string, message: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetAllDataToDefault: () => void;

  // Toasts
  toasts: Toast[];
  removeToast: (id: string) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const STORAGE_KEYS = {
  POSTS: 'unihive_posts_v4',
  PROFILE: 'unihive_profile_v4',
  OFFERS: 'unihive_offers_v4',
  NOTIFS: 'unihive_notifs_v4',
  AUTH: 'unihive_auth_session_v4',
  AUTH_EMAIL: 'unihive_auth_email_v4',
  INTRO: 'unihive_intro_seen_v4'
};

const UniHiveContext = createContext<UniHiveContextType | undefined>(undefined);

export const UniHiveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Journey & Auth State
  const [introSeen, setIntroSeen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.INTRO) === 'true';
    } catch {
      return false;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Navigation State with browser history synchronization
  const [activeTab, setActiveTabState] = useState<TabType>(() => {
    try {
      const hash = window.location.hash.replace('#', '') as TabType;
      const validTabs: TabType[] = ['discover', 'ask', 'resources', 'teams', 'lost-found', 'activity', 'profile'];
      if (validTabs.includes(hash)) return hash;
    } catch {}
    return 'discover';
  });

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(prev => {
      if (prev !== tab) {
        try {
          window.history.pushState({ tab }, '', `#${tab}`);
        } catch {}
      }
      return tab;
    });
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const validTabs: TabType[] = ['discover', 'ask', 'resources', 'teams', 'lost-found', 'activity', 'profile'];
      let targetTab: TabType = 'discover';
      if (event.state && event.state.tab && validTabs.includes(event.state.tab)) {
        targetTab = event.state.tab;
      } else {
        const hash = window.location.hash.replace('#', '') as TabType;
        if (validTabs.includes(hash)) targetTab = hash;
      }
      setActiveTabState(targetTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Overlay State
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createModalInitialType, setCreateModalInitialType] = useState<PostType>('request');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persistent Domain State with automatic Illustrated Avatar migration
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (stored) {
        const parsed = JSON.parse(stored) as Post[];
        return parsed.map(p => ({
          ...p,
          author: {
            ...p.author,
            avatar: getIllustratedAvatar(p.author?.avatar, p.author?.name)
          },
          teamDetails: p.teamDetails ? {
            ...p.teamDetails,
            applicants: p.teamDetails.applicants?.map(a => ({
              ...a,
              avatar: getIllustratedAvatar(a.avatar, a.name)
            })) || []
          } : undefined
        }));
      }
    } catch (e) {
      console.warn('Failed reading posts from localStorage', e);
    }
    return INITIAL_POSTS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const isAuth = localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
      const storedEmail = localStorage.getItem(STORAGE_KEYS.AUTH_EMAIL);
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);

      // Authenticated user's email is the single source of truth
      if (isAuth && storedEmail) {
        const derivedName = deriveDisplayNameFromEmail(storedEmail);
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile) as UserProfile;
          return {
            ...parsed,
            name: derivedName, // Strictly derived from authenticated email
            email: storedEmail,
            avatar: getIllustratedAvatar(parsed.avatar, derivedName)
          };
        }
        return {
          ...CURRENT_USER,
          id: 'user_' + storedEmail.replace(/[^a-zA-Z0-9]/g, '_'),
          name: derivedName,
          email: storedEmail,
          avatar: getIllustratedAvatar(null, derivedName)
        };
      }

      if (storedProfile) {
        const parsed = JSON.parse(storedProfile) as UserProfile;
        const email = parsed.email || storedEmail;
        if (email) {
          const derivedName = deriveDisplayNameFromEmail(email);
          return {
            ...parsed,
            name: derivedName,
            email,
            avatar: getIllustratedAvatar(parsed.avatar, derivedName)
          };
        }
        return {
          ...parsed,
          avatar: getIllustratedAvatar(parsed.avatar, parsed.name)
        };
      }
    } catch (e) {
      console.warn('Failed reading profile from localStorage', e);
    }
    return CURRENT_USER;
  });

  const [helpOffers, setHelpOffers] = useState<Record<string, HelpOffer[]>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, HelpOffer[]>;
        const migrated: Record<string, HelpOffer[]> = {};
        for (const [k, offers] of Object.entries(parsed)) {
          migrated[k] = offers.map(o => ({
            ...o,
            authorAvatar: getIllustratedAvatar(o.authorAvatar, o.authorName)
          }));
        }
        return migrated;
      }
    } catch (e) {
      console.warn('Failed reading offers from localStorage', e);
    }
    return INITIAL_HELP_OFFERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFS);
      if (stored) {
        const parsed = JSON.parse(stored) as NotificationItem[];
        return parsed.map(n => ({
          ...n,
          actorAvatar: n.actorAvatar ? getIllustratedAvatar(n.actorAvatar) : undefined
        }));
      }
    } catch (e) {
      console.warn('Failed reading notifications from localStorage', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(helpOffers));
    } catch (e) {
      console.error(e);
    }
  }, [helpOffers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Keep selectedPost in sync with posts list changes
  useEffect(() => {
    if (selectedPost) {
      const updated = posts.find(p => p.id === selectedPost.id);
      if (updated && updated !== selectedPost) {
        setSelectedPost(updated);
      }
    }
  }, [posts, selectedPost]);

  // Toast Helpers
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast: Toast = { ...toast, id };
    setToasts(prev => [newToast, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Intro Controls
  const completeIntro = () => {
    setIntroSeen(true);
    try {
      sessionStorage.setItem(STORAGE_KEYS.INTRO, 'true');
    } catch {
      // safe fallback
    }
  };

  const replayIntro = () => {
    setIntroSeen(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.INTRO);
    } catch {
      // safe fallback
    }
  };

  // Auth Controls
  const loginDemoUser = (email: string) => {
    const cleanEmail = email?.trim() || 'bhadra@campus.edu';
    const derivedName = deriveDisplayNameFromEmail(cleanEmail);

    const updatedProfile: UserProfile = {
      ...CURRENT_USER,
      id: 'user_' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'),
      name: derivedName,
      email: cleanEmail,
      avatar: getIllustratedAvatar(null, derivedName),
      tagline: `Student exploring campus opportunities.`
    };

    setUserProfile(updatedProfile);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.AUTH_EMAIL, cleanEmail);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
    } catch {
      // safe
    }
    setActiveTab('discover');
    addToast({
      type: 'celebrate',
      title: `Welcome back, ${derivedName}!`,
      message: 'Connected to your campus hive. Explore open requests or share notes.'
    });
  };

  const registerDemoUser = (userData: {
    name?: string;
    email: string;
    college?: string;
    department?: string;
    year?: string;
  }) => {
    const cleanEmail = userData.email?.trim() || '';
    const derivedName = deriveDisplayNameFromEmail(cleanEmail);

    const newProfile: UserProfile = {
      ...CURRENT_USER,
      id: 'user_' + Date.now(),
      name: derivedName, // Always derive display name from email
      email: cleanEmail,
      avatar: getIllustratedAvatar(null, derivedName),
      department: userData.department || 'Computer Science & Engineering',
      year: userData.year || '1st Year Undergraduate',
      campus: userData.college || 'North Campus Hub University',
      tagline: `Student at ${userData.college || 'North Campus Hub University'} exploring ${userData.department || 'academics'}.`,
      stats: {
        helpsGiven: 0,
        resourcesShared: 0,
        resolutionRate: 100,
        hivePoints: 50 // Welcome bonus
      }
    };

    setUserProfile(newProfile);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.AUTH_EMAIL, cleanEmail);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    } catch {
      // safe
    }
    setActiveTab('discover');

    // Add celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B7A4D4', '#D58D78', '#39283F', '#F3E8D8', '#92B99A']
      });
    } catch {
      // safe
    }

    addToast({
      type: 'celebrate',
      title: `Welcome to UniHive, ${derivedName}! 🎉`,
      message: 'Your campus profile is ready. You received +50 Welcome Hive Points!'
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem(STORAGE_KEYS.AUTH_EMAIL);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } catch {
      // safe
    }
    setUserProfile(CURRENT_USER);
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have signed out of your UniHive campus session.'
    });
  };

  const openCreateModalWithType = (type: PostType) => {
    setCreateModalInitialType(type);
    setIsCreateModalOpen(true);
  };

  // Create Post Action
  const createPost = (postData: Partial<Post>) => {
    const id = 'post_' + Date.now();
    const newPost: Post = {
      id,
      type: postData.type || 'request',
      title: postData.title || 'Untitled Request',
      description: postData.description || '',
      category: postData.category || 'Computer Science',
      tags: postData.tags && postData.tags.length > 0 ? postData.tags : ['Campus'],
      author: {
        id: userProfile.id,
        name: userProfile.name,
        avatar: userProfile.avatar,
        department: userProfile.department,
        year: userProfile.year,
        reputationScore: userProfile.stats.hivePoints,
        badge: userProfile.badges[0]?.name
      },
      createdAt: 'Just now',
      status: 'open',
      urgency: postData.urgency || 'normal',
      deadline: postData.deadline,
      responsesCount: 0,
      savesCount: 0,
      isSaved: false,
      resourceDetails: postData.resourceDetails,
      teamDetails: postData.teamDetails,
      lostFoundDetails: postData.lostFoundDetails
    };

    setPosts(prev => [newPost, ...prev]);

    // Update profile stats if it's a resource
    if (newPost.type === 'resource') {
      setUserProfile(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          resourcesShared: prev.stats.resourcesShared + 1,
          hivePoints: prev.stats.hivePoints + 25
        }
      }));
    }

    addToast({
      type: 'success',
      title: 'Post Published to Campus!',
      message: `Your ${newPost.type === 'request' ? 'help request' : newPost.type} is now visible to peers.`
    });

    setIsCreateModalOpen(false);
  };

  // Delete Post Action
  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
    addToast({
      type: 'info',
      title: 'Post Removed',
      message: 'Your post was successfully deleted from UniHive.'
    });
  };

  // Toggle Save Post Action
  const toggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          return {
            ...p,
            isSaved,
            savesCount: isSaved ? p.savesCount + 1 : Math.max(0, p.savesCount - 1)
          };
        }
        return p;
      })
    );

    const post = posts.find(p => p.id === postId);
    const willBeSaved = !post?.isSaved;
    addToast({
      type: 'info',
      title: willBeSaved ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
      message: willBeSaved ? 'Accessible anytime in My Activity.' : 'Removed from your saved items.'
    });
  };

  // Toggle Like Post Action
  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          const currentLikes = p.likesCount || 0;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1)
          };
        }
        return p;
      })
    );
  };

  // SIGNATURE INTERACTION: The Help Loop - Step 1: Offer Help
  const offerHelp = (postId: string, message: string) => {
    const offerId = 'offer_' + Date.now();
    const newOffer: HelpOffer = {
      id: offerId,
      postId,
      authorId: userProfile.id,
      authorName: userProfile.name,
      authorAvatar: userProfile.avatar,
      authorDept: userProfile.department,
      authorYear: userProfile.year,
      message,
      createdAt: 'Just now',
      accepted: false
    };

    // Store offer
    setHelpOffers(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newOffer]
    }));

    // Update post status and response counter
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'help_offered',
            responsesCount: p.responsesCount + 1
          };
        }
        return p;
      })
    );

    // Update user stats
    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        helpsGiven: prev.stats.helpsGiven + 1,
        hivePoints: prev.stats.hivePoints + 20
      }
    }));

    // Add notification for the requester
    const targetPost = posts.find(p => p.id === postId);
    if (targetPost) {
      const newNotif: NotificationItem = {
        id: 'notif_' + Date.now(),
        type: 'help_offer',
        title: `Help offered by ${userProfile.name}!`,
        message: `Response on "${targetPost.title.slice(0, 45)}...": "${message.slice(0, 60)}..."`,
        timestamp: 'Just now',
        read: false,
        postId: postId,
        actorAvatar: userProfile.avatar
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    addToast({
      type: 'success',
      title: 'Help Offer Sent!',
      message: 'The requester has been notified. You earned +20 Hive Points for supporting a peer!'
    });
  };

  // SIGNATURE INTERACTION: The Help Loop - Step 2: Mark Request Resolved
  const resolvePost = (postId: string, helperName?: string, note?: string) => {
    // Trigger celebratory confetti in Velvet Lavender colors
    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#B7A4D4', '#D58D78', '#39283F', '#F3E8D8', '#92B99A']
      });
    } catch {
      // fallback safe
    }

    const defaultHelper = helperName || 'a campus peer';
    const resolutionNote = note || `Resolved successfully with generous help from ${defaultHelper}.`;

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'resolved',
            resolvedBy: defaultHelper,
            resolvedNote: resolutionNote
          };
        }
        return p;
      })
    );

    // Update profile hive points & resolution rate
    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        hivePoints: prev.stats.hivePoints + 35
      }
    }));

    // Add notification to celebrate
    const newNotif: NotificationItem = {
      id: 'notif_res_' + Date.now(),
      type: 'resolved',
      title: 'Request Marked as Resolved! 🎉',
      message: resolutionNote,
      timestamp: 'Just now',
      read: false,
      postId: postId
    };
    setNotifications(prev => [newNotif, ...prev]);

    addToast({
      type: 'celebrate',
      title: 'Request Closed & Resolved! 🎉',
      message: `Loop completed! Campus gets stronger when students support one another. +35 Hive Points.`
    });
  };

  // Teammate discovery interaction
  const applyForTeam = (postId: string, role: string, message: string) => {
    const applicant = {
      id: 'app_' + Date.now(),
      name: userProfile.name,
      avatar: userProfile.avatar,
      role,
      message,
      date: 'Just now'
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId && p.teamDetails) {
          return {
            ...p,
            responsesCount: p.responsesCount + 1,
            teamDetails: {
              ...p.teamDetails,
              applicants: [applicant, ...p.teamDetails.applicants]
            }
          };
        }
        return p;
      })
    );

    addToast({
      type: 'success',
      title: 'Interest Expressed!',
      message: `You applied for the "${role}" role. The project lead has received your note.`
    });
  };

  // Lost & Found Claim / Contact
  const claimLostFound = (postId: string, _message: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            responsesCount: p.responsesCount + 1
          };
        }
        return p;
      })
    );

    addToast({
      type: 'info',
      title: 'Verification Message Sent',
      message: 'Your inquiry has been relayed to the reporter and campus security desk.'
    });
  };

  // Update Profile
  const updateProfile = (updatedFields: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedFields
    }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your campus identity and preferences have been saved.'
    });
  };

  // Notification actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.'
    });
  };

  const resetAllDataToDefault = () => {
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.OFFERS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFS);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH_EMAIL);
    setPosts(INITIAL_POSTS);
    setUserProfile(CURRENT_USER);
    setHelpOffers(INITIAL_HELP_OFFERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    addToast({
      type: 'info',
      title: 'Reset to Sample Data',
      message: 'UniHive is restored to its pristine initial competition demo state.'
    });
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <UniHiveContext.Provider
      value={{
        isAuthenticated,
        introSeen,
        loginDemoUser,
        registerDemoUser,
        logout,
        replayIntro,
        completeIntro,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedPost,
        setSelectedPost,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createModalInitialType,
        openCreateModalWithType,
        isNotificationsOpen,
        setIsNotificationsOpen,
        posts,
        userProfile,
        helpOffers,
        notifications,
        unreadNotificationsCount,
        createPost,
        deletePost,
        toggleSavePost,
        toggleLikePost,
        offerHelp,
        resolvePost,
        applyForTeam,
        claimLostFound,
        updateProfile,
        markNotificationRead,
        markAllNotificationsRead,
        resetAllDataToDefault,
        toasts,
        removeToast,
        addToast
      }}
    >
      {children}
    </UniHiveContext.Provider>
  );
};

export const useUniHive = () => {
  const context = useContext(UniHiveContext);
  if (!context) {
    throw new Error('useUniHive must be used within a UniHiveProvider');
  }
  return context;
};
