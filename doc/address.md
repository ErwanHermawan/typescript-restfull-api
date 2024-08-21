# Address API Spec

## Create Address

Endpoint: POST /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
	"street": "Jl. Moh Hatta",
	"city": "Jakarta",
	"province": "Jakarta",
	"country": "Indonesia",
	"postal_code": "56234"
}
```

Response Body (success):

```json
{
	"data": {
		"id": 1,
		"street": "Jl. Moh Hatta",
		"city": "Jakarta",
		"province": "Jakarta",
		"country": "Indonesia",
		"postal_code": "56234"
	}
}
```

Response Body (failed):

```json
{
	"errors": "Postal code is requires"
}
```

## Get Address

Endpoint: GET /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
	"data": {
		"id": 1,
		"street": "Jl. Moh Hatta",
		"city": "Jakarta",
		"province": "Jakarta",
		"country": "Indonesia",
		"postal_code": "56234"
	}
}
```

Response Body (failed):

```json
{
	"errors": "Address is not found"
}
```

## Update Address

Endpoint: PUT /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
	"street": "Jl. Moh Hatta",
	"city": "Jakarta",
	"province": "Jakarta",
	"country": "Indonesia",
	"postal_code": "56234"
}
```

Response Body (success):

```json
{
	"data": {
		"id": 1,
		"street": "Jl. Moh Hatta",
		"city": "Jakarta",
		"province": "Jakarta",
		"country": "Indonesia",
		"postal_code": "56234"
	}
}
```

Response Body (failed):

```json
{
	"errors": "Postal code is requires"
}
```

## Remove Address

Endpoint: DELETE /api/contacts/:idContact/addresses/:idAddress

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
	"errors": "Address is not found"
}
```

## List Address

Endpoint: GET /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
	"data": [
		{
			"id": 1,
			"street": "Jl. Moh Hatta",
			"city": "Jakarta",
			"province": "Jakarta",
			"country": "Indonesia",
			"postal_code": "56234"
		}
	]
}
```

Response Body (failed):

```json
{
	"errors": "Contact is not found"
}
```
