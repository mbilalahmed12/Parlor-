const mongoose = require('mongoose');

const dayHoursSchema = new mongoose.Schema({
  open: { type: String, default: '09:00' },
  close: { type: String, default: '20:00' }
}, { _id: false });

const settingsSchema = new mongoose.Schema({
  parlorName: {
    type: String,
    default: 'Elite Parlor'
  },
  parlorDescription: {
    type: String,
    default: 'Your premium beauty and wellness destination'
  },
  parlorLogoUrl: {
    type: String,
    default: ''
  },
  heroVideoUrl: {
    type: String,
    default: null
  },
  heroTitle: {
    type: String,
    default: 'Welcome to Elite Parlor'
  },
  heroSubtitle: {
    type: String,
    default: 'Experience luxury and transformation'
  },
  contactEmail: {
    type: String,
    default: 'info@parlor.com'
  },
  contactPhone: {
    type: String,
    default: '+1 (555) 000-0000'
  },
  contactAddress: {
    type: String,
    default: '123 Beauty Lane, City'
  },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  },
  workingHours: {
    monday: {
      type: dayHoursSchema,
      default: () => ({ open: '09:00', close: '20:00' })
    },
    tuesday: {
      type: dayHoursSchema,
      default: () => ({ open: '09:00', close: '20:00' })
    },
    wednesday: {
      type: dayHoursSchema,
      default: () => ({ open: '09:00', close: '20:00' })
    },
    thursday: {
      type: dayHoursSchema,
      default: () => ({ open: '09:00', close: '20:00' })
    },
    friday: {
      type: dayHoursSchema,
      default: () => ({ open: '09:00', close: '21:00' })
    },
    saturday: {
      type: dayHoursSchema,
      default: () => ({ open: '10:00', close: '22:00' })
    },
    sunday: {
      type: dayHoursSchema,
      default: () => ({ open: '10:00', close: '19:00' })
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
