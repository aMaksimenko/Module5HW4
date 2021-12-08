import React, { useEffect, useState } from 'react'
import * as userApi from 'api/modules/users'
import { IUser } from 'interfaces/users'
import UserCard from 'components/UserCard'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Pagination from 'components/Pagination'

const Users = () => {
  const [users, setUsers] = useState<IUser[] | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true)
        const res = await userApi.getByPage(currentPage)
        setUsers(res.data)
        setTotalPages(res.total_pages)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
      }
      setIsLoading(false)
    }
    getUser()
  }, [currentPage])

  return (
    <Container>
      <Row className="justify-content-center">
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {users?.map((user, key) => (
              <Col key={key} sm={6} md={4} lg={3} xl={2} className="mb-2 mt-2">
                <UserCard user={user} />
              </Col>
            ))}
          </>
        )}

      </Row>
      <Pagination total={totalPages} active={currentPage} onChange={setCurrentPage}/>
    </Container>
  )
}

export default Users
