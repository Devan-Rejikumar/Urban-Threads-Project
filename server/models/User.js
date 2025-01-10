// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: false
//     },

//     // isVerified : {
//     //     type : Boolean,
//     //     default : false
//     // },

//     googleId: {
//         type: String,
//         default: null,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     status: {
//         type: String,
//         enum: ['active', 'blocked', 'unblocked'], default: 'active'
//     },

//     // authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
// }, {
//     timestamps: true

// });

// const User = mongoose.model('User', userSchema);

// export default User;


// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   googleId: {
//     type: String,
//     default: null,
//   },
//   status: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   otp: {
//     type: String,  // Changed to String type
//     required: false,
//   },
//   otpExpiry: {
//     type: Date,
//     required: false,
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model('User', userSchema);


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,  
    default: undefined  
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiry: {
    type: Date,
    required: false,
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
