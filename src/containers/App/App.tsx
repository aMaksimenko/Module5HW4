import React, { Suspense, useState } from 'react'
import { Container, Spinner, Tab, Tabs } from 'react-bootstrap'

const User = React.lazy(() => import('containers/User'))
const Users = React.lazy(() => import('containers/Users'))
const Login = React.lazy(() => import('containers/Login'))

const App = () => {
  const defaultKey = 'user'
  const [selectedTab, setSelectedTab] = useState<string>(defaultKey)

  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <Container className="pt-4 pb-4">
        <Tabs
          activeKey={selectedTab}
          onSelect={(k) => setSelectedTab(k || defaultKey)}
          className="mb-3"
        >
          <Tab eventKey="user" title="User">
            {selectedTab === 'user' && <User />}
          </Tab>
          <Tab eventKey="users" title="Users List">
            {selectedTab === 'users' && <Users />}
          </Tab>
          <Tab eventKey="login" title="Login">
            {selectedTab === 'login' && <Login />}
          </Tab>
        </Tabs>
      </Container>
    </Suspense>
  )
}

export default App
