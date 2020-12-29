import React, { useState, useEffect, useCallback } from 'react'
import Stepper from '../../components/Stepper'
import classes from './styles.module.scss'
import { TextInputField, Button, Code, Icon, Link, InfoSignIcon, ButtonProps } from 'evergreen-ui'
import randomNameGen from '../../utils/randomNameGenerator'
import { BlogCreationSectionProps, Store } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, getConsumerKey } from '../../reducers/blog'
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
  const userData = user
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
            userData={userData}
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
  onBlogDataChange,
  blogData,
  onEnd,
  userData,
}) => {
  const isValidSubmit = blogData.description && blogData.title

  return (
    <>
      <h1>Let's create your very first blog</h1>
      <hr />

      <div className={classes.textWrapper}>
        <p className={classes.bolder}>Welcome <b>{userData.name}</b>, your account has been successfully created, now we need to create and link a blog to your account !</p>

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
          <p className={classes.bolder}>
            <Icon icon={InfoSignIcon} color="info" marginRight={5} paddingTop={3} />
        You can easily install and mantain your blog with the <b>Victoria CLI</b> (recommend way):
        </p>

          <p>Open up your terminal and follow the following commands:</p>
          <br />

          <p>To install the CLI, run:</p>
        1.<Code>homebrew victoria-cli</Code>
          <br />
          <p>Go to your prefered folder to store your blog code and run:</p>
        2.<Code>victoria-cli new 'Meditation about code'</Code>

          <p>If everything went smothly you should have eveything setup. Now follow the last steps printed in the console in order to run and devolop the project locally.</p>
          <br />

          <p>Here's the <b>api key</b> you need to connect your blog to our API.</p>
          <Code style={{ color: '#e9404c' }}>{consumerKey}</Code>

          <p className={classes.bolder}>
            <Icon icon={InfoSignIcon} color="warning" marginRight={5} paddingTop={3} />
          This key <b>should not be public to anyone</b> but you or your development team !
          Sharing to others might harm you blog!
        </p>

          <p className={classes.bolder}>If you have the blog running locally without errors you should be done by now, let's get writting !</p>


          <Button
            className={classes.nextButton}
            onClick={onEnd}
          >
            Next step
        </Button>


          <hr style={{ marginTop: '40px' }} />

          <p className={classes.bolder}>If you don't want to install the CLI, here's the steps in order to install it.</p>

          <p>Get the repository with the starter template code.</p>
        1.<Code>git clone https://github.com/Victoria-engine/blog-template.git</Code>

          <p>Move inside the cloned directory and install the dependencies</p>
        2.<Code>cd blog-template</Code>
          <br />
          <br />
        3.<Code>yarn</Code> or <Code>npm install</Code> to install the dependencies

        <p>Create a file called <Code>.env</Code> inside the root of directory</p>
          <p>And store you api key there like this:</p>
        4.<Code>REACT_APP_VICTORIA_KEY={consumerKey}</Code>
          <p>Finally run</p>
        5.<Code>yarn start</Code> or <Code>npm run start</Code> to run your project locally.

        <p><b>Happy blogging, you can move on!</b></p>


          <Button
            className={classes.nextButton}
            onClick={onEnd}
          >
            Next step
        </Button>
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