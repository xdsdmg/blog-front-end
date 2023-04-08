import React from 'react'
import { Button, Input, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { MdAdd, MdClear, MdEdit, MdExpandMore, MdChevronRight, MdMenu, MdOutlineArticle } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import Logo from './components/logo'
import Test, { content_info } from './test/test'

import style from '../styles/Manage.module.scss'

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
                                    <div className={style.itemTimestamp}>1996-08-30 16:24:12</div>
                                    <div className={style.itemBtn}>
                                        <div>
                                            <span><MdMenu /></span>
                                            <section>
                                                <IconButton className={style.midBtn} icon={<MdEdit />} size="xs" fontSize='15px' colorScheme='blue' variant='outline' />
                                                <IconButton icon={<MdClear />} size="xs" fontSize='15px' colorScheme='red' variant='outline' />
                                            </section>
                                        </div>
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
    render() {
        return (
            <div className={style.all}>
                <div className={style.header}>
                    {/* avatar */}
                    <div className={style.logo}>
                        <Logo style={{ color: 'white' }} />
                    </div>
                    <div className={style.search}>
                        <Input className={style.searchInput} color='white' placeholder='search' size='sm' />
                        <IconButton aria-label='Search database' icon={<SearchIcon />} size="sm" />
                    </div>
                    <div className={style.add_btn}>
                        <IconButton className={style.btn} size="sm" icon={<MdAdd />} fontSize='20px'>Add Article</IconButton>
                    </div>
                </div>
                <div className={style.main}>
                    <ArticleTable />
                </div>
            </div>
        )
    }
}