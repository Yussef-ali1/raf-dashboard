# Contact Settings API Integration Guide

## 📋 Overview

This API provides comprehensive contact number management functionality for your platform. It includes CRUD operations for contact numbers with validation, history tracking, and reset capabilities.

## 🔗 Base URL

```
https://your-domain.com/api/settings/contact
```

## 🔐 Authentication

Currently, the API doesn't require authentication. If you need to add authentication, you can:

1. **Add JWT middleware** to the API routes
2. **Use API keys** in headers
3. **Implement session-based auth**

### Example with JWT:
```javascript
// Add to your API calls
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

## 📡 API Endpoints

### 1. GET - Fetch Current Contact Numbers

**Endpoint:** `GET /api/settings/contact`

**Description:** Retrieves the current contact numbers from the database.

**Request:**
```javascript
const response = await fetch('/api/settings/contact', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
```

**Response:**
```json
{
  "success": true,
  "message": "تم جلب أرقام التواصل بنجاح",
  "data": {
    "unifiedPhone": "920031103",
    "marketingPhone": "0500000000",
    "floatingPhone": "0500000000",
    "floatingWhatsapp": "0500000000"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "خطأ في جلب أرقام التواصل"
}
```

### 2. PUT - Update All Contact Numbers

**Endpoint:** `PUT /api/settings/contact`

**Description:** Updates all contact numbers at once with validation.

**Request:**
```javascript
const contactData = {
  unifiedPhone: "920031103",
  marketingPhone: "0501234567",
  floatingPhone: "0507654321",
  floatingWhatsapp: "0509876543"
}

const response = await fetch('/api/settings/contact', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(contactData)
})
```

**Response:**
```json
{
  "success": true,
  "message": "تم تحديث جميع أرقام التواصل بنجاح",
  "data": {
    "unifiedPhone": "920031103",
    "marketingPhone": "0501234567",
    "floatingPhone": "0507654321",
    "floatingWhatsapp": "0509876543"
  }
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": [
    "الرقم الموحد يجب أن يكون 9 أرقام",
    "رقم التسويق الرئيسي يجب أن يبدأ بـ 05"
  ]
}
```

### 3. POST - Update Specific Contact Numbers

**Endpoint:** `POST /api/settings/contact`

**Description:** Updates only the provided contact numbers (partial update).

**Request:**
```javascript
const partialData = {
  marketingPhone: "0501234567",
  floatingPhone: "0507654321"
}

const response = await fetch('/api/settings/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(partialData)
})
```

### 4. DELETE - Reset to Default Values

**Endpoint:** `DELETE /api/settings/contact`

**Description:** Resets all contact numbers to their default values.

**Request:**
```javascript
const response = await fetch('/api/settings/contact', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})
```

**Response:**
```json
{
  "success": true,
  "message": "تم إعادة تعيين أرقام التواصل بنجاح",
  "data": {
    "unifiedPhone": "920031103",
    "marketingPhone": "0500000000",
    "floatingPhone": "0500000000",
    "floatingWhatsapp": "0500000000"
  }
}
```

## 📊 Data Validation Rules

### Contact Number Formats

| Field | Format | Example | Validation |
|-------|--------|---------|------------|
| `unifiedPhone` | 9 digits | `920031103` | Must be exactly 9 digits |
| `marketingPhone` | 05XXXXXXXX | `0501234567` | Must start with "05" |
| `floatingPhone` | 05XXXXXXXX | `0507654321` | Must start with "05" |
| `floatingWhatsapp` | 05XXXXXXXX | `0509876543` | Must start with "05" |

### Validation Functions

```javascript
// Unified number validation
const validateUnifiedNumber = (number) => {
  const cleanNumber = number.replace(/[\s\-\(\)]/g, '')
  return /^[0-9]{9}$/.test(cleanNumber)
}

// Marketing number validation
const validateMarketingNumber = (number) => {
  const cleanNumber = number.replace(/[\s\-\(\)]/g, '')
  return /^05[0-9]{8}$/.test(cleanNumber)
}
```

## 🔄 History Tracking

All changes are automatically logged in the `ContactHistory` collection with:

- **Action type** (create, update, delete, reset)
- **Old data** (previous values)
- **New data** (updated values)
- **Changed fields** (which fields were modified)
- **IP address** and **user agent** (if available)
- **Timestamp**

## 🛠️ Integration Examples

### React/Next.js Integration

```javascript
import { useState, useEffect } from 'react'

function ContactSettings() {
  const [contactNumbers, setContactNumbers] = useState({
    unifiedPhone: '',
    marketingPhone: '',
    floatingPhone: '',
    floatingWhatsapp: ''
  })
  const [loading, setLoading] = useState(false)

  // Fetch current numbers
  const fetchNumbers = async () => {
    try {
      const response = await fetch('/api/settings/contact')
      const data = await response.json()
      
      if (data.success) {
        setContactNumbers(data.data)
      }
    } catch (error) {
      console.error('Error fetching numbers:', error)
    }
  }

  // Update numbers
  const updateNumbers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/settings/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactNumbers)
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert('تم تحديث الأرقام بنجاح')
      } else {
        alert(data.message || 'خطأ في التحديث')
      }
    } catch (error) {
      console.error('Error updating numbers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNumbers()
  }, [])

  return (
    <div>
      {/* Your form components */}
      <button onClick={updateNumbers} disabled={loading}>
        {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
      </button>
    </div>
  )
}
```

### Vanilla JavaScript Integration

```javascript
class ContactAPI {
  constructor(baseURL = '/api/settings/contact') {
    this.baseURL = baseURL
  }

  async getNumbers() {
    try {
      const response = await fetch(this.baseURL)
      const data = await response.json()
      
      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error fetching numbers:', error)
      throw error
    }
  }

  async updateNumbers(numbers) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(numbers)
      })
      
      const data = await response.json()
      
      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error updating numbers:', error)
      throw error
    }
  }

  async resetNumbers() {
    try {
      const response = await fetch(this.baseURL, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error resetting numbers:', error)
      throw error
    }
  }
}

// Usage
const contactAPI = new ContactAPI()

// Get numbers
contactAPI.getNumbers()
  .then(numbers => console.log('Current numbers:', numbers))
  .catch(error => console.error('Error:', error))

// Update numbers
const newNumbers = {
  unifiedPhone: "920031103",
  marketingPhone: "0501234567",
  floatingPhone: "0507654321",
  floatingWhatsapp: "0509876543"
}

contactAPI.updateNumbers(newNumbers)
  .then(updatedNumbers => console.log('Updated numbers:', updatedNumbers))
  .catch(error => console.error('Error:', error))
```

### PHP Integration

```php
<?php
class ContactAPI {
    private $baseURL;
    
    public function __construct($baseURL = 'https://your-domain.com/api/settings/contact') {
        $this->baseURL = $baseURL;
    }
    
    public function getNumbers() {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseURL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $data = json_decode($response, true);
        
        if ($data['success']) {
            return $data['data'];
        } else {
            throw new Exception($data['message']);
        }
    }
    
    public function updateNumbers($numbers) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseURL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($numbers));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $data = json_decode($response, true);
        
        if ($data['success']) {
            return $data['data'];
        } else {
            throw new Exception($data['message']);
        }
    }
}

// Usage
try {
    $contactAPI = new ContactAPI();
    
    // Get current numbers
    $numbers = $contactAPI->getNumbers();
    echo "Current numbers: " . json_encode($numbers) . "\n";
    
    // Update numbers
    $newNumbers = [
        'unifiedPhone' => '920031103',
        'marketingPhone' => '0501234567',
        'floatingPhone' => '0507654321',
        'floatingWhatsapp' => '0509876543'
    ];
    
    $updatedNumbers = $contactAPI->updateNumbers($newNumbers);
    echo "Updated numbers: " . json_encode($updatedNumbers) . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
```

### Python Integration

```python
import requests
import json

class ContactAPI:
    def __init__(self, base_url="https://your-domain.com/api/settings/contact"):
        self.base_url = base_url
    
    def get_numbers(self):
        try:
            response = requests.get(self.base_url)
            data = response.json()
            
            if data['success']:
                return data['data']
            else:
                raise Exception(data['message'])
        except Exception as e:
            print(f"Error fetching numbers: {e}")
            raise
    
    def update_numbers(self, numbers):
        try:
            headers = {'Content-Type': 'application/json'}
            response = requests.put(
                self.base_url,
                data=json.dumps(numbers),
                headers=headers
            )
            data = response.json()
            
            if data['success']:
                return data['data']
            else:
                raise Exception(data['message'])
        except Exception as e:
            print(f"Error updating numbers: {e}")
            raise
    
    def reset_numbers(self):
        try:
            response = requests.delete(self.base_url)
            data = response.json()
            
            if data['success']:
                return data['data']
            else:
                raise Exception(data['message'])
        except Exception as e:
            print(f"Error resetting numbers: {e}")
            raise

# Usage
if __name__ == "__main__":
    contact_api = ContactAPI()
    
    try:
        # Get current numbers
        numbers = contact_api.get_numbers()
        print(f"Current numbers: {numbers}")
        
        # Update numbers
        new_numbers = {
            'unifiedPhone': '920031103',
            'marketingPhone': '0501234567',
            'floatingPhone': '0507654321',
            'floatingWhatsapp': '0509876543'
        }
        
        updated_numbers = contact_api.update_numbers(new_numbers)
        print(f"Updated numbers: {updated_numbers}")
        
    except Exception as e:
        print(f"Error: {e}")
```

## 🔧 Error Handling

### Common Error Responses

```json
{
  "success": false,
  "message": "جميع الأرقام مطلوبة"
}
```

```json
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": [
    "الرقم الموحد يجب أن يكون 9 أرقام",
    "رقم التسويق الرئيسي يجب أن يبدأ بـ 05"
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

## 📝 Database Schema

### ContactNumbers Collection
```javascript
{
  _id: ObjectId,
  unifiedPhone: String,      // 9 digits
  marketingPhone: String,     // 05XXXXXXXX
  floatingPhone: String,      // 05XXXXXXXX
  floatingWhatsapp: String,   // 05XXXXXXXX
  createdAt: Date,
  updatedAt: Date
}
```

### ContactHistory Collection
```javascript
{
  _id: ObjectId,
  action: String,             // "create", "update", "delete", "reset"
  oldData: Object,            // Previous values
  newData: Object,            // New values
  changedFields: [String],    // Array of changed field names
  ipAddress: String,          // Client IP
  userAgent: String,          // Client user agent
  createdAt: Date
}
```

## 🚀 Deployment

### Environment Variables

Add these to your `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/your-database
# or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database
```

### Database Setup

1. **Install MongoDB** or use **MongoDB Atlas**
2. **Create the database** and collections
3. **Set up indexes** for better performance:

```javascript
// In MongoDB shell
use your-database

// Create indexes
db.contactnumbers.createIndex({ "createdAt": -1 })
db.contacthistory.createIndex({ "createdAt": -1 })
db.contacthistory.createIndex({ "action": 1 })
```

## 🔒 Security Considerations

1. **Add authentication** to protect sensitive operations
2. **Implement rate limiting** to prevent abuse
3. **Validate input** on both client and server side
4. **Use HTTPS** in production
5. **Log security events** for monitoring

## 📞 Support

For questions or issues:
- Check the API responses for error messages
- Review the validation rules
- Ensure your database connection is working
- Verify the environment variables are set correctly

---

**Version:** 1.0.0  
**Last Updated:** December 2024 