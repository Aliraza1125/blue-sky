// src/components/PostsComparison.js
import EmbeddedPost from './EmbeddedPost';
import CustomPost from './CustomPost';

export default function PostsComparison({ postsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Embedded Posts Column */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Embedded Posts</h2>
        {postsData.map((currencyData) => (
          <div key={`embedded-${currencyData.currency}`} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">{currencyData.currency}</h3>
            {currencyData.posts.map((post) => (
              <EmbeddedPost key={post.uri} post={post} />
            ))}
          </div>
        ))}
      </div>

      {/* Custom Posts Column */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Custom Posts</h2>
        {postsData.map((currencyData) => (
          <div key={`custom-${currencyData.currency}`} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">{currencyData.currency}</h3>
            {currencyData.posts.map((post) => (
              <CustomPost key={post.uri} post={post} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}