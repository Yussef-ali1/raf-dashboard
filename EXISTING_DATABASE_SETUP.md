# إعداد قاعدة البيانات الموجودة

## 🎯 ما تحتاجه:

### 1. **اسم قاعدة البيانات الموجودة**
أخبرني باسم قاعدة البيانات الموجودة لديك، مثال:
- `my-app-database`
- `raf-dashboard` 
- `production-db`

### 2. **إنشاء ملف البيئة**
قم بإنشاء ملف `.env.local` في مجلد المشروع وأضف:

```env
MONGODB_URI=mongodb+srv://yussefaliit:YOUR_PASSWORD@cluster0.kh1mn12.mongodb.net/YOUR_DATABASE_NAME?retryWrites=true&w=majority&appName=Cluster0
```

**استبدل:**
- `YOUR_PASSWORD` بكلمة المرور الحقيقية
- `YOUR_DATABASE_NAME` باسم قاعدة البيانات الموجودة

### 3. **مثال عملي**
إذا كان اسم قاعدة البيانات `my-app`:

```env
MONGODB_URI=mongodb+srv://yussefaliit:mypassword123@cluster0.kh1mn12.mongodb.net/my-app?retryWrites=true&w=majority&appName=Cluster0
```

## 📊 ما سيحدث:

### Collections الجديدة التي ستُضاف:
- `contactnumbers` - لأرقام التواصل
- `contacthistories` - لتاريخ التغييرات

### البيانات الافتراضية:
```javascript
// في collection: contactnumbers
{
  unifiedPhone: "920031103",
  marketingPhone: "0500000000", 
  floatingPhone: "0500000000",
  floatingWhatsapp: "0500000000"
}
```

## ✅ اختبار الإعداد:

1. **إنشاء ملف `.env.local`**
2. **تشغيل المشروع**: `npm run dev`
3. **اختبار API**: `GET http://localhost:3000/api/settings/contact`

## 🔍 إذا واجهت مشاكل:

### خطأ "Database not found":
- تأكد من صحة اسم قاعدة البيانات
- تأكد من وجود قاعدة البيانات في MongoDB Atlas

### خطأ "Authentication failed":
- تأكد من صحة كلمة المرور
- تأكد من صلاحيات المستخدم

## 📝 ملاحظات:

- ✅ لن تؤثر على البيانات الموجودة
- ✅ Collections ستُنشأ تلقائياً
- ✅ البيانات الجديدة ستُضاف فقط 