## **Update status**

### **Endpoint**

- **URI**: `http://localhost:4001/api/documents/:id`
- **Method**: `PATCH`

### **Description**

this service update a the status of the nf

### **Headers**

- `access_token`: `<access_token>` note: not implemented yet (required)

### **Query Parameters**

List any query parameters that can be passed in the URL.
| Parameter | Type | Description |
|-----------|--------|------------------------------|
| `-` | string | - |

### **Path Parameters**

List any path parameters that are part of the URL.
| Parameter | Type | Required | Description |
|-----------|--------|----------|------------------------------|
| `:id` | string | Yes | id of the document

### **Request Body**

Body parameters.
| Parameter | Type | Description |
|-----------|--------|------------------------------|
| `-` | string | body of the message (required) |

### **Response**

If the request has success, the endpoint will return 201

#### **Success Response**

- **Status**: `200 CREATED`

```json
{
  "id": "4957ce93-68e2-48ea-8670-80f6e44873cb"
}
```

- **Status**: `500 Internal Server Error`

```json
{}
```

### **Examples**

#### **cURL**

To send new request to all

```bash
curl --location --request PATCH 'http://localhost:4001/api/document/status/31d6e570-126f-4e09-8f6d-a2f7d7639611'
```

#### **JavaScript (Fetch API)**

```javascript
fetch(
  "http://localhost:4001/api/document/status/31d6e570-126f-4e09-8f6d-a2f7d7639611",
  {
    method: "POST",
    headers: {
      access_token: "<access_token>",
    },
  }
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### **Notes**

this endpoint will be call by a worker in go lang

---
