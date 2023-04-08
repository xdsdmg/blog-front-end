import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';

export default function Home() {
    const source = `
# Hello, world!
---
~this doesn't work.~
    `
    return (
        <ReactMarkdown remarkPlugins={[gfm]} children={source} />
    )
}