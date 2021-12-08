import React from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'

const Pagination = ({ total, active, onChange }: IPagination) => {
  const items = []

  for (let number = 1; number <= total; number++) {
    items.push(
      <BootstrapPagination.Item key={number} active={number === active} onClick={() => onChange(number)}>
        {number}
      </BootstrapPagination.Item>
    )
  }

  return (
    <BootstrapPagination className="justify-content-center">{items}</BootstrapPagination>
  )
}

interface IPagination {
  total: number
  active: number,
  onChange: (val: number) => void
}

export default Pagination
