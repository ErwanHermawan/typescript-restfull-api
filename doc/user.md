# User API Spec

## Register User

Endpoint : POST /api/users

Request Body:

```json
{
	"username": "john",
	"password": "johndoe",
	"name": "John Doe"
}
```

Response Body (success) :

```json
{
	"data": {
		"username": "john",
		"name": "John Doe"
	}
}
```

Response Body (failed) :

```json
{
	"errors": "Username must not blank"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body:

```json
{
	"username": "john",
	"password": "johndoe"
}
```

Response Body (success) :

```json
{
	"data": {
		"username": "john",
		"name": "John Doe",
		"token": "uuid"
	}
}
```

Response Body (failed) :

```json
{
	"errors": "Username or password wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN: token

Response Body (success) :

```json
{
	"data": {
		"username": "john",
		"name": "John Doe"
	}
}
```

Response Body (failed) :

```json
{
	"errors": "Unauthorize"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN: token

Request Body:

```json
{
	"password": "johndoe", // optional
	"name": "John Doe" // optional
}
```

Response Body (success) :

```json
{
	"data": {
		"username": "john",
		"name": "John Doe"
	}
}
```

Response Body (failed) :

```json
{
	"errors": "Unauthorize"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN: token

Response Body (success) :

```json
{
	"data": "OK"
}
```

Response Body (failed) :

```json
{
	"errors": "Unauthorize"
}
```
