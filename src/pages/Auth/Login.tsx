import React, { useState, useEffect } from 'react'
import { TextInputField, Button } from 'evergreen-ui'
import produce from 'immer'
import { loginUser, registerUser } from '../../reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Store, LoginSignInSwitcherProps } from '../../types'
import { useHistory } from 'react-router-dom'
import classes from './styles.module.scss'
import LogoTextSvg from '../../assets/victoria-text.svg'
import LogoWhite from '../../assets/logo-white.svg'

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
  const [isLoginActive, setLoginActive] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  // Selectors
  const auth = useSelector(({ auth }: Store) => auth)
  const userData = useSelector(({ blog }: Store) => blog)

  // Effects
  useEffect(() => {
    const hasUserKey = userData.blog.key
    const isLoggedUserWithBlog = auth.success && auth.blogKey
    const isLoggedUserFirstTime = auth.success && !auth.blogKey

    if (isLoggedUserFirstTime && !hasUserKey) history.push('/welcome')
    if (isLoggedUserWithBlog && hasUserKey) history.push('/')

  }, [auth.blogKey, auth.success, dispatch, history, userData.blog.key])

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

  const onRegisterClick = () => {
    dispatch(registerUser({
      credentials: {
        email: formData.email.value,
        password: formData.password.value,
      }
    }))
  }

  const renderLoginForm = () => (
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
      <div className={classes.bottomActions}>
        <span className={classes.forgotPwText}>Don't remember your password ?</span>
        <Button onClick={onLoginClick} intent='success' appearance='primary'>Login</Button>
      </div>
    </div>
  )

  const renderRegisterForm = () => (
    <div>
      <div>
        <TextInputField
          type='text'
          name='lastName'
          value={''}
          isInvalid={false}
          required
          label="First Name"
          //validationMessage={formData.email.error}
          //onChange={onChange}
        />
        <TextInputField
          type='text'
          name='lastName'
          value={''}
          isInvalid={false}
          required
          label="Last Name"
          //validationMessage={formData.email.error}
          //onChange={onChange}
        />
      </div>
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

      <Button onClick={onRegisterClick} intent='success' appearance='primary'>Register</Button>
    </div>
  )


  return (
    <div className={classes.loginContainer}>
      <div className={classes.forms}>
        <div className={classes.form}>

          <img src={LogoTextSvg} alt='Victoria logo' />

          <LoginSignInSwitcher isLoginActive={isLoginActive} onChange={() => setLoginActive(!isLoginActive)} />

          {isLoginActive ? renderLoginForm() : renderRegisterForm()}

        </div>
      </div>

      <div className={classes.info}>
        <div className={classes.infoContent}>
          <img src={LogoWhite} alt='Victoria logo white' />

          <div className={classes.textContainer}>
            <p className={classes.mainText}>Victoria is a public and open source blog engine, headless CMS and static blog generator.</p>
            <p className={classes.secondaryText}>Create and Publish all of you content in one place.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoginSignInSwitcher: React.FC<LoginSignInSwitcherProps> = ({ isLoginActive, onChange }) => {

  return (
    <span className={classes.loginSignInSwitcher}>
      <h2 className={isLoginActive ? classes.activeElem : classes.noneActive} onClick={onChange}>Log In</h2>
      /
      <h2 className={!isLoginActive ? classes.activeElem : classes.noneActive} onClick={onChange}>Sign In</h2>
    </span>
  )
}

export default Login