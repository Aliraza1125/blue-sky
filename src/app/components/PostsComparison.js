// PostsComparison.js
import EmbeddedPost from './EmbeddedPost';
import CustomPost from './CustomPost';

export default function PostsComparison({ postsData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Embedded Posts Column */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold mb-6">Embedded Posts</h2>
        {postsData.map((currencyData) => (
          <div key={`embedded-${currencyData.currency}`} className="space-y-6">
            <h3 className="text-lg font-medium text-gray-700">
              {currencyData.currency}
            </h3>
            <div className="space-y-6">
              {currencyData.posts.map((post) => (
                <EmbeddedPost key={post.uri} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Posts Column */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold mb-6">Custom Posts</h2>
        {postsData.map((currencyData) => (
          <div key={`custom-${currencyData.currency}`} className="space-y-6">
            <h3 className="text-lg font-medium text-gray-700">
              {currencyData.currency}
            </h3>
            <div className="space-y-6">
              {currencyData.posts.map((post) => (
                <CustomPost key={post.uri} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}