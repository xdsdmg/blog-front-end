import React from 'react'
import { Avatar, Input, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'

import { url } from '../conf'
import { axios_get } from '../utils/axios'
import { theme } from './themes/markdown'
import Test, { content_info } from './test/test'
import Logo from './components/logo';

import style from '../styles/Test.module.scss'
import 'katex/dist/katex.min.css'

import { MdAdd, MdClear, MdEdit, MdExpandMore, MdChevronRight, MdMenu, MdOutlineArticle } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

/* article component */
class ArticleContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: ''
        }
    }

    async componentDidMount() {
        let article
        try {
            // article = await axios_get(url.article)      // deployment version
            article = Test.article                      // test version
        } catch (err) {
            console.log(err)
        }

        this.setState({
            article: article
        })
    }

    render() {
        return (
            <ReactMarkdown
                className={style.markdown}
                components={ChakraUIRenderer(theme)}
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                children={this.state.article}
            />
        )
    }
}

/* content component */
class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    contentRender(content) {
        return (
            <div className={style.article}>
                <ul>
                    {content.map((category, i) => {
                        let element =
                            <li key={i}>
                                {category.name}
                                <ul>
                                    {category.children.map((article, j) => {
                                        return <li key={j}><a href='#'>{article.name}</a></li>
                                    })}
                                </ul>
                            </li>
                        return element
                    })}
                </ul>
            </div>
        )
    }

    render() {
        let content = this.props.content

        return (
            // this.contentRender(content)
            <ArticleContent />
        );
    }
}

/* index component */
class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let content = this.props.content

        return (
            <div className={style.articleList}>
                <ul>
                    {content.map((category, i) => {
                        let element =
                            <li tabIndex="0" key={i}>
                                <div>{category.name}</div>
                                <ul>
                                    {category.children.map((article, j) => {
                                        return <li key={j}><a href='#'>{article.name}</a></li>
                                    })}
                                </ul>
                            </li>
                        return element
                    })}
                </ul>
            </div>
        );
    }
}

class ExpandIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            flag: true
        }
    }

    logo_click(id) {
        console.log('Hello world!')
        let e = document.getElementById(id + '-0')
        if (e == null) return
        let flag = this.state.flag ? 'none' : 'flex'

        this.setState({
            flag: !this.state.flag
        })

        for (let i = 0; ; i++) {
            let e = document.getElementById(id + '-' + i.toString())
            if (e == null) return
            e.style.display = flag
        }
    }

    render() {
        let e = this.state.flag ? <MdExpandMore onClick={() => this.logo_click(this.state.id)} /> : <MdChevronRight onClick={() => this.logo_click(this.state.id)} />
        return e
    }
}

class ArticleTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content_info: ''
        }
    }

    async componentDidMount() {
        let content_info
        try {
            // article = await axios_get(url.article)      // deployment version
            content_info = Test.content_info                // test version
        } catch (err) {
            console.log(err)
        }

        console.log(content_info)

        this.setState({
            content_info: content_info
        })
    }

    logo_click(id) {
        let e = document.getElementById(id + '-0')
        if (e == null) return
        let flag = e.style.display == 'none' ? 'flex' : 'none'

        for (let i = 0; ; i++) {
            let e = document.getElementById(id + '-' + i.toString())
            if (e == null) return
            e.style.display = flag
        }
    }

    parse(children, depth = 0, id = '') {
        if (children.length == 0) {
            return
        }

        return (
            <div>
                {children.map((e, i) => {
                    let id_ = id != '' ? id + '-' + i.toString() : i.toString()
                    return (
                        <div id={id_} className={style.item}>
                            <div className={style.left}>
                                <div className={style.logo}>
                                    {e.children.length != 0 ? <ExpandIcon id={id_} /> : <VscDebugBreakpointLog />}
                                </div>
                                <div className={style.line} />
                            </div>
                            <div className={style.right}>
                                <div className={style.itemBody}>
                                    <div className={style.itemName}>
                                        {e.name}
                                    </div>
                                </div>
                                {this.parse(e.children, depth + 1, id_)}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className={style.articleTable}>{this.parse(content_info)}</div>
        )
    }
}

export default class extends React.Component {
    static async getInitialProps({ req }) {
        // let content_info = await axios_get(url.content)
        let content_info = Test.content_info
        console.log(content_info)
        return { content_info }
    }

    render() {
        return (
            <div className={style.all}>
                <div className={style.nav}>

                </div>
                <div className={style.body}>


                    {/* index part in the left */}
                    <div className={style.index}>
                        {/* avatar and search */}
                        <div className={style.indexHeader}>
                            {/* avatar */}
                            {/* <div className={style.indexTitle}>
                                <Avatar name='ZhangChi' src='/images/avator.jpeg'></Avatar>
                                <span className={style.titleText}>ZhangChi's Blog</span>
                            </div> */}
                            <Logo style={{ color: 'white' }} />
                            {/* search */}
                            <div className={style.indexSearch}>
                                <Input className={style.searchInput} color='white' placeholder='search' size='sm' />
                                <IconButton aria-label='Search database' icon={<SearchIcon />} size="sm" />
                            </div>
                        </div>

                        {/* content part */}
                        <div className={style.contentIndex}>Content Index</div>
                        {/* <Index content={this.props.content_info} /> */}
                        <ArticleTable />
                    </div>

                    {/* article part in the right */}
                    <div className={style.articleBody}>
                        {/* personal information */}
                        <div className={style.articleHeader}>
                            <div className={style.intro}><a href='#'>About Me</a></div>
                        </div>
                        {/* article */}
                        <Content content={this.props.content_info} />
                    </div>
                </div>
            </div>

        )
    }
}