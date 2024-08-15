## **Subscrive user push notification**

### **Endpoint**

- **URI**: `http://localhost:4000/api/notification/subscrive`
- **Method**: `POST`

### **Description**

This route save a token, from a expo app.
subscribe a user to recive push notification

### **Headers**

Include any necessary headers for the request.

- `access_token`: `<access_token>` (required to auth)
- `Content-Type`: `application/json`

### **Query Parameters**

List any query parameters that can be passed in the URL.
| Parameter | Type | Required | Description |
|-----------|--------|----------|------------------------------|
| `-` | string | No/Yes | Explanation |

### **Path Parameters**

List any path parameters that are part of the URL.
| Parameter | Type | Description |
|-----------|--------|------------------------------|
| `-` | string | - |

### **Request Body**

Body parameters.
| Parameter | Type | Description |
|-----------|--------|------------------------------|
| `token` | string | user token provide by expo application (required to auth) |

- **Content-Type**: `application/json`

```json
{
  "token": "asdas[123qsad]"
}
```

### **Response**

If the request has success, the endpoint will return 201

#### **Success Response**

- **Status**: `201 CREATED`

```json
{ "id": "uuid" }
```

#### **Error Responses**

- **Status**: `401 Unauthorized`

```json
{
  "error": "unauthorized",
  "message": "Check the access_token on header"
}
```

- **Status**: `400 Bad Request`

```json
{
  "error": "invalid_data",
  "message": "Check the token provide by expo"
}
```

- **Status**: `500 Internal Server Error`

```json
{
  "error": "error_server",
  "message": "Something went wrong!"
}
```

### **Examples**

#### **cURL**

```bash
curl -X POST "http://localhost:4000/api/notification/subscribe" \
-H "access_token: <access_token>" \
-H "Content-Type: application/json" \
-d '{"token": "<token>"}'
```

#### **JavaScript (Fetch API)**

```javascript
fetch("http://localhost:4000/api/notification/subscribe", {
  method: "POST",
  headers: {
    access_token: "<access_token>",
    "Content-Type": "application/json",
  },
  body: JSON.stringfy({ token: "asdq324[asd1234]" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### **Notes**

---
