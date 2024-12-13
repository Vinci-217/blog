export const BlogUrl = 'https://github.com/Vinci-217/blog/'

export const BlogAuthor = 'Vinci-217'

export const GithubName = BlogAuthor

export const RepoName = 'blog'

export const RepoUrl = `https://github.com/Vinci/${RepoName}`

export const RepoLinksUrl = `${RepoUrl}/blob/main/data/links.json`

export const BilibiliId = '227616086'

export const IS_GITPAGE = !!process.env.GITPAGE
export const BasePath = IS_GITPAGE ? `/${RepoName}` : ''
