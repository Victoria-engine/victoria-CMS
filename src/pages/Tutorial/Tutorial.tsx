import React, { useState, useEffect, useCallback } from 'react'
import Stepper from '../../components/Stepper'
import classes from './styles.module.scss'
import { TextInputField, Button, Code, Icon, Link, InfoSignIcon, ButtonProps } from 'evergreen-ui'
import randomNameGen from '../../utils/randomNameGenerator'
import { BlogCreationSectionProps, Store } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, getConsumerKey, getUserData } from '../../reducers/blog'
import LogoTextSvg from '../../assets/victoria-text.svg'
import { Redirect, useHistory, useParams } from 'react-router-dom'


const Tutorial: React.FC = () => {
  const { step } = useParams<{ step: string }>()
  const [blogData, setBlogData] = useState({
    title: randomNameGen(),
    description: '',
  })


  const dispatch = useDispatch()
  const history = useHistory()

  const { blogCreated, user, blog } = useSelector(({ blog }: Store) => blog)
  const wasBlogCreated = blogCreated
  const consumerKey = blog.key.value

  const onChangeStep = useCallback((nextStep: number) => {
    history.push(`/welcome/${nextStep}`)
  }, [history])

  const onBlogDataChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    setBlogData({
      ...blogData,
      [name]: value,
    })
  }

  const createBlogAndGoNext = () => {
    const { description, title } = blogData

    if (!description || !title) return

    dispatch(createBlog({ description, title }))
  }

  const handleGetUserData = () => {
    dispatch(getUserData())
  }

  useEffect(() => {
    if (!user.email) {
      handleGetUserData()
    }
  }, [handleGetUserData])


  useEffect(() => {
    if (wasBlogCreated) {
      onChangeStep(2)
    }
  }, [onChangeStep, wasBlogCreated])


  if (!step) {
    return <Redirect to='/welcome/1' />
  }

  return (
    <div className={classes.container}>
      <img src={LogoTextSvg} alt='Victoria logo' className={classes.logo} />

      <Stepper
        activeStep={Number(step)}
        onSelect={onChangeStep}
        steps={[{ title: 'Create your very first blog' }, { title: 'Setup the template' }, { title: 'Deploy blog' }]}
        isNextBlocked={wasBlogCreated}
      />

      <div className={classes.sectionWrapper}>
        {step === "1" && (
          <BlogCreationSection
            onBlogDataChange={onBlogDataChange}
            blogData={blogData}
            onEnd={createBlogAndGoNext}
            user={user}
          />)}
        {step === "2" && (
          <SetupSection consumerKey={consumerKey} onEnd={() => onChangeStep(3)} />
        )}
        {step === "3" && (
          <DeploySection onEnd={() => history.push('/drafts')} />
        )}
      </div>
    </div>
  )
}

export const BlogCreationSection: React.FC<BlogCreationSectionProps> = ({
  blogData,
  onBlogDataChange,
  onEnd,
  user,
}) => {
  const isValidSubmit = blogData.description && blogData.title

  return (
    <>
      <h1>Let's create your very first blog</h1>
      <hr />

      <div className={classes.textWrapper}>
        <p className={classes.bolder}>Welcome <b>{user.name}</b>, your account has been successfully created, now we need to create and link a blog to your account !</p>

        <p>How would like to name your blog ?</p>

        <TextInputField
          className={classes.borderlessInput}
          type='text'
          name='title'
          label=""
          value={blogData.title}
          onChange={onBlogDataChange}
          placeholder='Some remarkable name...'
        />

        <p>How would you describe your blog to others ?</p>

        <TextInputField
          className={classes.borderlessInput}
          type='text'
          name='description'
          label=""
          value={blogData.description}
          onChange={onBlogDataChange}
          placeholder='Some remarkable description...'
        />

        <Button
          className={classes.nextButton}
          disabled={!isValidSubmit}
          onClick={onEnd}
        >
          Create blog and continue
        </Button>
      </div>
    </>
  )
}

export const SetupSection: React.FC<{
  consumerKey: string,
  onEnd: ButtonProps['onClick'],
}> =
  ({
    consumerKey,
    onEnd
  }) => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getConsumerKey())
    }, [dispatch])

    return (
      <>
        <h1>Let's setup your template</h1>
        <hr />

        <div className={classes.textWrapper}>
          <p className={classes.bolder}>In order for you to customize and setup your blog we need to run it locally.</p>

          <p>Get the repository with the starter template code.</p>
          <p>1. <a href='https://github.com/Victoria-engine/blog-template' target='_blank' rel="noopener noreferrer">Use the template</a></p>
          <p>2. Clone the repository locally and move inside the directory.</p>
          <p>3.<Code>npm install</Code> to install the dependencies while inside the cloned directory.</p>
          <p>4. Create a file called <Code>.env</Code> inside the root of directory</p>
          <p>And store you consumer API key there, such as:</p>
          <p><Code>REACT_APP_VICTORIA_CONSUMER_KEY={consumerKey}</Code></p>
          <p>5.Finally run <Code>npm run local</Code> to run your project locally.</p>

          <p><b>Happy blogging, you can move on!</b></p>
          <Button className={classes.nextButton} onClick={onEnd}> Next step</Button>
        </div>
      </>
    )
  }

export const DeploySection: React.FC<{ onEnd: ButtonProps['onClick'] }> = ({ onEnd }) => {
  return (
    <>
      <h1>Let's deploy your first blog</h1>
      <hr />

      <div className={classes.textWrapper}>
        <p className={classes.border}>For other people to see your blog one must deploy it to the web.</p>
        <p className={classes.border}>
          <Icon icon={InfoSignIcon} color="info" marginRight={5} paddingTop={3} />
          If you don't want to do this now and just want to experience Victoria, you can always skip this section and
          read it later.
        </p>

        <Link href='https://github.com/netlify/netlifyctl#installation' target='_blank'>Install the Netlify CLI</Link>
        <br />
        <br />
        1. <Code>netlifyctl login</Code>
        <br />
        <br />
        2. <Code>npm run build</Code> or <Code>yarn build</Code> to create a production version of your blog.
      <br />
        <br />
        3. <Code>netlifyctl deploy -b public</Code>
        <br />
        <br />

        <Button
          className={classes.nextButton}
          onClick={onEnd}
        >
          Finish
        </Button>
      </div>
    </>
  )
}

export default Tutorial