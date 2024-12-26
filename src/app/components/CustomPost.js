// CustomPost.js
import { formatDistanceToNow } from 'date-fns';

export default function CustomPost({ post }) {
  // Function to resolve the image URL from the ref link
  const getImageUrl = (imageRef) => {
    if (!imageRef) return null;
    // Handle different image reference formats
    if (typeof imageRef === 'string') return imageRef;
    if (imageRef.$link) return `https://cdn.bsky.app/img/feed_fullsize/plain/${imageRef.$link}`;
    return null;
  };

  // Function to handle embedded images
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
            />
          ))}
        </div>
      );
    }
    return null;
  };

  // Function to handle external embeds
  const renderExternalEmbed = () => {
    if (post.record.embed?.external) {
      return (
        <a
          href={post.record.embed.external.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block border rounded-lg overflow-hidden hover:bg-gray-50"
        >
          {post.record.embed.external.thumb && (
            <img
              src={getImageUrl(post.record.embed.external.thumb.ref)}
              alt={post.record.embed.external.title || "External content"}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-3">
            <h4 className="font-medium">{post.record.embed.external.title}</h4>
            <p className="text-gray-600 text-sm mt-1">
              {post.record.embed.external.description}
            </p>
          </div>
        </a>
      );
    }
    return null;
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      {/* Author Header */}
      <div className="flex items-start space-x-3">
        {post.author.avatar && (
          <img
            src={post.author.avatar}
            alt={post.author.handle}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium truncate">
              {post.author.displayName}
            </span>
            <span className="text-gray-500 truncate">
              @{post.author.handle}
            </span>
            <span className="text-gray-500">·</span>
            <time className="text-gray-500">
              {formatDistanceToNow(new Date(post.record.createdAt))} ago
            </time>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-3">
        <p className="text-gray-900 whitespace-pre-wrap">{post.record.text}</p>
      </div>

      {/* Render embedded images if present */}
      {renderEmbeddedImages()}

      {/* Render external embed if present */}
      {renderExternalEmbed()}

      {/* Interaction Buttons */}
      <div className="mt-3 flex items-center justify-start space-x-6 text-gray-500">
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          <span>{post.replyCount}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-green-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          <span>{post.repostCount}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span>{post.likeCount}</span>
        </button>
      </div>
    </div>
  );
}