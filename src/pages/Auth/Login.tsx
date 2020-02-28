import React, { useState, useEffect } from 'react'
import { TextInputField, Button } from 'evergreen-ui'
import produce from 'immer'
import { loginUser } from '../../reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../types'
import { useHistory } from 'react-router-dom'

const Login: React.FC = () => {
  // Local State
  const [formData, setFormData] = useState({
    email: {
      value: '',
      isValid: true,
      error: null,
    },
    password: {
      value: '',
      isValid: true,
      error: null,
    },
  })

  const dispatch = useDispatch()
  const history = useHistory()

  // Selectors
  const auth = useSelector(({ auth }: Store) => auth)

  // Effects
  useEffect(() => {
    const isLoggedUserWithBlog = auth.success && auth.blogKey
    const isLoggedUserFirstTime = auth.success && !auth.blogKey

    if (isLoggedUserWithBlog) history.push('/')
    if (isLoggedUserFirstTime) history.push('/welcome')

  }, [auth.blogKey, auth.success, history])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const _name = name as 'email' | 'password'

    let isValid = true
    let errorMsg: string | null = null

    switch (_name) {
      case 'email': {
        if (!value) {
          isValid = false
          errorMsg = 'Email is required!'
        }
        break
      }
      case 'password': {
        if (!value) {
          isValid = false
          errorMsg = 'Password is required!'
        }
        break
      }
    }

    setFormData(produce(formData, (draft) => {
      draft[_name].value = value
      draft[_name].error = errorMsg as any
      draft[_name].isValid = isValid
    }))
  }

  const onLoginClick = () => {
    dispatch(loginUser({
      credentials: { 
        email: formData.email.value,
        password: formData.password.value,
       }
    }))
  }

  return (
    <div>
      <div>

      </div>
      <div>
        <h2>Login</h2>
        <div>
          <TextInputField
            type='email'
            name='email'
            value={formData.email.value}
            isInvalid={!formData.email.isValid}
            required
            label="Email address"
            validationMessage={formData.email.error}
            onChange={onChange}
          />
          <TextInputField
            type='password'
            name='password'
            value={formData.password.value}
            isInvalid={!formData.password.isValid}
            required
            label="Password"
            validationMessage={formData.password.error}
            onChange={onChange}
          />
          <Button onClick={onLoginClick}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default Login