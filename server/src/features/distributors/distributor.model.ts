import mongoose, {model, Schema} from "mongoose";

export interface DistributorDocument extends mongoose.Document {
  _id: string
  numberCard: string
  name: string
  surname: string
  nationality: string
  dateOfBirth?: Date
  gender?: "male" | "female"
  phone?: string
  cin?: string
  email?: string
  address?: string
  postalCode?: number
  upLine?: mongoose.Types.ObjectId
  sponsor?: mongoose.Types.ObjectId
  status: "active" | "inactive" | "suspended"
  shops: mongoose.Types.ObjectId[]
  isDeleted: boolean
  closed: boolean
  closedAt: Date | null
  deletedAt: Date | null
  createdAt?: Date
  updatedAt?: Date
  softDelete(): Promise<void>
  restore(): Promise<void>
  getMinimumInfo(): string
}

export type DistributorType = Pick<DistributorDocument, "numberCard" | "name" | "surname" | "nationality" | "dateOfBirth" | "gender" | "phone" | "cin" | "email" | "address" | "postalCode" | "upLine" | "sponsor">

const distributorSchema = new Schema<DistributorDocument>({
  numberCard: {
    type: String,
    unique: true,
    required: [true, 'Number card is required'],
    index: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Distributor",
    default: null
  },
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
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
  shops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: []
    },
  ],
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

const DistributorModel = model<DistributorDocument>("Distributor", distributorSchema)

export default DistributorModel
