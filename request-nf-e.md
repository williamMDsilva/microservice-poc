## **Request New NF**

### **Endpoint**

- **URI**: `http://localhost:4000/api/request/nf`
- **Method**: `POST`

### **Description**

this service create a request to create a new NF

### **Headers**

- `access_token`: `<access_token>` note: not implemented yet (required)
- `Content-Type`: `application/json`

### **Query Parameters**

List any query parameters that can be passed in the URL.
| Parameter | Type | Description |
|-----------|--------|------------------------------|
| `-` | string | - |

### **Path Parameters**

List any path parameters that are part of the URL.
| Parameter | Type | Required | Description |
|-----------|--------|----------|------------------------------|
| `-` | string | Yes | -

### **Request Body**

Body parameters.
| Parameter | Type | Description |
|-----------|--------|------------------------------|
| `name_provider` | string | body of the message (required) |
| `cnpj_provider` | string | title of the message (required) |
| `name_taker` | string | body of the message (required) |
| `cnpj_taker` | string | title of the message (required) |
| `cnae` | string | title of the message (required) |
| `value` | number | number != 0 (required) |

- **Content-Type**: `application/json`

```json
{
  "name_provider": "Meu  nome de prestador de servico!",
  "cnpj_provider": "74.237.905/0001-16",
  "name_taker": "Meu  nome de tomador de servico!",
  "cnpj_taker": "26.085.614/0001-07",
  "cnae": "000/13",
  "value": 13864.67
}
```

### **Response**

If the request has success, the endpoint will return 201

#### **Success Response**

- **Status**: `201 CREATED`

```json
{
  "id": "4957ce93-68e2-48ea-8670-80f6e44873cb"
}
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
  "message": "Check the data provided"
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

To send new request to all

```bash
curl -X POST "http://localhost:4000/api/request/nf" \
-H "access_token: <access_token>" \
-H "Content-Type: application/json" \
-d '{
      "name_provider": "Meu  nome de prestador de servico!",
      "cnpj_provider": "74.237.905/0001-16",
      "name_taker": "Meu  nome de tomador de servico!",
      "cnpj_taker": "26.085.614/0001-07",
      "cnae": "000/13",
      "value": 13864.67
  }'
```

#### **JavaScript (Fetch API)**

```javascript
fetch("http://localhost:4000/api/notification/send/asdaf123[12345afsd]", {
  method: "POST",
  headers: {
    access_token: "<access_token>",
    "Content-Type": "application/json",
  },
  body: JSON.stringfy({
    body: "you has been notified",
    title: "hey!",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### **Notes**

---
