1- setting up network api (serverApi)

- /servers > post
- /servers/:id > post
  2- expand the reducer to include set_server, set_channel
  2.5- useAppData hook for calling network functions '/servers' getServers()
  -> on server click, call getServerData() '/servers/:id'
  3- check auth on testpage

const [app, setApp] = useState()
const [app, appDispatch] = userReducer(serverReducer)

setApp([asda])
appDispatch

app.message

SET_APP_DATA (imported from utils/constants)
SET_SERVER - setServer() (ServerList -> ServerListItem)
SET_CHANNEL - setChannel() (ChannelList -> ChannelListItem)

// testpage (where you imported the reducer for dispatch)
const setServer = (server) => {
dispatch({type: SET_SERVER})
}

switch (type)
case SET_SERVER:
{
...app,
server
}

{
server:
servers:
channel:
channels:
messages:
members:
active:
}

<ServerList 
  servers={state.servers}
  server={state.server}
  onChange={setServer} 
/>
