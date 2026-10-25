import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { UserAvatar } from '../common/UserAvatar';
import { ILLUSTRATED_AVATARS } from '../../utils/avatarMap';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Edit3, 
  Save, 
  RotateCcw, 
  GraduationCap,
  Play,
  LogOut,
  Check
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile, resetAllDataToDefault, replayIntro, logout } = useUniHive();
  const { isDark } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [department, setDepartment] = useState(userProfile.department);
  const [year, setYear] = useState(userProfile.year);
  const [bio, setBio] = useState(userProfile.bio);
  const [tagline, setTagline] = useState(userProfile.tagline);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [skills, setSkills] = useState<string[]>(userProfile.skills);
  const [interests, setInterests] = useState<string[]>(userProfile.interests);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      avatar: avatar,
      department: department.trim(),
      year: year.trim(),
      bio: bio.trim(),
      tagline: tagline.trim(),
      skills,
      interests
    });
    setIsEditing(false);
  };

  const addSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const s = newSkill.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const addInterest = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const i = newInterest.trim();
    if (i && !interests.includes(i)) {
      setInterests([...interests, i]);
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Card Header */}
      <div className={`page-header-reveal rounded-3xl border p-6 md:p-8 shadow-card relative overflow-hidden transition-all ${
        isDark 
          ? 'bg-plum-surface border-plum-border' 
          : 'bg-surface border-borderSubtle'
      }`}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-lavender/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <UserAvatar
                src={isEditing ? avatar : userProfile.avatar}
                name={name}
                size="2xl"
                className="border-4 border-surface shadow-card"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-plum text-terracotta flex items-center justify-center border-2 border-surface shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-xl md:text-2xl text-content-primary">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-terracotta/20 text-terracotta border border-terracotta/30">
                  ★ {userProfile.stats.hivePoints} Karma
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs md:text-sm text-content-secondary mt-1">
                <GraduationCap className="w-4 h-4 text-lavender shrink-0" />
                <span>{userProfile.department}</span>
                <span>•</span>
                <span>{userProfile.year}</span>
              </div>

              <p className="text-xs text-content-secondary mt-1.5 font-medium max-w-md">
                {userProfile.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-subtle ${
                  isDark
                    ? 'bg-lavender text-plum-dark hover:bg-parchment'
                    : 'bg-plum text-parchment hover:bg-plum-hover'
                }`}
              >
                <Save className="w-4 h-4 text-terracotta" />
                <span>Save Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface border border-borderSubtle hover:border-lavender text-content-primary text-xs font-semibold transition-all shadow-subtle"
              >
                <Edit3 className="w-3.5 h-3.5 text-lavender" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Community Impact Stats Row */}
      <div className="page-cards-stagger grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className={`p-4 rounded-2xl border shadow-subtle text-center ${
          isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
        }`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-content-muted block">
            Helps Given
          </span>
          <span className="font-display font-extrabold text-2xl text-terracotta mt-1 block">
            {userProfile.stats.helpsGiven}
          </span>
          <span className="text-[10px] text-content-secondary">Peer questions solved</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-subtle text-center ${
          isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
        }`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-content-muted block">
            Resources Shared
          </span>
          <span className="font-display font-extrabold text-2xl text-lavender mt-1 block">
            {userProfile.stats.resourcesShared}
          </span>
          <span className="text-[10px] text-content-secondary">Study guides & notes</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-subtle text-center ${
          isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
        }`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-content-muted block">
            Resolution Rate
          </span>
          <span className="font-display font-extrabold text-2xl text-success mt-1 block">
            {userProfile.stats.resolutionRate}%
          </span>
          <span className="text-[10px] text-content-secondary">Successful help loops</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-subtle text-center ${
          isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
        }`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-content-muted block">
            Hive Points
          </span>
          <span className="font-display font-extrabold text-2xl text-terracotta mt-1 block">
            {userProfile.stats.hivePoints}
          </span>
          <span className="text-[10px] text-content-secondary">Top 5% student rank</span>
        </div>
      </div>

      {/* Profile Details Edit / View Form */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className={`rounded-3xl border p-6 space-y-5 shadow-card ${
          isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
        }`}>
          <div>
            <h3 className="font-display font-bold text-base text-content-primary">
              Edit Campus Identity
            </h3>
            <p className="text-xs text-content-secondary mt-0.5">
              Personalize your fictional student profile and choose your illustrated 2D avatar.
            </p>
          </div>

          {/* Illustrated Avatar Selector */}
          <div className="p-4 rounded-2xl border border-borderSubtle/70 bg-surface-subtle/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-content-primary">
                Choose Illustrated Avatar
              </label>
              <span className="text-[11px] text-content-secondary font-medium">
                2D Dreamy Editorial Art Style
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {ILLUSTRATED_AVATARS.map(av => {
                const isSelected = avatar === av.src;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.src)}
                    className={`flex flex-col items-center p-2 rounded-2xl border transition-all text-center group ${
                      isSelected
                        ? 'border-lavender ring-2 ring-lavender/40 bg-lavender/10 shadow-xs scale-[1.03]'
                        : 'border-borderSubtle/60 hover:border-lavender/60 bg-surface'
                    }`}
                    title={av.description}
                  >
                    <div className="relative">
                      <img
                        src={av.src}
                        alt={av.name}
                        className="w-12 h-12 rounded-full object-cover border border-lavender/30 group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lavender text-plum-dark flex items-center justify-center text-[10px] shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-semibold mt-1.5 truncate max-w-full ${
                      isSelected ? 'text-lavender font-bold' : 'text-content-secondary'
                    }`}>
                      {av.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1">
                Year of Study
              </label>
              <input
                type="text"
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1">
                Short Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-content-primary mb-1">
              About & Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
            />
          </div>

          {/* Interactive Skills & Interests in Edit Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1">
                Skills & Tech Stack
              </label>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Add skill (press Enter)..."
                  className="flex-1 px-3 py-1.5 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    isDark ? 'bg-lavender text-plum-dark' : 'bg-plum text-parchment'
                  }`}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-surface-subtle text-content-primary border border-borderSubtle"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="text-error hover:text-error/80 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1">
                Campus Interests & Hobbies
              </label>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={e => setNewInterest(e.target.value)}
                  onKeyDown={addInterest}
                  placeholder="Add interest (press Enter)..."
                  className="flex-1 px-3 py-1.5 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    isDark ? 'bg-lavender text-plum-dark' : 'bg-plum text-parchment'
                  }`}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {interests.map(i => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-surface-subtle text-content-secondary border border-borderSubtle"
                  >
                    #{i}
                    <button
                      type="button"
                      onClick={() => removeInterest(i)}
                      className="text-error hover:text-error/80 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-borderSubtle/60">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-content-secondary hover:bg-lavender/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-semibold ${
                isDark ? 'bg-lavender text-plum-dark hover:bg-parchment' : 'bg-plum text-parchment hover:bg-plum-hover'
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className={`rounded-3xl border p-6 space-y-4 shadow-subtle ${
          isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
        }`}>
          <h3 className="font-display font-bold text-base text-content-primary">
            About Me
          </h3>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            {userProfile.bio}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-borderSubtle/60">
            {/* Skills */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-content-muted block mb-2">
                Technical Skills & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userProfile.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-surface-subtle text-content-primary border border-borderSubtle"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-content-muted block mb-2">
                Campus Interests & Activities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userProfile.interests.map(interest => (
                  <span
                    key={interest}
                    className="px-2.5 py-1 rounded-xl text-xs font-medium bg-surface-subtle text-content-secondary border border-borderSubtle"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badges Earned */}
      <div className={`rounded-3xl border p-6 shadow-subtle space-y-4 ${
        isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
      }`}>
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-terracotta" />
          <h3 className="font-display font-bold text-base text-content-primary">
            Campus Recognition Badges
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {userProfile.badges.map(b => (
            <div
              key={b.id}
              className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center shrink-0 border border-terracotta/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-content-primary">
                  {b.name}
                </h4>
                <p className="text-[11px] text-content-secondary mt-0.5 leading-snug">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competition Demo & Settings Controls */}
      <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
      }`}>
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-content-primary flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-lavender" />
            Competition Showcase Controls
          </h4>
          <p className="text-xs text-content-secondary mt-0.5">
            Replay the introductory brand animation, reset local demo data, or sign out to test authentication.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={replayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-borderSubtle hover:border-lavender text-xs font-semibold text-content-primary bg-surface transition-colors"
          >
            <Play className="w-3 h-3 text-terracotta" />
            <span>Replay Intro</span>
          </button>

          <button
            onClick={() => setIsResetDialogOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-borderSubtle hover:border-lavender text-xs font-semibold text-content-primary bg-surface transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-lavender" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-error/30 text-error hover:bg-error/10 text-xs font-semibold bg-surface transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={isResetDialogOpen}
        title="Reset Competition Demo Data"
        message="This will restore all sample posts, test help requests, and notifications to the default competition showcase state."
        confirmLabel="Reset"
        onConfirm={() => {
          resetAllDataToDefault();
          setIsResetDialogOpen(false);
        }}
        onCancel={() => setIsResetDialogOpen(false)}
      />

      <ConfirmationDialog
        isOpen={isLogoutDialogOpen}
        title="Sign Out of UniHive"
        message="Are you sure you want to log out? You will return to the welcome and authentication screen."
        confirmLabel="Log Out"
        isDestructive={true}
        onConfirm={() => {
          setIsLogoutDialogOpen(false);
          logout();
        }}
        onCancel={() => setIsLogoutDialogOpen(false)}
      />
    </div>
  );
};
