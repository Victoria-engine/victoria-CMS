import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/editorjs'
import { BlogPost } from '../../types'

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage
}

export const getRandomQuote = () => {
  const QUOTES = [
    `“Shoot for the moon, even if you fail, you'll land among the stars”\n - Cecelia Ahern, P.S. I Love You`,
    `“I can tell you I love you as many times as you can stand to hear it, but all it does is remind us that love is not enough. Not even close.”\n - Mark Andrus`,
    `“A lot of the conflict you have in your life exists simply because you're not living in alignment you're not be being true to yourself.”\n - Steve Maraboli, Unapologetically You: Reflections on Life and the Human Experience`,
    `We've arranged a civilization in which most crucial elements profoundly depend on science and technology. \n - Carl Sagan`,
    `For small creatures such as we the vastness is bearable only through love. \n - Carl Sagan`,
    `Extinction is the rule. Survival is the exception.\n - Carl Sagan`
  ]

  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

export const convertCleanDataToHTML = (data: any) => {
  var html = ''
  data.blocks.forEach((block: any) => {
    switch (block.type) {
      case 'header':
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
        break
      case 'paragraph':
        html += `<p>${block.data.text}</p>`
        break
      case 'delimiter':
        html += '<hr />'
        break
      case 'image':
        html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`
        break
      case 'list':
        html += '<ul>'
        block.data.items.forEach((li: string) => {
          html += `<li>${li}</li>`
        })
        html += '</ul>'
        break
      default:
        console.log('Unknown block type', block.type)
        console.log(block)
        break
    }
  })

  return html
}

export const INITIAL_EDITOR_DATA = {
  time: 1556098174501,
  blocks: [
    {
      type: "header",
      data: {
        text: getRandomQuote(),
        level: 2
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Pro tip: Press TAB for more commands when writing."
      }
    }
  ]
}

export const EMPTY_POST: BlogPost = {
  _id: '',
  html: INITIAL_EDITOR_DATA,
  visibility: 'private',
  title: '',
  tags: [],
  author: '',
  createdAt: '',
  excerpt: '',
  reading_time: 0,
  updatedAt: '',
  description: '',
}

export function isNameValidField (name: string): name is 'title' | 'excerpt' | 'editor' {
  return ['title', 'excerpt', 'editor'].includes(name)
}