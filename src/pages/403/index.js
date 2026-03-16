import React from 'react'

const ErrorPage = () => {
  return (
    <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '40px',
        color: '#666'
    }}>
        <h1>非权限用户禁止访问</h1>
    </div>
  )
}

export default ErrorPage