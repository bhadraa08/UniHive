import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from '../common/UserAvatar';
import { PostType, UrgencyLevel } from '../../types';
import { 
  X, 
  HelpCircle, 
  HandHeart, 
  BookOpen, 
  Users, 
  MapPin, 
  Sparkles, 
  AlertCircle,
  Eye,
  Check
} from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const { 
    isCreateModalOpen, 
    setIsCreateModalOpen, 
    createModalInitialType, 
    createPost,
    userProfile 
  } = useUniHive();

  const { isDark } = useTheme();

  const [postType, setPostType] = useState<PostType>(createModalInitialType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Campus']);
  const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
  const [deadline, setDeadline] = useState('');

  // Resource specific
  const [resFileType, setResFileType] = useState<'pdf' | 'figma' | 'code' | 'slides' | 'cheatsheet'>('pdf');
  const [resFileName, setResFileName] = useState('');
  const [resCourseCode, setResCourseCode] = useState('');

  // Team specific
  const [projectName, setProjectName] = useState('');
  const [teamEvent, setTeamEvent] = useState('');
  const [rolesNeededInput, setRolesNeededInput] = useState('');
  const [totalSpots, setTotalSpots] = useState(4);

  // Lost & Found specific
  const [lfType, setLfType] = useState<'lost' | 'found'>('lost');
  const [lfCategory, setLfCategory] = useState<'Electronics' | 'IDs & Cards' | 'Personal Accessories' | 'Stationery & Books' | 'Clothing & Bags'>('Electronics');
  const [lfLocation, setLfLocation] = useState('');
  const [lfDropoff, setLfDropoff] = useState('');

  // Validation & Preview
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreview, setIsPreview] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Computer Science');
    setTagInput('');
    setTags(['Campus']);
    setUrgency('normal');
    setDeadline('');
    setResFileName('');
    setResCourseCode('');
    setProjectName('');
    setTeamEvent('');
    setRolesNeededInput('');
    setTotalSpots(4);
    setLfType('lost');
    setLfCategory('Electronics');
    setLfLocation('');
    setLfDropoff('');
    setErrors({});
    setIsPreview(false);
  };

  const [prevType, setPrevType] = useState(createModalInitialType);
  if (prevType !== createModalInitialType) {
    setPrevType(createModalInitialType);
    setPostType(createModalInitialType);
  }

  const handleClose = () => {
    resetForm();
    setIsCreateModalOpen(false);
  };

  if (!isCreateModalOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, '');
      if (clean && !tags.includes(clean)) {
        setTags([...tags, clean]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) {
      errs.title = 'Title is required.';
    } else if (title.trim().length < 8) {
      errs.title = 'Title should be at least 8 characters.';
    }

    if (!description.trim()) {
      errs.description = 'Please provide a clear description.';
    } else if (description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters.';
    }

    if (postType === 'lost-found' && !lfLocation.trim()) {
      errs.lfLocation = 'Approximate campus location is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createPost({
      type: postType,
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags.length > 0 ? tags : ['Campus'],
      urgency,
      deadline: deadline.trim() || undefined,
      resourceDetails: postType === 'resource' ? {
        fileType: resFileType,
        fileName: resFileName.trim() || `${title.replace(/\s+/g, '_').slice(0, 25)}.pdf`,
        fileSize: '3.4 MB',
        downloadsCount: 0,
        previewSummary: description.trim().slice(0, 160),
        courseCode: resCourseCode.trim() || 'CS300',
        semester: 'Autumn Term'
      } : undefined,
      teamDetails: postType === 'team' ? {
        projectName: projectName.trim() || title.trim(),
        event: teamEvent.trim() || 'Campus Initiative',
        rolesNeeded: rolesNeededInput ? rolesNeededInput.split(',').map(r => r.trim()).filter(Boolean) : ['Frontend Dev', 'Designer'],
        totalSpots: Number(totalSpots) || 4,
        filledSpots: 1,
        deadline: deadline.trim() || 'This Friday',
        applicants: []
      } : undefined,
      lostFoundDetails: postType === 'lost-found' ? {
        itemType: lfType,
        itemCategory: lfCategory,
        location: lfLocation.trim() || 'Campus Center',
        dateReported: 'Just now',
        contactDropoff: lfDropoff.trim() || 'Drop off / inquiry via UniHive message thread',
        isReunited: false
      } : undefined
    });
    resetForm();
  };

  const categories = [
    'Computer Science',
    'Design & Tech',
    'Mathematics',
    'Engineering',
    'Campus Life',
    'Business & Economics',
    'Arts & Humanities'
  ];

  const typeConfig: { id: PostType; label: string; icon: React.FC<any>; desc: string }[] = [
    { id: 'request', label: 'Ask for Help', icon: HelpCircle, desc: 'Academic homework or campus questions' },
    { id: 'offer', label: 'Offer Help', icon: HandHeart, desc: 'Tutor or mentor fellow students' },
    { id: 'resource', label: 'Share Resource', icon: BookOpen, desc: 'Publish handwritten revision notes & guides' },
    { id: 'team', label: 'Find Teammates', icon: Users, desc: 'Recruit for hackathons & group projects' },
    { id: 'lost-found', label: 'Lost & Found', icon: MapPin, desc: 'Report misplaced or recovered campus items' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div 
        className={`relative z-10 rounded-3xl max-w-2xl w-full shadow-float border flex flex-col max-h-[92vh] overflow-hidden animate-scaleUp transition-all ${
          isDark 
            ? 'bg-plum-surface border-plum-border text-parchment' 
            : 'bg-surface border-borderSubtle text-plum'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-plum-border bg-plum-elevated/60' : 'border-borderSubtle bg-surface-subtle'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lavender/20 text-lavender flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-terracotta" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-content-primary">
                Create a Campus Post
              </h2>
              <p className="text-xs text-content-secondary">
                Your post will be visible across the {userProfile.campus}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isPreview 
                  ? 'bg-lavender text-plum-dark' 
                  : 'bg-surface border border-borderSubtle text-content-secondary hover:text-content-primary'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isPreview ? 'Edit Form' : 'Preview'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl text-content-muted hover:text-content-primary hover:bg-lavender/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {isPreview ? (
            /* Live Preview Mode */
            <div className="space-y-4">
              <div className="p-3 bg-terracotta/10 border border-terracotta/30 rounded-2xl text-xs text-terracotta flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>This is how your post will appear in the campus activity feed.</span>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar
                      src={userProfile.avatar}
                      name={userProfile.name}
                      size="md"
                    />
                    <div>
                      <span className="text-xs font-bold text-content-primary block">
                        {userProfile.name}
                      </span>
                      <span className="text-[10px] text-content-secondary">
                        {userProfile.department} • Just now
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-lavender text-plum-dark">
                    {postType.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-content-primary">
                  {title || 'Untitled Post'}
                </h3>

                <p className="text-xs text-content-secondary leading-relaxed">
                  {description || 'No description provided yet.'}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-surface border border-borderSubtle text-content-secondary">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Form Mode */
            <form id="createPostForm" onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Post Type Tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-content-secondary mb-2">
                  Select Post Intent
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {typeConfig.map(t => {
                    const Icon = t.icon;
                    const isSelected = postType === t.id;

                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setPostType(t.id);
                          setErrors({});
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? isDark
                              ? 'bg-lavender text-plum-dark border-lavender shadow-xs'
                              : 'bg-plum text-parchment border-plum shadow-xs'
                            : 'bg-surface border-borderSubtle text-content-primary hover:border-lavender hover:bg-lavender/5'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-terracotta' : 'text-lavender'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-terracotta" />}
                        </div>
                        <div className="font-semibold text-xs leading-tight">
                          {t.label}
                        </div>
                        <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'opacity-80' : 'text-content-muted'}`}>
                          {t.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Title <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={
                    postType === 'request'
                      ? 'e.g. Need help understanding recursive dynamic programming'
                      : postType === 'resource'
                      ? 'e.g. CS202 Data Structures Midterm Handwritten Cheatsheet'
                      : postType === 'team'
                      ? 'e.g. Looking for a Frontend Dev & UI Designer for GreenHacks'
                      : postType === 'lost-found'
                      ? 'e.g. Found: Student ID Card & Keyfob in Central Library'
                      : 'e.g. Offering free review sessions for Calculus II'
                  }
                  className={`w-full px-3.5 py-2.5 text-xs md:text-sm bg-surface border rounded-xl text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.title 
                      ? 'border-error focus:ring-error/20' 
                      : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
                  }`}
                />
                {errors.title && (
                  <p className="text-[11px] text-error mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Description & Context <span className="text-error">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide context, what you have tried, what you need, and any relevant details..."
                  className={`w-full px-3.5 py-2.5 text-xs md:text-sm bg-surface border rounded-xl text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.description 
                      ? 'border-error focus:ring-error/20' 
                      : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-error mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Contextual Fields: Help Request */}
              {postType === 'request' && (
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl border ${
                  isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
                }`}>
                  <div>
                    <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                      Urgency Level
                    </label>
                    <select
                      value={urgency}
                      onChange={e => setUrgency(e.target.value as UrgencyLevel)}
                      className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                    >
                      <option value="normal">Normal (Flexible)</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent (Exam / Due Soon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                      Target Deadline (Optional)
                    </label>
                    <input
                      type="text"
                      value={deadline}
                      onChange={e => setDeadline(e.target.value)}
                      placeholder="e.g. Tomorrow 5 PM, Before Midterm"
                      className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                    />
                  </div>
                </div>
              )}

              {/* Contextual Fields: Resource */}
              {postType === 'resource' && (
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl border ${
                  isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
                }`}>
                  <div>
                    <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                      Resource Format
                    </label>
                    <select
                      value={resFileType}
                      onChange={e => setResFileType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="figma">Figma Design Kit</option>
                      <option value="cheatsheet">Cheatsheet</option>
                      <option value="code">Code Repository</option>
                      <option value="slides">Slide Deck</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                      Course Code
                    </label>
                    <input
                      type="text"
                      value={resCourseCode}
                      onChange={e => setResCourseCode(e.target.value)}
                      placeholder="e.g. CS301, MATH204"
                      className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                      File Name / Note Title
                    </label>
                    <input
                      type="text"
                      value={resFileName}
                      onChange={e => setResFileName(e.target.value)}
                      placeholder="e.g. DBMS_Notes_v2.pdf"
                      className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                    />
                  </div>
                </div>
              )}

              {/* Contextual Fields: Teammates */}
              {postType === 'team' && (
                <div className={`space-y-3 p-3.5 rounded-2xl border ${
                  isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                        Event / Hackathon Name
                      </label>
                      <input
                        type="text"
                        value={teamEvent}
                        onChange={e => setTeamEvent(e.target.value)}
                        placeholder="e.g. GreenHacks 2026, Senior Capstone"
                        className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                        Total Team Size
                      </label>
                      <input
                        type="number"
                        min={2}
                        max={8}
                        value={totalSpots}
                        onChange={e => setTotalSpots(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                      Roles Needed (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={rolesNeededInput}
                      onChange={e => setRolesNeededInput(e.target.value)}
                      placeholder="e.g. UI/UX Designer, React Dev, Pitch Presenter"
                      className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                    />
                  </div>
                </div>
              )}

              {/* Contextual Fields: Lost & Found */}
              {postType === 'lost-found' && (
                <div className={`space-y-3 p-3.5 rounded-2xl border ${
                  isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                        Report Type
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLfType('lost')}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                            lfType === 'lost' 
                              ? 'bg-terracotta/20 text-terracotta border-terracotta' 
                              : 'bg-surface text-content-secondary border-borderSubtle'
                          }`}
                        >
                          I Lost Something
                        </button>
                        <button
                          type="button"
                          onClick={() => setLfType('found')}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                            lfType === 'found' 
                              ? 'bg-success/20 text-success border-success' 
                              : 'bg-surface text-content-secondary border-borderSubtle'
                          }`}
                        >
                          I Found Something
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-content-secondary mb-1">
                        Item Category
                      </label>
                      <select
                        value={lfCategory}
                        onChange={e => setLfCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary"
                      >
                        <option value="Electronics">Electronics (Laptops, Chargers, Audio)</option>
                        <option value="IDs & Cards">IDs, Cards & Wallet</option>
                        <option value="Personal Accessories">Personal Accessories & Keys</option>
                        <option value="Stationery & Books">Stationery & Textbooks</option>
                        <option value="Clothing & Bags">Clothing, Jackets & Bags</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-content-primary mb-1">
                      Campus Location <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={lfLocation}
                      onChange={e => setLfLocation(e.target.value)}
                      placeholder="e.g. Central Library Ground Floor, Engineering Quad Bench #3"
                      className={`w-full px-3 py-2 text-xs bg-surface border rounded-xl text-content-primary ${
                        errors.lfLocation ? 'border-error' : 'border-borderSubtle'
                      }`}
                    />
                    {errors.lfLocation && (
                      <p className="text-[11px] text-error mt-1">{errors.lfLocation}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Category & Tags Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1">
                    Academic / Campus Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1">
                    Tags (Press Enter to add)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="e.g. DBMS, Midterm, Figma"
                    className="w-full px-3 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
                  />
                </div>
              </div>

              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-subtle text-content-primary border border-borderSubtle"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="text-content-muted hover:text-content-primary"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between gap-3 ${
          isDark ? 'border-plum-border bg-plum-elevated/60' : 'border-borderSubtle bg-surface-subtle'
        }`}>
          <div className="text-[11px] text-content-secondary hidden sm:block">
            UniHive posts encourage constructive peer collaboration.
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-lavender/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="createPostForm"
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-subtle flex items-center gap-1.5 ${
                isDark
                  ? 'bg-lavender text-plum-dark hover:bg-parchment'
                  : 'bg-plum text-parchment hover:bg-plum-hover'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Publish Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
