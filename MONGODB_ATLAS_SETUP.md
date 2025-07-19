# إعداد MongoDB Atlas - قاعدة البيانات الموجودة

## 🔧 الخطوات المطلوبة:

### 1. **إنشاء ملف البيئة**
قم بإنشاء ملف `.env.local` في مجلد المشروع وأضف:

```env
MONGODB_URI=mongodb+srv://yussefaliit:YOUR_ACTUAL_PASSWORD@cluster0.kh1mn12.mongodb.net/YOUR_EXISTING_DATABASE?retryWrites=true&w=majority&appName=Cluster0
```

**مهم**: 
- استبدل `YOUR_ACTUAL_PASSWORD` بكلمة المرور الحقيقية
- استبدل `YOUR_EXISTING_DATABASE` باسم قاعدة البيانات الموجودة لديك

### 2. **تحديث connection string**
في connection string الذي قدمته:
```
mongodb+srv://yussefaliit:<db_password>@cluster0.kh1mn12.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

أضف اسم قاعدة البيانات الموجودة بعد `.net/`:
```
mongodb+srv://yussefaliit:YOUR_PASSWORD@cluster0.kh1mn12.mongodb.net/YOUR_EXISTING_DATABASE?retryWrites=true&w=majority&appName=Cluster0
```

### 3. **Collections الجديدة التي سيتم إنشاؤها**
سيتم إنشاء collections جديدة في قاعدة البيانات الموجودة:

- `contactnumbers` - لأرقام التواصل
- `contacthistories` - لتاريخ التغييرات

### 4. **اختبار الاتصال**
بعد إنشاء ملف `.env.local`، قم بتشغيل المشروع:

```bash
npm run dev
```

ثم اختبر API:
```bash
GET http://localhost:3000/api/settings/contact
```

## 📊 هيكل البيانات الجديد

### Collection: `contactnumbers`
```javascript
{
  _id: ObjectId,
  unifiedPhone: "920031103",
  marketingPhone: "0500000000", 
  floatingPhone: "0500000000",
  floatingWhatsapp: "0500000000",
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `contacthistories`
```javascript
{
  _id: ObjectId,
  action: "update", // create, update, delete, reset
  oldData: {
    unifiedPhone: "920031103",
    marketingPhone: "0500000000",
    floatingPhone: "0500000000", 
    floatingWhatsapp: "0500000000"
  },
  newData: {
    unifiedPhone: "920031103",
    marketingPhone: "0512345678",
    floatingPhone: "0598765432",
    floatingWhatsapp: "0555555555"
  },
  changedFields: ["marketingPhone", "floatingPhone", "floatingWhatsapp"],
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla...",
  createdAt: Date
}
```

## ✅ التحقق من الإعداد

بعد الإعداد، يمكنك التحقق من:

1. **جلب الأرقام**: `GET /api/settings/contact`
2. **تحديث الأرقام**: `PUT /api/settings/contact`
3. **عرض التاريخ**: `GET /api/settings/contact/history`

## 🔍 حل المشاكل

### إذا ظهر خطأ "Database not found":
- تأكد من صحة اسم قاعدة البيانات في connection string
- تأكد من أن قاعدة البيانات موجودة في MongoDB Atlas

### إذا ظهر خطأ "Collection not found":
- Collections ستُنشأ تلقائياً عند أول استخدام
- لا تحتاج لإنشاء collections يدوياً

## 📝 ملاحظات مهمة

- البيانات الجديدة ستُضاف إلى قاعدة البيانات الموجودة
- لن تؤثر على البيانات الموجودة مسبقاً
- Collections الجديدة ستُنشأ تلقائياً 