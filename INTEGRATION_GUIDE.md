# Frontend-Backend Integration Guide

This guide provides step-by-step instructions to run the integrated Anthony website admin dashboard with the backend API.

## Prerequisites

1. **Backend Setup** (anthony-backend directory)
   - PHP 7.4+ with required extensions
   - Web server (Apache/Nginx) or PHP development server
   - MySQL/MariaDB database
   - Composer dependencies installed

2. **Frontend Setup** (anthony-adegbulugbe-website directory)
   - Node.js 18+
   - NPM or Yarn package manager

## Quick Start

### 1. Start the Backend Server

```bash
cd ../anthony-backend

# Install dependencies if not already done
composer install

# Start PHP development server
php -S localhost:8080 -t .

# Alternative: Use your preferred web server pointing to this directory
```

The backend API will be available at `http://localhost:8080`

### 2. Start the Frontend Development Server

```bash
cd ../anthony-adegbulugbe-website

# Install dependencies if not already done
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Configure Environment

The `.env.local` file has been created with the default configuration:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NODE_ENV=development
```

Modify the `NEXT_PUBLIC_API_BASE_URL` if your backend runs on a different port.

### 4. Database Setup

Run database migrations to create the required tables:

```bash
# In the backend directory
# Use your framework's migration command or import SQL manually
```

## Admin Dashboard Access

1. **Navigate to Admin Login**: `http://localhost:3000/admin/login`

2. **Default Admin Credentials**:
   - Username: `admin`
   - Password: `password123`

   ⚠️ **Change these credentials in production!**

3. **Admin Dashboard Features**:
   - **Dashboard**: Real-time statistics and recent activity
   - **Books Management**: Create, edit, delete books with file uploads
   - **Sermons Management**: Create, edit, delete sermons with theme association
   - **Themes Management**: Create and manage sermon themes
   - **Authentication**: Secure login/logout with session management

## API Integration Features

### Authentication
- ✅ Token-based authentication with fallback to session
- ✅ Automatic token verification and refresh
- ✅ Secure logout with backend session cleanup
- ✅ Protected routes requiring admin authentication

### Books Management
- ✅ CRUD operations for books
- ✅ File upload for cover images (JPG, PNG, GIF - max 5MB)
- ✅ PDF upload for book documents (max 50MB)
- ✅ Featured book toggle
- ✅ Real-time data synchronization

### Sermons Management
- ✅ CRUD operations for sermons
- ✅ Theme association with dynamic theme loading
- ✅ Create new themes on-the-fly
- ✅ PDF upload for sermon documents
- ✅ Featured sermon toggle
- ✅ Key points management

### Themes Management
- ✅ CRUD operations for themes
- ✅ Color scheme management
- ✅ Active/inactive status
- ✅ Automatic sermon/book counting

### Dashboard Statistics
- ✅ Real-time statistics (books, sermons, themes, total views)
- ✅ Recent activity feed
- ✅ Data refresh and error handling

## File Structure

### Frontend Changes Made
```
anthony-adegbulugbe-website/
├── .env.local                 # Environment configuration
├── lib/api.ts                 # API client and type definitions
├── hooks/use-auth.ts          # Updated authentication hook
├── app/admin/login/page.tsx   # Updated login page
├── app/admin/page.tsx         # Updated admin dashboard
├── app/admin/books/new/page.tsx  # Updated book creation
├── app/admin/sermons/new/page.tsx # Updated sermon creation
└── INTEGRATION_GUIDE.md       # This file
```

### Backend Structure
```
anthony-backend/
├── app/Auth/                  # Authentication module
├── app/Books/                 # Books management module
├── app/Sermons/              # Sermons management module
├── app/Themes/               # Themes management module
├── app/Dashboard/            # Dashboard statistics module
├── app/Services/             # Shared services
├── src/database/Tables/      # Database table definitions
├── src/database/Schemas/     # Data access layer
├── src/services/routes.php   # API routes configuration
└── API_DOCUMENTATION.md      # Backend API documentation
```

## API Endpoints Summary

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout
- `GET /auth/verify` - Verify token
- `GET /auth/user` - Get current user

### Dashboard
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/activity` - Recent activity
- `GET /dashboard/overview` - Complete dashboard data

### Books
- `GET /books` - List books (with pagination)
- `POST /books` - Create book
- `GET /books/{id}` - Get book details
- `POST /books/{id}` - Update book
- `DELETE /books/{id}` - Delete book
- `POST /books/{id}/toggle-featured` - Toggle featured
- `POST /books/{id}/upload-cover` - Upload cover image
- `POST /books/{id}/upload-pdf` - Upload PDF

### Sermons
- `GET /sermons` - List sermons (with pagination)
- `POST /sermons` - Create sermon
- `GET /sermons/{id}` - Get sermon details
- `POST /sermons/{id}` - Update sermon
- `DELETE /sermons/{id}` - Delete sermon
- `POST /sermons/{id}/toggle-featured` - Toggle featured
- `GET /sermons/theme/{themeId}` - Get sermons by theme
- `POST /sermons/{id}/upload-pdf` - Upload PDF

### Themes
- `GET /themes` - List themes
- `POST /themes` - Create theme
- `GET /themes/{id}` - Get theme details
- `POST /themes/{id}` - Update theme
- `DELETE /themes/{id}` - Delete theme
- `GET /themes/active` - Get active themes

## Testing the Integration

1. **Login Test**: 
   - Go to `/admin/login`
   - Use default credentials
   - Verify redirect to dashboard

2. **Dashboard Test**:
   - Check statistics load correctly
   - Verify recent activity displays
   - Test navigation between tabs

3. **Books Test**:
   - Create a new book
   - Upload cover image and PDF
   - Toggle featured status
   - Edit book details
   - Delete book

4. **Sermons Test**:
   - Create a new sermon with existing theme
   - Create a new sermon with new theme
   - Upload PDF document
   - Toggle featured status

5. **Themes Test**:
   - Create new theme
   - Edit theme details
   - Delete unused theme

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend allows requests from frontend origin
   - Check browser dev tools for CORS policy errors

2. **Authentication Failures**:
   - Verify default admin user exists in database
   - Check token format and expiration
   - Clear browser localStorage and retry

3. **File Upload Issues**:
   - Check file size limits
   - Verify upload directories exist and are writable
   - Check file type validation

4. **API Connection Issues**:
   - Verify backend server is running
   - Check API_BASE_URL in .env.local
   - Test API endpoints directly with curl/Postman

### Debug Steps

1. **Enable Browser DevTools**:
   - Check Network tab for failed requests
   - Monitor Console for errors
   - Inspect API responses

2. **Backend Logging**:
   - Check PHP error logs
   - Enable framework debugging
   - Monitor API request logs

3. **Clear Caches**:
   - Clear browser cache and cookies
   - Restart both servers
   - Clear localStorage data

## Production Deployment

### Security Considerations
1. Change default admin credentials
2. Use HTTPS for both frontend and backend
3. Implement proper JWT tokens instead of simple base64
4. Add rate limiting and request validation
5. Use environment-specific API URLs

### Performance Optimizations
1. Add database indexes for better query performance
2. Implement API response caching
3. Optimize file upload handling
4. Add image compression for uploads
5. Use CDN for static assets

### Environment Configuration
1. Set production API URLs in environment variables
2. Configure proper database connections
3. Set up file storage (local or cloud)
4. Configure logging and monitoring
5. Set up backup procedures

## Support

For issues or questions:
1. Check the browser console for errors
2. Review API documentation in `API_DOCUMENTATION.md`
3. Verify environment configuration
4. Test API endpoints independently
5. Check database connectivity and data

The integration provides a complete, working admin dashboard with real-time data management capabilities.