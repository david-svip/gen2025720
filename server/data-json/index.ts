import { promises as fs } from 'fs'
import { join } from 'path'

export const getArticleList = (async () => {
  const filePath = join(process.cwd(), 'json-data', 'article-list.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
})

