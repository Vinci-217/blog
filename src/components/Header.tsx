'use client'

import { Link } from 'next-view-transitions'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/client'
import { BlogAuthor, RepoUrl } from '~/data/site'
import { GithubIcon, MoonIcon, SunIcon } from './Icons'
import styles from './Header.module.css'

function Header() {
  const ref = useRef<HTMLHeadingElement>(null)
  const prevScrollTop = useRef(0)
  const [theme, setTheme] = useState<string>()

  useEffect(() => {
    setTheme(window.getLocalTheme()!)
  }, [])

  function addShadowClassName() {
    const header = ref.current
    if (!header) {
      return
    }
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    const prevTop = prevScrollTop.current
    if (scrollTop > prevTop) {
      header.classList.add(styles.hide)
    } else {
      header.classList.remove(styles.hide)
    }
    if (scrollTop > 120) {
      header.classList.add(styles.shadow)
    } else {
      header.classList.remove(styles.shadow)
    }
    prevScrollTop.current = scrollTop
  }

  useEffect(() => {
    addShadowClassName()
    window.addEventListener('scroll', addShadowClassName)
    return () => {
      window.removeEventListener('scroll', addShadowClassName)
    }
  }, [])

  return (
    <header ref={ref} className={styles.wrap}>
      <div className={styles.header}>
        <div className={cn(styles.left, styles.hover)}>
          <Link aria-label="Home page" href="/list/blog/1" className="fcc">
            {BlogAuthor}
          </Link>
        </div>
        <div className={styles.right}>
          {theme && (
            <div
              className={styles.hover}
              onClick={() => {
                const nextTheme =
                  theme === window.Dark ? window.Light : window.Dark
                setTheme(nextTheme)
                window.setTheme(nextTheme)
              }}
            >
              {theme === window.Dark ? <SunIcon /> : <MoonIcon />}
            </div>
          )}
          <Link
            aria-label="Read more about repo"
            className={styles.hover}
            target="_blank"
            href={RepoUrl}
          >
            <GithubIcon />
          </Link>
          <Link
            aria-label="Read more about links page"
            className={styles.hover}
            href="/links"
          >
            Links
          </Link>
          <Link
            aria-label="Read more about about page"
            className={styles.hover}
            href="/about"
          >
            About
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
