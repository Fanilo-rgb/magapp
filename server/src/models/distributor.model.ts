import mongoose, {model, Schema} from "mongoose";

export interface DistributorDocument extends mongoose.Document {
  numberCard: string
  name: string
  surname: string
  offlineId?: string
  nationality: string
  dateOfBirth?: Date
  gender?: "male" | "female"
  phone?: string
  cin?: string
  email?: string
  address?: string
  postalCode?: number
  upLine?: mongoose.Schema.Types.ObjectId
  sponsor?: mongoose.Schema.Types.ObjectId
  status: "active" | "inactive" | "suspended"
  isDeleted: boolean
  closed: boolean
  closedAt?: Date
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
  softDelete(): Promise<void>
  restore(): Promise<void>
  getMinimumInfo(): string
}

const distributorSchema = new Schema<DistributorDocument>({
  numberCard: {
    type: String,
    unique: true,
    required: [true, 'Number card is required'],
    minlength: [7, "Must be at least 7 characters."],
    maxlength: [8, "Must be under 8 characters."]
  },
  name: {
    type: String,
    required: [true, "A name is required"],
    trim: true,
    uppercase: true
  },
  surname: { type: String, trim: true },
  offlineId: { type: String, default: null },
  nationality: {
    type: String,
    default: "malagasy"
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  gender: {
    type: String,
    enum: {
      values: ["male" , "female"],
      message: "{VALUE} is not a valid gender"
    },
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  cin: { type: String, default: null },
  email: { type: String, default: null, lowercase: true, trim: true },
  address: { type: String, default: "Antananarivo" },
  postalCode: { type: Number, default: 101 },
  upLine: {
    type: mongoose.Types.ObjectId,
    ref: "Distributor",
    default: null
  },
  sponsor: {
    type: mongoose.Types.ObjectId,
    ref: "Distributor",
    default: null
  },
  status: {
    type: String,
    enum: {
      values: ["active", "inactive", "suspended"],
      message: "{VALUE} is not a valid status"
    },
    default: "active"
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  closed: {
    type: Boolean,
    default: true
  },
  deletedAt: { type: Date, default: null },
  closedAt: { type: Date, default: null }
}, { timestamps: true })

distributorSchema.pre("save", function (next) {
  if (!this.surname || this.surname?.trim() === '') {
    this.surname = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  }
  next()
})

distributorSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  next();
})

distributorSchema.methods.softDelete = async function() {
  this.isDeleted = true
  this.deletedAt = new Date()
  await this.save()
}

distributorSchema.methods.restore = async function() {
  this.isDeleted = false
  this.deletedAt = null
  await this.save()
}

distributorSchema.methods.getMinimumInfo = function() {
  return `${this.numberCard} - ${this.name} ${this.surname}`
}

distributorSchema.index({ numberCard: 1 }, { unique: true });

const DistributorModel = model<DistributorDocument>("Distributor", distributorSchema)

export default DistributorModel
