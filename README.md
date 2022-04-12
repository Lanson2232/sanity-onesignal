# sanity-plugin-onesignal

OneSignal Push Notification support for [Sanity.io](https://sanity.io?utm_source=sanity-plugin-onesignal)

# Installation

```
sanity install onesignal
```

<br>

# Usage

Use it in your schema types:

```js
// [...]
{
  fields: [
    // [...]
    {
      name: 'onesignal',
      title: 'Notification',
      type: 'onesignal',
    },
  ]
}
```
# Configuration
To use it you need to define your API Key and APP ID

```js
// .../studio/config/onesignal.json
{
  "onesignalApiKey": "exampleKey",
  "onesignalAppId": "exampleID"
}

```

