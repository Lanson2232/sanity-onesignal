import * as React from 'react'
import {Card, TextArea, TextInput, Text, Button, Box} from '@sanity/ui'
import axios from 'axios'
import {useSecrets, SettingsView} from 'sanity-secrets'

const namespace = 'onesignal'

const pluginConfigKeys = [
  {
    key: 'apiKey',
    title: 'OneSignal Api Key',
  },
  {
    key: 'appId',
    title: 'OneSignal App ID',
  },
]

export default React.forwardRef(function oneSignal(props, ref) {
  const [valueArea, setValueArea] = React.useState('')
  const [valueTitle, setValueTitle] = React.useState('')
  const [valueURL, setValueURL] = React.useState('')
  const {secrets} = useSecrets(namespace)
  const [showSettings, setShowSettings] = React.useState(false)

  React.useEffect(() => {
    if (!secrets) {
      setShowSettings(true)
    }
  }, [secrets])

  async function sendNotification(message) {
    let res = await axios({
      method: 'post',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${secrets.apiKey}`,
      },
      data: {app_id: secrets.appId, ...message},
    })

    return res.data
  }

  return (
    <Card padding={4}>
      <Box padding={[3, 3, 4, 5]} style={{outline: '2px solid rgb(240 240 240)'}}>
        <Text size={9}>Notification Title:</Text>
        <br />
        <TextInput
          value={valueTitle}
          onChange={(event) => setValueTitle(event.currentTarget.value)}
          required
        />
        <br />
        <Text size={9}>Notification Url:</Text>
        <br />
        <TextInput
          value={valueURL}
          onChange={(event) => setValueURL(event.currentTarget.value)}
          required
        />
        <br />
        <Text size={9}>Notification Content:</Text>
        <br />
        <TextArea
          onChange={(event) => setValueArea(event.currentTarget.value)}
          padding={[3, 3, 4]}
          value={valueArea}
          required
        />
        <br />
        <Button
          style={{marginLeft: '15px'}}
          padding={[3, 3, 4]}
          text="Publish Notification"
          tone="primary"
          onClick={async () =>
            await sendNotification({
              contents: {en: valueArea},
              headings: {en: valueTitle},
              url: valueURL ? valueURL : '',
              included_segments: ['Subscribed Users'],
            })
          }
        />
        {showSettings && (
          <SettingsView
            namespace={namespace}
            keys={pluginConfigKeys}
            onClose={() => {
              setShowSettings(false)
            }}
          />
        )}
      </Box>
    </Card>
  )
})
