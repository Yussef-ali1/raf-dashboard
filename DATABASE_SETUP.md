# إعداد قاعدة البيانات MongoDB

## المتطلبات

1. تثبيت MongoDB على الجهاز المحلي أو استخدام MongoDB Atlas
2. إضافة متغيرات البيئة

## إعداد متغيرات البيئة

قم بإنشاء ملف `.env.local` في مجلد المشروع وأضف:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/raf-dashboard

# يمكنك استخدام MongoDB Atlas بدلاً من المحلي
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/raf-dashboard?retryWrites=true&w=majority
```

## تثبيت MongoDB المحلي

### على Windows:
1. قم بتحميل MongoDB من [الموقع الرسمي](https://www.mongodb.com/try/download/community)
2. قم بتثبيت MongoDB
3. تأكد من تشغيل خدمة MongoDB

### على macOS:
```bash
brew install mongodb-community
brew services start mongodb-community
```

### على Linux (Ubuntu):
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

## استخدام MongoDB Atlas (موصى به للإنتاج)

1. قم بإنشاء حساب على [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ cluster جديد
3. أنشئ مستخدم لقاعدة البيانات
4. احصل على connection string
5. استبدل `MONGODB_URI` في ملف `.env.local`

## تشغيل المشروع

بعد إعداد قاعدة البيانات:

```bash
npm run dev
```

## الميزات الجديدة

### 1. تتبع التاريخ
- تسجيل جميع التغييرات في أرقام التواصل
- عرض تفاصيل كل تغيير
- إمكانية حذف سجلات التاريخ

### 2. API جديد
- `GET /api/settings/contact/history` - عرض تاريخ التغييرات
- `DELETE /api/settings/contact/history?id=...` - حذف سجل محدد

### 3. صفحة التاريخ
- عرض جميع التغييرات مع الفلترة
- إحصائيات سريعة
- تصفح الصفحات
- إمكانية حذف السجلات

## هيكل قاعدة البيانات

### Collection: contactnumbers
```javascript
{
  _id: ObjectId,
  unifiedPhone: String,
  marketingPhone: String,
  floatingPhone: String,
  floatingWhatsapp: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: contacthistories
```javascript
{
  _id: ObjectId,
  action: String, // 'create', 'update', 'delete', 'reset'
  oldData: {
    unifiedPhone: String,
    marketingPhone: String,
    floatingPhone: String,
    floatingWhatsapp: String
  },
  newData: {
    unifiedPhone: String,
    marketingPhone: String,
    floatingPhone: String,
    floatingWhatsapp: String
  },
  changedFields: [String],
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
``` 