import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { BadgePill } from '../common/BadgePill';
import { UserAvatar } from '../common/UserAvatar';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { 
  X, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  MapPin, 
  Download, 
  Send, 
  Trash2, 
  HelpCircle,
  FileText
} from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { 
    selectedPost: rawSelectedPost, 
    setSelectedPost, 
    toggleSavePost, 
    offerHelp, 
    resolvePost, 
    applyForTeam, 
    claimLostFound,
    deletePost, 
    userProfile, 
    helpOffers,
    addToast 
  } = useUniHive();

  const { isDark } = useTheme();

  const [offerMessage, setOfferMessage] = useState('');
  const [teamRoleSelected, setTeamRoleSelected] = useState('');
  const [teamApplyMessage, setTeamApplyMessage] = useState('');
  const [claimMessage, setClaimMessage] = useState('');
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHelperForResolve, setSelectedHelperForResolve] = useState('');

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPost(null);
      setIsClosing(false);
    }, 200);
  };

  if (!rawSelectedPost) return null;
  const selectedPost = rawSelectedPost;

  const isAuthor = selectedPost.author?.id === userProfile.id;
  const offersForThisPost = helpOffers[selectedPost.id] || [];

  const handleSendHelpOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerMessage.trim()) return;
    offerHelp(selectedPost.id, offerMessage.trim());
    setOfferMessage('');
  };

  const handleApplyTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const role = teamRoleSelected || (selectedPost.teamDetails?.rolesNeeded || [])[0] || 'Contributor';
    applyForTeam(selectedPost.id, role, teamApplyMessage.trim() || 'Excited to contribute to this project!');
    setTeamApplyMessage('');
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimMessage.trim()) return;
    claimLostFound(selectedPost.id, claimMessage.trim());
    setClaimMessage('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Link Copied to Clipboard',
      message: 'Share this UniHive link with classmates and study partners.'
    });
  };

  const handleDownloadResource = () => {
    addToast({
      type: 'success',
      title: 'Accessing Study Resource',
      message: `Downloaded "${selectedPost.resourceDetails?.fileName}". Saved to student downloads.`
    });
  };

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 ${
        isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop-in'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Click outside backdrop with atmospheric theme aura */}
      <div 
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(128, 96, 189, 0.22) 0%, rgba(14, 10, 20, 0.7) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(200, 176, 240, 0.2) 0%, rgba(48, 37, 53, 0.45) 100%)'
        }}
        onClick={handleClose} 
      />

      <div 
        className={`relative z-10 rounded-3xl max-w-2xl w-full border flex flex-col max-h-[92vh] overflow-hidden transition-all ${
          isClosing ? 'animate-modal-card-exit' : 'animate-modal-card-enter'
        } ${
          isDark 
            ? 'bg-plum-surface border-plum-border text-parchment shadow-[0_16px_40px_-6px_rgba(128,96,189,0.22)]' 
            : 'bg-surface border-borderSubtle text-plum shadow-[0_16px_40px_-6px_rgba(150,116,184,0.16)]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-plum-border bg-plum-elevated/60' : 'border-borderSubtle bg-surface-subtle'
        }`}>
          <div className="flex items-center gap-2">
            <BadgePill type={selectedPost.type} />
            {selectedPost.urgency && selectedPost.urgency !== 'normal' && (
              <BadgePill urgency={selectedPost.urgency} />
            )}
            {selectedPost.status === 'resolved' && (
              <BadgePill status={selectedPost.status} />
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleSavePost(selectedPost.id)}
              className={`p-2 rounded-xl transition-colors ${
                selectedPost.isSaved 
                  ? 'text-terracotta bg-terracotta/15' 
                  : 'text-content-muted hover:text-content-primary hover:bg-lavender/10'
              }`}
              title={selectedPost.isSaved ? 'Saved to bookmarks' : 'Save post'}
            >
              <Bookmark className={`w-4 h-4 ${selectedPost.isSaved ? 'fill-terracotta' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-lavender/10 transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {isAuthor && (
              <button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="p-2 rounded-xl text-error hover:text-error/80 hover:bg-error/10 transition-colors"
                title="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-lavender/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Author Bar */}
          <div className={`flex items-center justify-between gap-4 p-4 rounded-2xl border ${
            isDark 
              ? 'bg-plum-elevated/70 border-plum-border' 
              : 'bg-surface-subtle border-borderSubtle'
          }`}>
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar
                src={selectedPost.author.avatar}
                name={selectedPost.author.name}
                size="custom"
                className="w-12 h-12"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-sm text-content-primary truncate">
                    {selectedPost.author.name}
                  </h4>
                  {selectedPost.author.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-lavender/20 text-lavender-dark dark:text-lavender border border-lavender/30">
                      {selectedPost.author.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-content-secondary truncate">
                  {selectedPost.author.department} • {selectedPost.author.year}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-content-muted mt-0.5">
                  <span>Posted {selectedPost.createdAt}</span>
                  <span>•</span>
                  <span className="text-terracotta font-medium">★ {selectedPost.author.reputationScore} pts</span>
                </div>
              </div>
            </div>

            {selectedPost.deadline && (
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-content-muted block">
                  Deadline
                </span>
                <span className="text-xs font-semibold text-terracotta bg-terracotta/15 px-2.5 py-1 rounded-md border border-terracotta/30">
                  {selectedPost.deadline}
                </span>
              </div>
            )}
          </div>

          {/* Title & Full Description */}
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-content-primary leading-tight mb-3">
              {selectedPost.title}
            </h2>
            <p className="text-sm text-content-primary leading-relaxed whitespace-pre-line">
              {selectedPost.description}
            </p>
          </div>

          {/* Category & Tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs font-semibold text-lavender-dark dark:text-lavender bg-lavender/15 px-2.5 py-1 rounded-lg border border-lavender/25">
              {selectedPost.category}
            </span>
            {(selectedPost.tags || []).map(tag => (
              <span
                key={tag}
                className="text-xs font-medium text-content-secondary bg-surface-subtle px-2.5 py-1 rounded-lg border border-borderSubtle"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* SPECIAL SECTION: Resolved Banner (Completes Help Loop) */}
          {selectedPost.status === 'resolved' && (
            <div className="p-4 rounded-2xl bg-success/15 border border-success/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-success uppercase tracking-wide">
                  The Help Loop Completed & Resolved 🎉
                </h4>
                <p className="text-xs text-content-primary mt-0.5">
                  {selectedPost.resolvedNote || `Resolved with help from ${selectedPost.resolvedBy || 'a peer'}.`}
                </p>
              </div>
            </div>
          )}

          {/* SPECIAL SECTION: Resource View & Download */}
          {selectedPost.type === 'resource' && selectedPost.resourceDetails && (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lavender/20 flex items-center justify-center text-lavender shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-content-primary">
                      {selectedPost.resourceDetails.fileName}
                    </h4>
                    <p className="text-xs text-content-secondary">
                      {selectedPost.resourceDetails.fileSize} • {selectedPost.resourceDetails.courseCode || 'Course Guide'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadResource}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-subtle flex items-center justify-center gap-1.5 shrink-0 ${
                    isDark
                      ? 'bg-lavender text-plum-dark hover:bg-parchment'
                      : 'bg-plum text-parchment hover:bg-plum-hover'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-terracotta" />
                  <span>Download Revision Guide</span>
                </button>
              </div>

              {selectedPost.resourceDetails.previewSummary && (
                <div className="text-xs text-content-secondary bg-surface p-3.5 rounded-xl border border-borderSubtle">
                  <span className="font-bold text-content-primary block mb-1">
                    Guide Highlights & Syllabus Topics:
                  </span>
                  {selectedPost.resourceDetails.previewSummary}
                </div>
              )}
            </div>
          )}

          {/* SPECIAL SECTION: Team Collaboration & Open Spots */}
          {selectedPost.type === 'team' && selectedPost.teamDetails && (
            <div className={`p-4 rounded-2xl border space-y-4 ${
              isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-content-primary">
                  {selectedPost.teamDetails.projectName} ({selectedPost.teamDetails.event})
                </span>
                <span className="text-xs font-bold text-success">
                  {selectedPost.teamDetails.filledSpots} / {selectedPost.teamDetails.totalSpots} spots filled
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-content-secondary block mb-1.5">
                  Select Role You Wish to Apply For:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.teamDetails.rolesNeeded.map((r, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTeamRoleSelected(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        teamRoleSelected === r 
                          ? 'bg-lavender text-plum-dark border-lavender' 
                          : 'bg-surface text-content-primary border-borderSubtle hover:border-lavender'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Existing Applicants */}
              {selectedPost.teamDetails.applicants && selectedPost.teamDetails.applicants.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-borderSubtle/60">
                  <span className="text-xs font-semibold text-content-secondary block">
                    Interested Teammates ({selectedPost.teamDetails.applicants.length}):
                  </span>
                  <div className="space-y-2">
                    {selectedPost.teamDetails.applicants.map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-surface border border-borderSubtle/60 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <UserAvatar src={app.avatar} name={app.name} size="xs" />
                          <div className="truncate">
                            <span className="font-bold text-content-primary block">{app.name}</span>
                            <span className="text-[10px] text-content-secondary block">{app.role}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-content-muted">{app.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Express Interest form */}
              <form onSubmit={handleApplyTeam} className="space-y-2 pt-2 border-t border-borderSubtle/60">
                <textarea
                  rows={2}
                  value={teamApplyMessage}
                  onChange={e => setTeamApplyMessage(e.target.value)}
                  placeholder="Share a short note about your experience, GitHub, or portfolio link..."
                  className="w-full px-3.5 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary placeholder:text-content-muted focus:outline-none focus:border-lavender"
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-subtle flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-lavender text-plum-dark hover:bg-parchment'
                      : 'bg-plum text-parchment hover:bg-plum-hover'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 text-terracotta" />
                  <span>Submit Application</span>
                </button>
              </form>
            </div>
          )}

          {/* SPECIAL SECTION: Lost & Found Claim */}
          {selectedPost.type === 'lost-found' && selectedPost.lostFoundDetails && (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
            }`}>
              <div className="flex items-center gap-2 text-xs text-content-secondary">
                <MapPin className="w-4 h-4 text-terracotta" />
                <span className="font-semibold text-content-primary">Approx. Location:</span>
                <span>{selectedPost.lostFoundDetails.location}</span>
              </div>

              <div className="text-xs text-content-secondary bg-surface p-3.5 rounded-xl border border-borderSubtle">
                <span className="font-semibold text-content-primary block mb-0.5">Drop-off / Verification:</span>
                {selectedPost.lostFoundDetails.contactDropoff}
              </div>

              <form onSubmit={handleClaim} className="space-y-2 pt-1">
                <input
                  type="text"
                  value={claimMessage}
                  onChange={e => setClaimMessage(e.target.value)}
                  placeholder="Provide identifying detail or arrange pickup with reporter..."
                  className="w-full px-3.5 py-2 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary focus:outline-none focus:border-lavender"
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-subtle ${
                    isDark
                      ? 'bg-lavender text-plum-dark hover:bg-parchment'
                      : 'bg-plum text-parchment hover:bg-plum-hover'
                  }`}
                >
                  Send Verification Inquiry
                </button>
              </form>
            </div>
          )}

          {/* SIGNATURE SECTION: The Help Loop Thread (for Requests) */}
          {selectedPost.type === 'request' && (
            <div className="border-t border-borderSubtle pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-terracotta" />
                  <h3 className="font-display font-bold text-sm text-content-primary">
                    Peer Help Responses ({offersForThisPost.length})
                  </h3>
                </div>

                {isAuthor && selectedPost.status !== 'resolved' && (
                  <button
                    onClick={() => {
                      setSelectedHelperForResolve(offersForThisPost[0]?.authorName || 'Campus Peer');
                      setIsResolveDialogOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-success text-white hover:bg-success/90 transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Resolved</span>
                  </button>
                )}
              </div>

              {/* List of responses */}
              {offersForThisPost.length === 0 ? (
                <div className="p-5 rounded-2xl bg-surface-subtle text-center text-xs text-content-secondary border border-dashed border-borderSubtle">
                  No responses yet. Be the first peer to offer assistance!
                </div>
              ) : (
                <div className="space-y-3">
                  {offersForThisPost.map(offer => (
                    <div
                      key={offer.id}
                      className={`p-3.5 rounded-2xl border space-y-2 ${
                        isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <UserAvatar
                            src={offer.authorAvatar}
                            name={offer.authorName}
                            size="sm"
                          />
                          <div>
                            <span className="text-xs font-bold text-content-primary">
                              {offer.authorName}
                            </span>
                            <span className="text-[10px] text-content-muted ml-1.5">
                              {offer.authorDept} • {offer.createdAt}
                            </span>
                          </div>
                        </div>

                        {isAuthor && selectedPost.status !== 'resolved' && (
                          <button
                            onClick={() => {
                              setSelectedHelperForResolve(offer.authorName);
                              setIsResolveDialogOpen(true);
                            }}
                            className="text-[11px] font-semibold text-success hover:underline bg-success/15 px-2.5 py-1 rounded-md border border-success/30 transition-colors"
                          >
                            Accept & Resolve Loop ✓
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-content-primary pl-9 leading-relaxed">
                        {offer.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Offer Help Input Box */}
              {selectedPost.status !== 'resolved' && (
                <form onSubmit={handleSendHelpOffer} className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-content-secondary">
                    {isAuthor ? 'Add an update note:' : 'Offer your help to this peer:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={offerMessage}
                      onChange={e => setOfferMessage(e.target.value)}
                      placeholder={
                        isAuthor
                          ? 'e.g. Thanks all! Found someone at the library.'
                          : 'e.g. I can help with this! Meet at Library 2nd floor or drop a quick DM...'
                      }
                      className="flex-1 px-3.5 py-2.5 text-xs bg-surface border border-borderSubtle rounded-xl text-content-primary placeholder:text-content-muted focus:outline-none focus:border-lavender"
                    />
                    <button
                      type="submit"
                      disabled={!offerMessage.trim()}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold disabled:opacity-50 transition-all shadow-subtle flex items-center gap-1.5 shrink-0 ${
                        isDark
                          ? 'bg-lavender text-plum-dark hover:bg-parchment'
                          : 'bg-plum text-parchment hover:bg-plum-hover'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5 text-terracotta" />
                      <span>{isAuthor ? 'Post Note' : 'Offer Help (+20 pts)'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-between text-xs text-content-secondary ${
          isDark ? 'border-plum-border bg-plum-elevated/60' : 'border-borderSubtle bg-surface-subtle'
        }`}>
          <span>{selectedPost.responsesCount} campus peers connected</span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium text-content-primary hover:bg-lavender/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={isResolveDialogOpen}
        title="Mark Request as Resolved"
        message={`Closing this request confirms that ${selectedHelperForResolve} helped solve your question. This awards karma points and completes the Help Loop!`}
        confirmLabel="Resolve & Celebrate"
        onConfirm={() => {
          resolvePost(selectedPost.id, selectedHelperForResolve);
          setIsResolveDialogOpen(false);
        }}
        onCancel={() => setIsResolveDialogOpen(false)}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Post"
        message="Are you sure you want to remove this post from UniHive? This cannot be undone."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={() => {
          deletePost(selectedPost.id);
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};
