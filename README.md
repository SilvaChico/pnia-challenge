# pnia v1.1

The application starts by running:
```
$npm install

$npm run start

```


# Phone number information aggregator
This system takes a list of phone numbers obtained from user input and returns
the count of valid phones broken down per prefix and per business sector.

For example, given 5 phones, 4 of them valid: one for Apple with prefix `+1`,
one for Bank of America with prefix `+1`, one for Quebramar with prefix
`+3519173`, and one for Salsa with prefix `+3519173`. In this case, the system
should return a count of 1 phone for Technology, and 1 phone for Banking
associated with the `+1` prefix, and a count of 2 phones for Clothing associated
with the `+3519173` prefix.

i.e.
```
$ curl -d '["+1983236248", "+1 7490276403", "001382355A", "+351917382672", "+35191734022"]' "http://challenge.example.com/aggregate"
{
  "1": {
    "Technology": 1
    "Banking": 1
  },
  "3159173": {
    "Clothing": 2,
  }
}
```

The following sections further specify the expected inputs and outputs of the
system.

## Phone information aggregator API spec

The API exposes a single endpoint, `/aggregate`. This endpoint accepts `POST` requests with a JSON array of
strings representing phone numbers, and returns a JSON object as response. The response object contains one key per prefix present in the valid input numbers, and each value corresponding to those keys is another JSON object mapping business sectors to their count of phones.

More specifically, the API accepts `POST` requests to the `/aggregate` endpoint
with a body that complies with the following schema:

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

And its response body complys with the following schema:

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "additionalProperties": {
    "type": "object",
    "additionalProperties": {
      "type": "number"
    }
  }
}
```

### Practical example of interaction with API

Given the following `prefixes.txt` file:

```
1
2
44
```

And the Business sector API returns the following replies:

```
$ curl https://challenge-business-sector-api.meza.talkdeskstg.com/sector/+1983248
{
  "number": "+1983248",
  "sector": "Technology"
}
```

```
$ curl https://challenge-business-sector-api.meza.talkdeskstg.com/sector/001382355
{
  "number": "+1382355",
  "sector": "Technology"
}
```

```
$ curl "https://challenge-business-sector-api.meza.talkdeskstg.com/sector/+147%208192"
{
  "number": "+1478192",
  "sector": "Clothing"
}
```

```
$ curl https://challenge-business-sector-api.meza.talkdeskstg.com/sector/+4439877
{
  "number": "+4439877",
  "sector": "Banking"
}
```

Then when `POST`ing the following to the phone number information aggregator API's `/aggregate` endpoint:

```
["+1983248", "001382355", "+147 8192", "+4439877"]
```

The API returns:

```
{
  "1": {
    "Technology": 2,
    "Clothing": 1
  },
  "44": {
    "Banking": 1
  }
}

```


