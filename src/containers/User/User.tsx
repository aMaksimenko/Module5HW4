import React, { ChangeEvent, useState } from 'react'
import * as userApi from 'api/modules/users'
import { IUser } from 'interfaces/users'
import { Button, Col, Container, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap'
import UserCard from 'components/UserCard'

const User = () => {
  const [input, setInput] = useState<string>('')
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getUserById = async (id: number) => {
    try {
      setIsLoading(true)
      const res = await userApi.getById(id)

      setUser(res.data)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
    setIsLoading(false)
  }

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!!error) {
      setError('')
    }
    setInput(ev.target.value)
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <InputGroup className="mb-2">
            <FormControl
              type="number"
              value={input}
              onChange={onChange}
              isInvalid={!!error}
              placeholder="Enter userID here"
            />
            <Button
              disabled={!input}
              variant="primary"
              onClick={() => input && getUserById(Number(input))}
              type="button"
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'Submit'
              )}
            </Button>
          </InputGroup>
          {!!error && (
            <p style={{ color: 'red', fontSize: 14 }}>{error}</p>
          )}
          <UserCard user={user} />
        </Col>
      </Row>
    </Container>
  )
}

export default User
