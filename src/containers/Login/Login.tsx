import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import * as loginApi from 'api/modules/login'

const Login = () => {
  const [state, setState] = useState<stateProps>({ email: '', password: '' })
  const [error, setError] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onChange = (field: string) => (ev: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [field]: ev.target.value
    })
    if (!!error) {
      setError('')
    }
  }

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setToken('')
    try {
      setIsLoading(true)
      const res = await loginApi.login(state)
      setToken(res.token)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={state['email']}
                onChange={onChange('email')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={state['password']}
                onChange={onChange('password')}
              />
            </Form.Group>
            {!!error && (
              <p style={{ color: 'red', fontSize: 14 }}>{error}</p>
            )}
            <Button variant="primary" type="submit">
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'Submit'
              )}
            </Button>
            {!!token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{`Success! Token is: ${token}`}</p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

interface stateProps {
  email: string
  password: string
}

export default Login
