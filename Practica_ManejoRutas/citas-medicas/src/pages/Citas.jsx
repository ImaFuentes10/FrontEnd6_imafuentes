import React from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/Navigate'

const Citas = () => {
  return (
    <ProtectedRoute>
      <div>Citas</div>
    </ProtectedRoute>
  )
}

export default Citas