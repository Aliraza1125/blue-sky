'use client'
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function EmbeddedPost({ post }) {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Function to handle different types of images
  const renderImages = () => {
    // Handle embedded images
    if (post.embed?.$type === 'app.bsky.embed.images#view' && post.embed.images?.length > 0) {
      return (
        <div className={`grid gap-2 mt-3 ${post.embed.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {post.embed.images.map((img, index) => (
            <img
              key={index}
              src={img.fullsize || img.thumb}
              alt={ 'Post image'}
              className="rounded-lg w-full object-cover"
              style={{ maxHeight: post.embed.images.length > 1 ? '250px' : '500px' }}
            />
          ))}
        </div>
      );
    }

    // Handle external embed with thumbnail
    if (post.record.embed?.external?.thumb) {
      return (
        <div className="mt-3">
          <img
            src={post.record.embed.external.thumb}
            alt={post.record.embed.external.title || "External content"}
            className="rounded-lg w-full object-cover max-h-[250px]"
          />
          {post.record.embed.external.title && (
            <div className="mt-2 text-sm text-gray-800">
              <h4 className="font-medium">{post.record.embed.external.title}</h4>
              {post.record.embed.external.description && (
                <p className="text-gray-600 mt-1">{post.record.embed.external.description}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="border rounded-lg bg-white p-4">
      {/* Header with avatar and follow button */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start space-x-3">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <div className="flex flex-col">
              <span className="font-bold text-black hover:underline">
                {post.author.displayName}
              </span>
              <span className="text-gray-600">
                @{post.author.handle}
              </span>
            </div>
          </div>
        </div>
        <button className="bg-[#15171A] hover:bg-gray-800 text-white rounded-full px-4 py-1 text-sm font-bold">
          Follow
        </button>
      </div>

      {/* Post Content */}
      <div className="mt-3 text-[15px] whitespace-pre-wrap">
        {post.record.text}
      </div>

      {/* Images */}
      {renderImages()}

      {/* Timestamp and visibility */}
      <div className="mt-3 flex items-center text-gray-600 text-sm">
        <time>{formatDate(post.record.createdAt)}</time>
        <span className="mx-2">·</span>
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Everybody can reply
        </span>
      </div>

      {/* Post Stats */}
      <div className="mt-3 pt-3 border-t flex items-center justify-between text-gray-600">
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.replyCount > 0 && <span>{post.replyCount}</span>}
        </button>
        <button className="flex items-center space-x-1 hover:text-green-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {post.repostCount > 0 && <span>{post.repostCount}</span>}
        </button>
        <button className="flex items-center space-x-1 hover:text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likeCount > 0 && <span>{post.likeCount}</span>}
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}