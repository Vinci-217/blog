import { Metadata } from 'next'
import React from 'react'
import { getCategory, removeMdSuffix, upperFirstChar } from '@/utils'
import NotFound from '@/components/NotFound'
import { getPostPaths, getPostList, PostList } from '@/utils/node/markdown'
import { FrontmatterKey } from '@/constants'
import { generateSeoMetaData, joinWebUrl } from '@/app/seo'
import styles from './page.module.css'
import Toc from '../../components/Toc'
import Meta from '../../components/Meta'
import '../../styles/md.css'
import '../../styles/shiki.css'
import transfromCode2Jsx from '../../utils/transfrom'

export async function generateStaticParams() {
  const mds = await getPostPaths()
  return mds.map((id) => {
    const tokens = id.split('/')
    return {
      id: removeMdSuffix(tokens[2]),
      type: tokens[1],
    }
  })
}

async function getPostContent(type: string, id: string) {
  try {
    const posts = await getPostList(type)
    const post = posts.find((post) => post.path === `posts/${type}/${id}`)
    return post
  } catch (error) {}
}

interface PostProps {
  params: {
    id: string
    type: FrontmatterKey
  }
}

const Desc_Max_Length = 40

async function Post({ params }: PostProps) {
  const info = await getPostContent(params.type, params.id)
  if (!info) {
    return <NotFound />
  }
  const node = await transfromCode2Jsx(info.content)
  return (
    <div className={styles.wrap}>
      <div
        className="center"
        style={{
          margin: 0,
        }}
      >
        <Meta {...info} />
        <div className="md">{node}</div>
      </div>
      <Toc />
    </div>
  )
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const info = await getPostContent(params.type, params.id)
  const category = upperFirstChar(getCategory(params.id))
  if (!info) {
    return {
      title: `${category} - ${params.id}`,
    }
  }
  const title = `${info.meta.title} | ${category}`
  return {
    title,
    description: info.meta.desc.slice(0, Desc_Max_Length),
    ...generateSeoMetaData({
      title,
      description: info.meta.desc.slice(0, 30),
      url: joinWebUrl(params.type, params.id),
    }),
  }
}

export default Post
