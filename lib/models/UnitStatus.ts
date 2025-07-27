import mongoose, { Schema, Document } from 'mongoose';

export interface IUnitStatus extends Document {
  projectId: string;
  projectName: string;
  statuses: Array<{
    status: string; // مثل: متاح، مباع، محجوز...
    percentage: number; // النسبة المئوية
    count: number; // عدد الوحدات في هذه الحالة
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UnitStatusSchema = new Schema<IUnitStatus>({
  projectId: { type: String, required: true, unique: true },
  projectName: { type: String, required: true },
  statuses: [
    {
      status: { type: String, required: true },
      percentage: { type: Number, required: true, min: 0, max: 100 },
      count: { type: Number, required: true, min: 0 },
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.models.UnitStatus || mongoose.model<IUnitStatus>('UnitStatus', UnitStatusSchema); 