import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { reviewsAPI } from '@/lib/api';
import { FiCheck, FiX, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getAll();
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await reviewsAPI.approve(id);
      toast.success('Review approved and published!');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to approve review');
    }
  };

  const handleReject = async (id) => {
    if (confirm('Delete this review?')) {
      try {
        await reviewsAPI.delete(id);
        toast.success('Review deleted');
        fetchReviews();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  const filteredReviews =
    filter === 'pending' ? reviews.filter((r) => !r.approved) : reviews.filter((r) => r.approved);

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            filter === 'pending'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Pending ({reviews.filter((r) => !r.approved).length})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            filter === 'approved'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Published ({reviews.filter((r) => r.approved).length})
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No {filter} reviews yet
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 5 }}
              className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg">{review.clientName}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <FiStar
                        key={j}
                        size={16}
                        className={j < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  review.approved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.approved ? 'Published' : 'Pending'}
                </span>
              </div>

              <p className="text-gray-700 mb-4 italic">&quot;{review.comment}&quot;</p>

              {review.service && (
                <p className="text-sm text-gray-500 mb-4">Service: {review.service.name}</p>
              )}

              <div className="flex gap-3">
                {!review.approved && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(review._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-colors"
                  >
                    <FiCheck /> Approve & Publish
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReject(review._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-colors"
                >
                  <FiX /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
