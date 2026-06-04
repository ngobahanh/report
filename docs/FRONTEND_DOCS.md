# Frontend Components Documentation

## 📦 Components Overview

### Layout Components

#### Sidebar.jsx
```jsx
<Sidebar />
```

Sidebar navigation với collapse/expand

**Features:**
- Menu items (Dashboard, Personnel, Units, etc.)
- Icons để dễ nhận diện
- Collapsible state
- Active route highlight
- Tooltip for collapsed state

#### Topbar.jsx
```jsx
<Topbar />
```

Top navigation bar

**Features:**
- System logo & name
- Search bar
- Notifications dropdown
- User profile menu
- Logout button

### Shared Components

#### Modal.jsx
```jsx
<Modal
  isOpen={modalOpen}
  title="Add New Item"
  onClose={handleClose}
  onSubmit={handleSubmit}
>
  {/* Form content */}
</Modal>
```

**Props:**
- `isOpen` (bool) - Show/hide modal
- `title` (string) - Modal title
- `onClose` (function) - Close handler
- `onSubmit` (function) - Submit handler
- `children` (jsx) - Modal content

#### Card.jsx
```jsx
<Card 
  title="Total Personnel"
  value={50}
  icon="👥"
  color="bg-primary"
/>
```

**Props:**
- `title` (string) - Card title
- `value` (number) - Large value display
- `icon` (string) - Emoji icon
- `color` (string) - Background color class

#### Pagination.jsx
```jsx
<Pagination 
  page={1}
  pages={5}
  onPageChange={setPage}
/>
```

**Props:**
- `page` (number) - Current page
- `pages` (number) - Total pages
- `onPageChange` (function) - Page change handler

### Page Components

#### Dashboard.jsx
Main dashboard with statistics and overview

**Features:**
- Stats cards (personnel, units, devices, errors)
- Welcome message
- Quick actions
- Charts (optional)

#### Personnel.jsx
Personnel management page

**Features:**
- List with pagination
- Search functionality
- Add/Edit/Delete via modal
- Filter by unit
- Date picker for birth date

#### Units.jsx
Unit management page

**Features:**
- Card/Grid view
- CRUD operations
- Unit hierarchy
- Device count

#### TrainingReports.jsx
Training reports management

**Features:**
- List with pagination
- Personnel selector for trainer
- Date/time picker
- Training hours
- Statistics

#### WorkshopReports.jsx
Workshop reports management

**Features:**
- List with pagination
- Date range filter
- Personnel selector

#### TaskReports.jsx
Task reports management

**Features:**
- Personnel statistics (total, present, absent)
- Dynamic task rows (add/remove)
- Progress percentage
- Status tracking (pending, in_progress, completed, on_hold)

#### DeviceReports.jsx
Device/server connectivity reports

**Features:**
- Device error tracking
- Disconnect/Resolve time
- Status filter (processing/resolved)
- Root cause analysis
- Solution tracking

#### ExportReports.jsx
Report export functionality

**Features:**
- Report type selection
- Date range picker
- Format selection (Excel/PDF)
- Download functionality

## 🛠️ Services

### api.js
API service with all endpoints

```javascript
// Personnel
personnelAPI.getAll(page, limit, search, unitId)
personnelAPI.getById(id)
personnelAPI.create(data)
personnelAPI.update(id, data)
personnelAPI.delete(id)

// Units
unitsAPI.getAll(search)
unitsAPI.getById(id)
unitsAPI.create(data)
unitsAPI.update(id, data)
unitsAPI.delete(id)

// Training Reports
trainingReportsAPI.getAll(page, limit, startDate, endDate)
trainingReportsAPI.getById(id)
trainingReportsAPI.create(data)
trainingReportsAPI.update(id, data)
trainingReportsAPI.delete(id)
trainingReportsAPI.getStats()

// And more...
```

## 🎨 Utilities

### dateUtils.js
```javascript
formatDate(date)           // "01/05/2026"
formatDateTime(date)       // "01/05/2026, 09:00:00"
getTodayDate()            // "2026-05-01"
getMonthRange()           // {start: ..., end: ...}
```

### constants.js
```javascript
statusColors = {
  processing: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  ...
}

statusLabels = {
  processing: 'Đang xử lý',
  resolved: 'Đã xử lý',
  ...
}
```

## 🎯 Usage Examples

### Adding New Page

1. Create component in `src/pages/NewPage.jsx`
2. Import in `App.jsx`
3. Add route:
```jsx
<Route path="/new-page" element={<NewPage />} />
```
4. Add menu item in `Sidebar.jsx`

### Creating Custom Hook

```javascript
// src/hooks/useCustom.js
import { useState, useEffect } from 'react';

export function useCustom() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Logic here
  }, []);
  
  return { data };
}
```

### Form Handling

```jsx
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async () => {
  try {
    await api.create(formData);
    alert('Success');
  } catch (error) {
    alert('Error');
  }
};
```

## 🔄 State Management

Currently using React hooks:
- `useState` - Local state
- `useEffect` - Side effects
- `useContext` - (Optional for global state)

For larger apps, consider Redux or Zustand.

## 📱 Responsive Design

Breakpoints (Tailwind):
- `sm` - 640px
- `md` - 768px (tablet)
- `lg` - 1024px (desktop)
- `xl` - 1280px
- `2xl` - 1536px

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

## ⚠️ Error Handling

```javascript
try {
  const response = await api.getAll();
  setData(response.data);
} catch (error) {
  console.error('Error:', error);
  alert('Error loading data');
}
```

## 🔒 Security

- API calls use axios
- No sensitive data in localStorage
- CORS enabled for LAN access
- Input validation on forms

## 🚀 Performance

- Code splitting with React.lazy (optional)
- Memoization with React.memo
- Pagination to limit data
- Debounce search input

---

**Version**: 1.0.0
