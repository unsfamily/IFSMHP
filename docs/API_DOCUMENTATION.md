# IFSMHP API Documentation

## Overview

The IFSMHP application provides REST API endpoints for connecting to services and managing notifications.

## Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## Endpoints

### 1. Connect to IFSMHP Services

Establishes a connection to IFSMHP services and returns available features.

**Endpoint:** `POST /api/connect`

**Request Body:**
```json
{
  "userId": "string",
  "action": "connect"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "IFSMHP connection established successfully",
  "data": {
    "userId": "string",
    "action": "connect",
    "connected": true,
    "timestamp": "2024-11-06T12:00:00.000Z",
    "services": [
      "Mental Health Resources",
      "Family Support Programs",
      "Community Services",
      "Professional Counseling"
    ]
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to establish connection",
  "error": "Error message"
}
```

**Example Usage:**
```typescript
async function connectToIFSMHP(userId: string) {
  try {
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        action: "connect",
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log("Connected successfully:", data.data.services);
    }
  } catch (error) {
    console.error("Connection failed:", error);
  }
}
```

---

### 2. Get API Status

Check if the API is online and view available endpoints.

**Endpoint:** `GET /api/connect`

**Response:**
```json
{
  "status": "online",
  "message": "IFSMHP API is running",
  "version": "1.0.0",
  "endpoints": {
    "connect": "/api/connect - POST",
    "notifications": "/api/notifications - GET"
  }
}
```

**Example Usage:**
```typescript
async function checkAPIStatus() {
  const response = await fetch("/api/connect");
  const status = await response.json();
  console.log("API Status:", status);
}
```

---

### 3. Get Notifications

Retrieve recent system notifications.

**Endpoint:** `GET /api/notifications`

**Response:**
```json
{
  "success": true,
  "notifications": [
    {
      "id": 1,
      "type": "info",
      "title": "New Mental Health Resources Available",
      "message": "We've added comprehensive guides and support materials for families.",
      "imageUrl": "/images/mental-health-banner.svg",
      "timestamp": "2024-11-06T12:00:00.000Z"
    },
    {
      "id": 2,
      "type": "success",
      "title": "Community Event Success",
      "message": "Thank you to everyone who participated in last week's wellness workshop!",
      "timestamp": "2024-11-05T12:00:00.000Z"
    },
    {
      "id": 3,
      "type": "warning",
      "title": "Upcoming Maintenance",
      "message": "System maintenance scheduled for this weekend. Services may be briefly unavailable.",
      "imageUrl": "/images/maintenance-banner.svg",
      "timestamp": "2024-11-04T12:00:00.000Z"
    }
  ],
  "count": 3
}
```

**Example Usage:**
```typescript
async function fetchNotifications() {
  try {
    const response = await fetch("/api/notifications");
    const data = await response.json();
    
    if (data.success) {
      return data.notifications;
    }
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}

// Use with banner notification system
async function showLatestNotification() {
  const { showBanner } = useBannerNotification();
  const notifications = await fetchNotifications();
  
  if (notifications.length > 0) {
    const latest = notifications[0];
    showBanner({
      type: latest.type,
      title: latest.title,
      message: latest.message,
      imageUrl: latest.imageUrl,
      duration: 6000,
    });
  }
}
```

---

## Error Handling

All API endpoints use standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `500` - Internal Server Error

Error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Rate Limiting

Currently, there are no rate limits implemented. This may change in future versions.

## Authentication

The current version does not require authentication. Future versions may implement user authentication.

## Versioning

Current API version: `v1.0.0`

The version is included in the status endpoint response.

## CORS

CORS is configured to allow requests from the same origin. For cross-origin requests, you may need to configure CORS in the Next.js configuration.

## Response Times

Expected response times:
- `/api/connect` (POST): ~500ms (includes simulated processing)
- `/api/connect` (GET): <50ms
- `/api/notifications` (GET): <50ms

## Future Endpoints

Planned for future releases:
- `POST /api/notifications` - Create new notification
- `GET /api/services` - List available services
- `POST /api/services/subscribe` - Subscribe to a service
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## Testing

Use tools like:
- **curl**: Command-line testing
- **Postman**: API testing and documentation
- **Thunder Client**: VS Code extension
- **Browser DevTools**: Quick fetch() testing

Example curl commands:

```bash
# Check API status
curl http://localhost:3000/api/connect

# Connect to services
curl -X POST http://localhost:3000/api/connect \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user","action":"connect"}'

# Get notifications
curl http://localhost:3000/api/notifications
```

## Support

For API issues or questions, contact the development team at unsdigitaltechnologies@gmail.com
