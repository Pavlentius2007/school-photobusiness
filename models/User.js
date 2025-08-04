const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно для заполнения'],
    trim: true,
    maxlength: [50, 'Имя не может быть длиннее 50 символов']
  },
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Пожалуйста, введите корректный email']
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    minlength: [6, 'Пароль должен содержать минимум 6 символов'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'curator', 'manager', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
      default: null
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    },
    autoRenew: {
      type: Boolean,
      default: false
    }
  },
  progress: {
    completedLessons: {
      type: Number,
      default: 0
    },
    totalLessons: {
      type: Number,
      default: 35
    },
    currentModule: {
      type: Number,
      default: 1
    },
    completedModules: [{
      moduleId: {
        type: Number,
        required: true
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      score: {
        type: Number,
        min: 0,
        max: 100
      }
    }],
    timeSpent: {
      type: Number, // в минутах
      default: 0
    },
    certificates: [{
      moduleId: {
        type: Number,
        required: true
      },
      issuedAt: {
        type: Date,
        default: Date.now
      },
      certificateUrl: String
    }]
  },
  testResults: [{
    moduleId: {
      type: Number,
      required: true
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    answers: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      },
      userAnswer: String,
      isCorrect: Boolean
    }],
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  questions: [{
    moduleId: {
      type: Number,
      required: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['pending', 'answered', 'closed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    answeredAt: {
      type: Date,
      default: null
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  comments: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Комментарий не может быть длиннее 1000 символов']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: {
      type: Date,
      default: null
    }
  }],
  notifications: [{
    type: {
      type: String,
      enum: ['lesson_available', 'test_reminder', 'question_answered', 'subscription_expiring', 'system'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }],
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    telegramNotifications: {
      type: Boolean,
      default: false
    },
    telegramChatId: {
      type: String,
      default: null
    },
    language: {
      type: String,
      enum: ['ru', 'en'],
      default: 'ru'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Виртуальные поля
userSchema.virtual('fullName').get(function() {
  return this.name;
});

userSchema.virtual('progressPercentage').get(function() {
  if (this.progress.totalLessons === 0) return 0;
  return Math.round((this.progress.completedLessons / this.progress.totalLessons) * 100);
});

userSchema.virtual('subscriptionDaysLeft').get(function() {
  if (!this.subscription.endDate || !this.subscription.isActive) return 0;
  const now = new Date();
  const endDate = new Date(this.subscription.endDate);
  const diffTime = endDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Индексы
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'subscription.isActive': 1 });
userSchema.index({ 'subscription.endDate': 1 });
userSchema.index({ createdAt: -1 });

// Middleware для хеширования пароля
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Методы
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

userSchema.methods.incLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 часа
  }
  
  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

userSchema.methods.hasAccessToModule = function(moduleId) {
  if (this.role === 'admin' || this.role === 'curator') return true;
  
  // Проверяем, завершен ли предыдущий модуль
  const previousModule = moduleId - 1;
  if (previousModule < 1) return true;
  
  return this.progress.completedModules.some(module => 
    module.moduleId === previousModule && module.score >= 70
  );
};

userSchema.methods.completeLesson = function(lessonId) {
  this.progress.completedLessons += 1;
  this.lastActivity = new Date();
  return this.save();
};

userSchema.methods.completeModule = function(moduleId, score) {
  const existingModule = this.progress.completedModules.find(m => m.moduleId === moduleId);
  
  if (!existingModule) {
    this.progress.completedModules.push({
      moduleId,
      score,
      completedAt: new Date()
    });
  }
  
  this.progress.currentModule = Math.max(this.progress.currentModule, moduleId + 1);
  this.lastActivity = new Date();
  
  return this.save();
};

userSchema.methods.addQuestion = function(moduleId, lessonId, question) {
  this.questions.push({
    moduleId,
    lessonId,
    question
  });
  
  return this.save();
};

userSchema.methods.addComment = function(lessonId, content) {
  this.comments.push({
    lessonId,
    content
  });
  
  return this.save();
};

userSchema.methods.addNotification = function(type, title, message, data = {}) {
  this.notifications.push({
    type,
    title,
    message,
    data
  });
  
  return this.save();
};

// Статические методы
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActiveSubscriptions = function() {
  return this.find({
    'subscription.isActive': true,
    'subscription.endDate': { $gt: new Date() }
  });
};

userSchema.statics.findExpiringSubscriptions = function(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  
  return this.find({
    'subscription.isActive': true,
    'subscription.endDate': { $lte: date, $gt: new Date() }
  });
};

module.exports = mongoose.model('User', userSchema); 