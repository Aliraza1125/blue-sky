export default function EmbeddedPost({ post }) {
    if (post.viewer?.embeddingDisabled) {
      return <div>Embedding is disabled for this post</div>;
    }
  
    const postId = post?.uri?.split('/').pop() || 'unknown';
    const handle = post?.author?.handle || 'unknown';
    const directUrl = `https://bsky.app/profile/${handle}/post/${postId}`;
  
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <p className="text-lg font-bold">{post.title || 'View Post'}</p>
        <p className="text-gray-600">{post.author?.displayName || handle}</p>
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-2 inline-block"
        >
          View Post on Bluesky
        </a>
      </div>
    );
  }
  