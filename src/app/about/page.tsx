import Link from 'next/link'
import { Metadata } from 'next'
import { BiliBiliIcon, GithubIcon } from '@/components/Icons'
import Tag from '@/components/Tag'
import { cn } from '@/utils/client'
import { BilibiliId, BlogAuthor, GithubName } from '~/data/site'
import styles from './page.module.css'
import { generateSeoMetaData, joinWebUrl } from '../seo'

function About() {
  return (
    <div className={cn(styles.wrap, 'center')}>
      <h1 className={styles.hi}> Hi, I'm {BlogAuthor} 👋</h1>
      <div className={styles.tag}>
        <Tag icon="#">Developer</Tag>
        <Tag icon="#">Student</Tag>
      </div>
      <div className={styles.desc}>
        I'm a college student from China, currently studying Computer
        Science at Harbin Institution of Technology. Passion for open source and
        recording my learning experience. I really hope you can give me
        constructive suggestions on my blog. THX !
      </div>
      <ul>
        <li>I started learning Java in 2021.</li>
        <li>I landed my first job as a Java developer at Meituan in 2024.12.09</li>
        <li>I started building this blog in 2024.12.12</li>
      </ul>
      <div></div>
      <div className={styles.tag}>
        <Tag icon="#">Java</Tag>
        <Tag icon="#">Programming</Tag>
      </div>
      <div>
        If you are interested in this blog:{' '}
        <Link
          className="link"
          target="_blank"
          href="https://blog.plumbiu.top/posts/blog/How-I-Build-My-Blog"
        >
          How this blog works
        </Link>
      </div>
      <div className={styles.links}>
        <Link target="_blank" href={`https://github.com/${GithubName}`}>
          <GithubIcon />
        </Link>
        <Link target="_blank" href={`https://space.bilibili.com/${BilibiliId}`}>
          <BiliBiliIcon />
        </Link>
      </div>
      <div>Happy reading! 🍺</div>
    </div>
  )
}

const Title = `${BlogAuthor} | About`
const Desc = `${BlogAuthor}'s introduction`
export const metadata: Metadata = {
  title: Title,
  description: Desc,
  ...generateSeoMetaData({
    title: Title,
    description: Desc,
    url: joinWebUrl('about'),
  }),
}

export default About
