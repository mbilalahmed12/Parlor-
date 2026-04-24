import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { settingsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsAPI.get();
      setSettings(response.data);
      setFormData(response.data);
    } catch (error) {
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsAPI.update(formData);
      toast.success('Settings updated successfully!');
      fetchSettings();
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading settings...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Parlor Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">Parlor Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Parlor Name</label>
            <input
              type="text"
              name="parlorName"
              value={formData.parlorName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="parlorDescription"
              value={formData.parlorDescription || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">Homepage Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Hero Subtitle</label>
            <input
              type="text"
              name="heroSubtitle"
              value={formData.heroSubtitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Hero Video URL
              <span className="text-xs text-gray-500"> (MP4 video link)</span>
            </label>
            <input
              type="url"
              name="heroVideoUrl"
              value={formData.heroVideoUrl || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste a direct link to an MP4 video (e.g., from Pexels, Unsplash, or your cloud storage)
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              name="contactAddress"
              value={formData.contactAddress || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </motion.section>

      {/* Social Links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">Social Media Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Instagram URL</label>
            <input
              type="url"
              name="socialLinks.instagram"
              value={formData.socialLinks?.instagram || ''}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Facebook URL</label>
            <input
              type="url"
              name="socialLinks.facebook"
              value={formData.socialLinks?.facebook || ''}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
            <input
              type="tel"
              name="socialLinks.whatsapp"
              value={formData.socialLinks?.whatsapp || ''}
              onChange={handleChange}
              placeholder="+1234567890"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </motion.section>

      {/* Working Hours */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">Working Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
            <div key={day} className="space-y-2">
              <label className="block text-sm font-semibold capitalize">{day}</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  name={`workingHours.${day}.open`}
                  value={formData.workingHours?.[day]?.open || '09:00'}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
                <span className="flex items-center px-2">-</span>
                <input
                  type="time"
                  name={`workingHours.${day}.close`}
                  value={formData.workingHours?.[day]?.close || '20:00'}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={saving}
        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
      >
        {saving ? 'Saving...' : '💾 Save All Changes'}
      </motion.button>
    </form>
  );
}
