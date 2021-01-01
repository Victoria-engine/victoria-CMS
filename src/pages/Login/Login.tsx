import React, { useState, useEffect } from 'react'
import { TextInputField, Button, Icon, WarningSignIcon } from 'evergreen-ui'
import produce from 'immer'
import { loginUser, loginUserWithGoogle, registerUser } from '../../reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Store, LoginSignInSwitcherProps } from '../../types'
import { useHistory } from 'react-router-dom'
import classes from './styles.module.scss'
import LogoTextSvg from '../../assets/victoria-text.svg'
import LogoWhite from '../../assets/logo-white.svg'
import { stringifiedParams } from '../../utils/google'
import * as queryString from 'query-string'
import googleIconSvg from '../../assets/google-icon.svg'


const Login: React.FC = () => {
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
    name: {
      value: '',
      isValid: true,
      error: null,
    },
  })
  const [isLoginActive, setLoginActive] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  const auth = useSelector(({ auth }: Store) => auth)
  const { blog, gotBlog } = useSelector(({ blog }: Store) => blog)

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`


  React.useEffect(() => {
    const urlParams = queryString.parse(window.location.search)
    if (urlParams.error) {
      console.error(`An error occurred: ${urlParams.error}`)
      return
    }

    const singleUserExchangeCode = urlParams.code?.toString()
    if (!singleUserExchangeCode) return

    dispatch(loginUserWithGoogle(singleUserExchangeCode))
  }, [dispatch])


  useEffect(() => {
    if (!auth.success || !gotBlog) return

    const isLoggedUserWithBlog = blog.id
    const isLoggedUserFirstTime = !blog.id

    if (isLoggedUserFirstTime) {
      return history.push('/welcome/1')
    }
    if (isLoggedUserWithBlog) {
      return history.push('/')
    }

  }, [auth.success, blog.id, history, gotBlog])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const fieldName = name as 'email' | 'password' | 'name'

    let isValid = true
    let errorMsg: string | null = null

    switch (fieldName) {
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
      case 'name': {
        if (!value) {
          isValid = false
          errorMsg = 'Name is required!'
        }
        break
      }
    }

    setFormData(produce(formData, (draft) => {
      draft[fieldName].value = value
      draft[fieldName].error = errorMsg as any
      draft[fieldName].isValid = isValid
    }))
  }

  const onLoginClick = () => {
    dispatch(loginUser({
      email: formData.email.value,
      password: formData.password.value,
    }))
  }

  const onRegisterClick = () => {
    dispatch(
      registerUser({
        email: formData.email.value,
        password: formData.password.value,
        name: formData.name.value,
      }))
  }

  const renderLoginForm = () => (
    <>
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
          <Button
            className={classes.continueButton}
            intent='success'
            appearance='primary'
            onClick={onLoginClick}
          >
            <span>Continue</span>
          </Button>
        </div>
      </div>

      <div className={classes.horizontalDivider}>
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div>
        <a
          className={classes.googleLoginButton}
          href={googleLoginUrl}
        >
          <img src={googleIconSvg} />
          <span>Continue with Google</span>
        </a>
      </div>

      <div>
        <span className={classes.forgotPwText}>Don't remember your password ?</span>
      </div>
    </>
  )

  const renderRegisterForm = () => (
    <div>
      <div>
        <div style={{ marginBottom: '40px' }}>
          <Icon icon={WarningSignIcon} color='red' marginRight={10} />
          <span>Currently internal sign-in is not supported, please continue with a <b>google account</b>.</span>
        </div>

        <TextInputField
          type='text'
          name='name'
          value={formData.name.value}
          isInvalid={!formData.name.isValid}
          required
          label="Name"
          validationMessage={formData.name.error}
          onChange={onChange}
        />
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
      </div>

      <Button
        className={classes.continueButton}
        intent='success'
        appearance='primary'
        onClick={onRegisterClick}
        disabled={true}
      >
        Register
        </Button>
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
            <p className={classes.mainText}>Victoria is an open source headless CMS and blog engine API</p>
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
      <span>/</span>
      <h2 className={!isLoginActive ? classes.activeElem : classes.noneActive} onClick={onChange}>Sign In</h2>
    </span>
  )
}

export default Login