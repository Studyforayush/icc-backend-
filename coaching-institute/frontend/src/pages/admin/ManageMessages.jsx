import { useEffect, useState } from 'react';
import { messagesAPI } from '../../services/api';
import { Mail, Phone, Eye, Trash2, Reply, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await messagesAPI.getAll();
      setMessages(data);
    } catch (err) {
      toast.error('Failed to fetch messages');
    }
    setLoading(false);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messagesAPI.markRead(id);
      toast.success('Marked as read');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    try {
      await messagesAPI.reply(id, { reply: replyText });
      toast.success('Reply sent successfully');
      setReplyText('');
      setShowReplyForm(false);
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      toast.error('Failed to send reply');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messagesAPI.delete(id);
        toast.success('Message deleted successfully');
        fetchMessages();
      } catch (err) {
        toast.error('Failed to delete message');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-heading">Manage Messages</h1>
          <p className="text-gray-600 mt-2">View and respond to contact form submissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading messages...</div>
        ) : messages.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sender</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-800">{message.name}</div>
                        <div className="text-xs text-gray-500">{message.email}</div>
                        {message.phone && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone size={12} />
                            {message.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-800 max-w-xs truncate">
                          {message.subject || 'No Subject'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800 max-w-xs truncate">
                          {message.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              message.isRead
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {message.isRead ? 'Read' : 'Unread'}
                          </span>
                          {message.reply && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              Replied
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(message.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {!message.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(message._id)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition"
                              title="Mark as read"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedMessage(message)}
                            className="p-1 text-gray-600 hover:text-gray-800 transition"
                            title="View full message"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMessage(message);
                              setShowReplyForm(true);
                            }}
                            className="p-1 text-green-600 hover:text-green-800 transition"
                            title="Reply to message"
                          >
                            <Reply size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(message._id)}
                            className="p-1 text-red-600 hover:text-red-800 transition"
                            title="Delete message"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Mail size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No messages received yet</p>
          </div>
        )}

        {/* Message Detail Modal */}
        {selectedMessage && !showReplyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Message Details</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
                    <p className="text-gray-800">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-800">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-800">{selectedMessage.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="flex gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedMessage.isRead
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {selectedMessage.isRead ? 'Read' : 'Unread'}
                      </span>
                      {selectedMessage.reply && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          Replied
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedMessage.subject && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <p className="text-gray-800 font-medium">{selectedMessage.subject}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <p className="text-gray-800 bg-gray-50 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                {selectedMessage.reply && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                    <p className="text-gray-800 bg-green-50 p-4 rounded-lg leading-relaxed whitespace-pre-wrap border-l-4 border-green-500">
                      {selectedMessage.reply}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Received On</label>
                  <p className="text-gray-600">{formatDate(selectedMessage.createdAt)}</p>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                {!selectedMessage.reply && (
                  <button
                    onClick={() => setShowReplyForm(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Reply
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(selectedMessage._id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {selectedMessage && showReplyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Reply to Message</h2>
                  <button
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyText('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">From: {selectedMessage.name} ({selectedMessage.email})</div>
                  <div className="text-sm text-gray-800 font-medium mb-2">
                    {selectedMessage.subject || 'No Subject'}
                  </div>
                  <div className="text-sm text-gray-700 line-clamp-3">
                    {selectedMessage.message}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                  />
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => handleReply(selectedMessage._id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Send Reply
                </button>
                <button
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
