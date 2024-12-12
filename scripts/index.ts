import fsp from 'node:fs/promises'
import path from 'node:path'
import { getPostList } from '@/utils/node/markdown'
import feed from './feed'
import { gitadd } from './utils.js'

export type FileMap = Record<string, string>

async function generate() {
  const posts = await getPostList()
  const fileMap: FileMap = {}
  await Promise.all(
    posts.map(async (item) => {
      const mdPath = `${item.path}.md`
      const file = await fsp.readFile(path.join('data', mdPath), 'utf-8')
      fileMap[mdPath] = file
    }),
  )
  gitadd(await feed(posts))
}

generate()
