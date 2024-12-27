// CustomPost.js
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Share2, BookmarkPlus, Flag, MessageSquare } from 'lucide-react';
// Simple Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
        <button 
          onClick={onClose}
          className="mt-4 w-full bg-gray-900 text-white rounded-md py-2 hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export function CustomPost({ post }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(post.likeCount || 0);

  // Function to handle YouTube URLs
  const getYouTubeVideoId = (url) => {
    const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const longUrlPattern = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    
    const shortMatch = url.match(shortUrlPattern);
    const longMatch = url.match(longUrlPattern);
    
    return shortMatch?.[1] || longMatch?.[1] || null;
  };

  // Function to convert any YouTube URL to standard format
  const getStandardYouTubeUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
  };

  // Function to render YouTube preview
  const renderYouTubePreview = (url, title = '') => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;

    const standardUrl = getStandardYouTubeUrl(url);

    return (
      <div className=" rounded-lg overflow-hidden">
        <a 
          href={standardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-95 transition-opacity"
        >
          <div className="relative">
         
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          {title && (
            <div className="p-3 bg-white">
              <h4 className="font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500 mt-1">YouTube video</p>
            </div>
          )}
        </a>
      </div>
    );
  };

  // Enhanced text rendering with YouTube support
  const renderText = (text) => {
    if (!text) return '';
    
    // Patterns for different types of content
    const urlPattern = /https?:\/\/[^\s]+/g;
    const youtubePattern = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(\S*)/g;
    const hashtagPattern = /#[\w]+/g;
    const mentionPattern = /@[\w.]+/g;
    
    // Split text into segments
    const segments = text.split(/(\s+|(?=https?:\/\/)|(?<=\s)(?=[#@]))/);
    
    return segments.map((segment, index) => {
      // Handle YouTube URLs
      if (segment.match(youtubePattern)) {
        const standardUrl = getStandardYouTubeUrl(segment);
        return (
          <React.Fragment key={index}>
            <a 
              href={standardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {segment}
            </a>
            {renderYouTubePreview(segment)}
          </React.Fragment>
        );
      }
      // Handle regular URLs
      else if (segment.match(urlPattern)) {
        return (
          <a 
            key={index}
            href={segment}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {segment}
          </a>
        );
      }
      // Handle hashtags
      else if (segment.match(hashtagPattern)) {
        return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {segment}
          </span>
        );
      }
      // Handle mentions
      else if (segment.match(mentionPattern)) {
        return (
          <a 
            key={index}
            href={`/profile/${segment.slice(1)}`}
            className="text-blue-500 hover:underline"
          >
            {segment}
          </a>
        );
      }
      // Return regular text
      return segment;
    });
  };

  // Handle embedded images
  const renderEmbeddedImages = () => {
    if (post.embed?.$type === 'app.bsky.embed.images#view') {
      return (
        <div className="mt-3 grid gap-2">
          {post.embed.images.map((img, index) => (
            <img
              key={index}
              src={img.fullsize}
              alt={img.alt || 'Embedded image'}
              className="rounded-lg w-full object-cover max-h-96"
              loading="lazy"
            />
          ))}
        </div>
      );
    }
    return null;
  };

  // Handle external embeds with enhanced preview
  const renderExternalEmbed = () => {
    if (post.embed?.$type === 'app.bsky.embed.external#view') {
      const { uri, title, description, thumb } = post.embed.external;
      return (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block border rounded-lg overflow-hidden hover:bg-gray-50 transition-colors"
        >
          {thumb && (
            <img
              src={thumb}
              alt={title || "External content"}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          )}
          <div className="p-3">
            <h4 className="font-medium text-gray-900">{title}</h4>
            {description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
            )}
            <p className="text-gray-500 text-xs mt-2">{new URL(uri).hostname}</p>
          </div>
        </a>
      );
    }
    return null;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${post.author.displayName}`,
          text: post.record.text,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setIsAlertOpen(true);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow">
      {/* Author Header */}
      <div className="flex items-start space-x-3">
        <a href={`/profile/${post.author.handle}`} className="flex-shrink-0">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.handle}
              className="w-10 h-10 rounded-full hover:opacity-90 transition-opacity"
            />
          )}
        </a>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <a href={`/profile/${post.author.handle}`} className="hover:underline">
              <span className="font-medium truncate">
                {post.author.displayName || post.author.handle}
              </span>
            </a>
            <span className="text-gray-500 truncate">
              @{post.author.handle}
            </span>
            <span className="text-gray-500">·</span>
            <time className="text-gray-500 hover:underline" title={new Date(post.record.createdAt).toLocaleString()}>
              {formatDistanceToNow(new Date(post.record.createdAt))} ago
            </time>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-3 break-words">
        <p className="text-gray-900 whitespace-pre-wrap">{renderText(post.record.text)}</p>
      </div>

      {renderEmbeddedImages()}
      {renderExternalEmbed()}

      {/* Enhanced Interaction Buttons */}
      <div className="mt-3 flex items-center justify-between text-gray-500 border-t pt-3">
        <button 
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
          aria-label="Reply"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{post.replyCount}</span>
        </button>

        <button 
          className={`flex items-center space-x-2 transition-colors ${
            isLiked ? 'text-red-500' : 'hover:text-red-500'
          }`}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span>{localLikeCount}</span>
        </button>

        <button 
          className={`flex items-center space-x-2 transition-colors ${
            isBookmarked ? 'text-yellow-500' : 'hover:text-yellow-500'
          }`}
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <BookmarkPlus className="w-5 h-5" />
        </button>

        <button 
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
          onClick={handleShare}
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <button 
          className="flex items-center space-x-2 hover:text-red-500 transition-colors"
          aria-label="Report"
        >
          <Flag className="w-5 h-5" />
        </button>
      </div>

      {/* Share Dialog */}
      <Modal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Share Post</h2>
        <p className="text-gray-600 mb-2">Copy this link to share the post:</p>
        <input 
          type="text" 
          value={window.location.href}
          readOnly
          className="w-full p-2 border rounded bg-gray-50 mb-2"
          onClick={e => e.target.select()}
        />
      </Modal>
    </div>
  );
}

export default CustomPost;