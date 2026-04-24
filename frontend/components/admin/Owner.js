import { useState } from 'react';
import { motion } from 'framer-motion';
import { settingsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Owner() {
  const [formData, setFormData] = useState({
    parlorName: '',
    heroTitle: '',
    heroSubtitle: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {};
      if (formData.parlorName.trim()) payload.parlorName = formData.parlorName.trim();
      if (formData.heroTitle.trim()) payload.heroTitle = formData.heroTitle.trim();
      if (formData.heroSubtitle.trim()) payload.heroSubtitle = formData.heroSubtitle.trim();

      if (Object.keys(payload).length === 0) {
        toast.error('Enter at least one change to save');
        setSaving(false);
        return;
      }

      await settingsAPI.update(payload);
      toast.success('Owner changes saved to website settings');
      setFormData({ parlorName: '', heroTitle: '', heroSubtitle: '' });
    } catch (error) {
      const message = error?.response?.data?.message || 'Owner update failed';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">Owner Controls</h3>
        <p className="text-gray-600 text-sm mb-6">
          This panel confirms owner-level write access by applying direct website settings updates.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Parlor Name</label>
            <input
              type="text"
              name="parlorName"
              value={formData.parlorName}
              onChange={handleChange}
              placeholder="Elite Parlor"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Homepage Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleChange}
              placeholder="Welcome to Elite Parlor"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Homepage Hero Subtitle</label>
            <input
              type="text"
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
              placeholder="Experience luxury and transformation"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-60"
          >
            {saving ? 'Saving owner changes...' : 'Apply Owner Website Changes'}
          </motion.button>
        </form>
      </motion.section>
    </div>
  );
}
