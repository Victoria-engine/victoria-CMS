import React, { useState, useEffect } from 'react'
import Stepper from '../../components/Stepper'
import classes from './styles.module.scss'
import { TextInputField, Button } from 'evergreen-ui'
import randomNameGen from '../../utils/randomNameGenerator'
import { BlogCreationSectionProps, Store } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../../reducers/blog'
import LogoTextSvg from '../../assets/victoria-text.svg'

type Steps = 1 | 2 | 3

const Tutorial: React.FC = () => {
  const [activeStep, setActiveStep] = useState<Steps>(1)
  const [blogData, setBlogData] = useState({
    name: randomNameGen(),
    description: '',
  })

  const dispatch = useDispatch()

  // Selectors
  const wasBlogCreated = useSelector(({ blog }: Store) => blog.wasBlogCreated)
  const userData = useSelector(({ blog }: Store) => blog.user)

  const onChangeStep = (value: Steps) => {
    setActiveStep(value)
  }

  const onBlogDataChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    setBlogData({
      ...blogData,
      [name]: value,
    })
  }

  const createBlogAndGoNext = () => {
    if (blogData.description && blogData.name) {
      dispatch(createBlog({
        description: blogData.description,
        name: blogData.name,
      }))
    }
  }

  useEffect(() => {
    if (wasBlogCreated) {
      onChangeStep(2)
    }
  }, [wasBlogCreated])

  return (
    <div className={classes.container}>
      <img src={LogoTextSvg} alt='Victoria logo' className={classes.logo} />

      <Stepper
        activeStep={activeStep}
        onSelect={onChangeStep}
        steps={[{ title: 'Create your very first blog' }, { title: 'Setup the template' }, { title: 'Deploy blog' }]}
        isNextBlocked={wasBlogCreated}
      />

      <div className={classes.sectionWrapper}>
        {{
          1: <BlogCreationSection onBlogDataChange={onBlogDataChange} blogData={blogData} onEnd={createBlogAndGoNext} userData={userData} />,
          2: <SetupSection />,
          3: <DeploySection />,
        }[activeStep]}
      </div>
    </div>
  )
}

export const BlogCreationSection: React.FC<BlogCreationSectionProps> = ({ onBlogDataChange, blogData, onEnd, userData }) => {
  const isValidSubmit = blogData.description && blogData.name

  return (
    <>
      <h1>Let's create your very first blog</h1>
      <hr />

      <div className={classes.textWrapper}>
        <p className={classes.bolder}>Welcome <b>{userData.firstName} {userData.lastName}</b>, your account has been successfully created, now we need to create and link a blog to your account !</p>

        <p>How would like to name your blog ?</p>

        <TextInputField
          className={classes.borderlessInput}
          type='text'
          name='name'
          label=""
          value={blogData.name}
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

export const SetupSection: React.FC = () => {
  return (
    <>
      <h1>Let's setup your template</h1>
      <hr />
    </>
  )
}

export const DeploySection: React.FC = () => {
  return (
    <>
      <h1>Let's deploy your first blog</h1>
      <hr />
    </>
  )
}

export default Tutorial