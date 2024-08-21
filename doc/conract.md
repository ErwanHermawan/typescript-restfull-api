# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
	"first_name": "John",
	"last_name": "Doe",
	"email": "john@gmail.com",
	"phone": "08232311"
}
```

Response Body (success):

```json
{
	"data": {
		"id": 1,
		"first_name": "John",
		"last_name": "Doe",
		"email": "john@gmail.com",
		"phone": "08232311"
	}
}
```

Response Body (failed):

```json
{
	"errors": "first_name must not blank, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
	"data": {
		"id": 1,
		"first_name": "John",
		"last_name": "Doe",
		"email": "john@gmail.com",
		"phone": "08232311"
	}
}
```

Response Body (failed):

```json
{
	"errors": "Contact is not found."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
	"first_name": "John",
	"last_name": "Doe",
	"email": "john@gmail.com",
	"phone": "08232311"
}
```

Response Body (success):

```json
{
	"data": {
		"id": 1,
		"first_name": "John",
		"last_name": "Doe",
		"email": "john@gmail.com",
		"phone": "08232311"
	}
}
```

Response Body (failed):

```json
{
	"errors": "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
	"data": "OK"
}
```

Response Body (failed):

```json
{
	"errors": "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name: string, contact firt name or last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
	"data": [
		{
			"id": 1,
			"first_name": "John",
			"last_name": "Doe",
			"email": "john@gmail.com",
			"phone": "08232311"
		}
	],
	"paging": {
		"current_page": 1,
		"total_page": 10,
		"size": 10
	}
}
```

Response Body (failed):

```json
{
	"errors": "Unauthorize"
}
```
