import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesAPI } from '@/lib/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Cropper from 'react-easy-crop';
import { fileToDataUrl, getCroppedImgDataUrl } from '@/lib/imageCrop';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'hair',
    categoryLabel: 'Hair',
    audience: 'her',
    categoryVideoUrl: '',
    mediaType: 'none',
    mediaUrl: '',
    featured: false,
    active: true,
  });
  const [imageCropSrc, setImageCropSrc] = useState('');
  const [imageCrop, setImageCrop] = useState({ x: 0, y: 0 });
  const [imageZoom, setImageZoom] = useState(1);
  const [imageCropPixels, setImageCropPixels] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAllAdmin();
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
      };

      if (editingId) {
        await servicesAPI.update(editingId, payload);
        toast.success('Service updated successfully');
      } else {
        await servicesAPI.create(payload);
        toast.success('Service created successfully');
      }
      fetchServices();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (service) => {
    setFormData({
      ...service,
      categoryLabel: service.categoryLabel || service.category || '',
      audience: service.audience || 'her',
      categoryVideoUrl: service.categoryVideoUrl || '',
      mediaType: service.mediaType || 'none',
      mediaUrl: service.mediaUrl || service.image || '',
      active: service.active !== false,
    });
    setImageCropSrc('');
    setImageCrop({ x: 0, y: 0 });
    setImageZoom(1);
    setImageCropPixels(null);
    setEditingId(service._id);
    setShowModal(true);
  };

  const handleImageFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setImageCropSrc(dataUrl);
      setImageCrop({ x: 0, y: 0 });
      setImageZoom(1);
      setImageCropPixels(null);
    } catch (error) {
      toast.error('Failed to read image');
    }
  };

  const onImageCropComplete = useCallback((_, croppedAreaPixels) => {
    setImageCropPixels(croppedAreaPixels);
  }, []);

  const handleApplyImageCrop = async () => {
    if (!imageCropSrc || !imageCropPixels) return;

    try {
      const cropped = await getCroppedImgDataUrl(imageCropSrc, imageCropPixels, 'image/png');
      setFormData((prev) => ({
        ...prev,
        mediaType: 'image',
        mediaUrl: cropped,
        image: cropped,
      }));
      setImageCropSrc('');
      setImageCropPixels(null);
      toast.success('Image cropped and applied to service.');
    } catch (error) {
      toast.error('Failed to crop image');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.delete(id);
        toast.success('Service deleted');
        fetchServices();
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: 'hair',
      categoryLabel: 'Hair',
      audience: 'her',
      categoryVideoUrl: '',
      mediaType: 'none',
      mediaUrl: '',
      featured: false,
      active: true,
    });
    setImageCropSrc('');
    setImageCrop({ x: 0, y: 0 });
    setImageZoom(1);
    setImageCropPixels(null);
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Services</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
        >
          <FiPlus /> Add Service
        </motion.button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary"
            >
              <h4 className="text-lg font-bold mb-2">{service.name}</h4>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                {service.audience === 'him' ? 'For Him' : 'For Her'} | {service.categoryLabel || service.category}
              </p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary">${service.price}</p>
                  <p className="text-xs text-gray-500">{service.duration} mins</p>
                </div>
                {service.featured && (
                  <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold">
                    Featured
                  </span>
                )}
              </div>
              {service.active === false && (
                <p className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">Inactive</p>
              )}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  <FiEdit2 size={16} /> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  <FiTrash2 size={16} /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={resetForm}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-6 max-w-md w-full space-y-4"
            >
              <h3 className="text-xl font-bold">{editingId ? 'Edit Service' : 'Add New Service'}</h3>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Service name"
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Service description"
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none"
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (mins)"
                  required
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <select
                name="audience"
                value={formData.audience || 'her'}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="her">For Her</option>
                <option value="him">For Him</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category key (e.g. brows-lashes)"
                  required
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  name="categoryLabel"
                  value={formData.categoryLabel || ''}
                  onChange={handleChange}
                  placeholder="Category label"
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <input
                type="url"
                name="categoryVideoUrl"
                value={formData.categoryVideoUrl || ''}
                onChange={handleChange}
                placeholder="Category background video URL"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  name="mediaType"
                  value={formData.mediaType || 'none'}
                  onChange={handleChange}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="none">No media</option>
                  <option value="image">Image background</option>
                  <option value="video">Video background</option>
                </select>
                <input
                  type="url"
                  name="mediaUrl"
                  value={formData.mediaUrl || ''}
                  onChange={handleChange}
                  placeholder="Media URL"
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-700">Service background image (upload + drag crop)</p>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => handleImageFile(e.target.files?.[0])}
                  className="mb-3 block w-full text-sm text-gray-700"
                />
                <p className="text-xs text-gray-500">Select an image, drag to position, zoom, then click Apply Crop.</p>
                {formData.mediaType === 'image' && formData.mediaUrl && (
                  <img
                    src={formData.mediaUrl}
                    alt="Service preview"
                    className="mt-3 h-40 w-full rounded-md border border-gray-200 object-cover"
                  />
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary rounded"
                />
                <span className="text-gray-700 font-medium">Mark as featured</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={Boolean(formData.active)}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary rounded"
                />
                <span className="text-gray-700 font-medium">Active (visible on website)</span>
              </label>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update' : 'Create'}
                </motion.button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.form>

            {imageCropSrc && (
              <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4" onClick={() => setImageCropSrc('')}>
                <div className="w-full max-w-2xl rounded-xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
                  <h4 className="mb-3 text-lg font-bold text-gray-800">Crop Service Image</h4>
                  <div className="relative h-[320px] w-full overflow-hidden rounded-lg bg-gray-100">
                    <Cropper
                      image={imageCropSrc}
                      crop={imageCrop}
                      zoom={imageZoom}
                      aspect={4 / 3}
                      onCropChange={setImageCrop}
                      onZoomChange={setImageZoom}
                      onCropComplete={onImageCropComplete}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Zoom</label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={imageZoom}
                      onChange={(e) => setImageZoom(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={handleApplyImageCrop}
                      className="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-white"
                    >
                      Apply Crop
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageCropSrc('')}
                      className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
