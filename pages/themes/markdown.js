import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Text } from '@chakra-ui/react'

const theme = {
    p: props => {
        const { children } = props;
        return (
            <Text mb={1} fontSize={'15px'}>
                {children}
            </Text>
        );
    },
    h1: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'2em'} fontWeight={'bold'}>
                {children}
            </Text>
        );
    },
    h2: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'1.5em'} fontWeight={'bold'}>
                {children}
            </Text>
        );
    },
    h3: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'1.17em'} fontWeight={'bold'}>
                {children}
            </Text>
        );
    },
    h4: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'1em'} fontWeight={'bold'}>
                {children}
            </Text>
        );
    },
    h5: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'.83em'} fontWeight={'bold'}>
                {children}
            </Text>
        );
    },
    h6: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'.67em'} fontWeight={'bold'}>
                {children}
            </Text>
        );
    },
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
            />
        ) : (
            <code {...props}
                style={
                    {
                        color: '#0969DA'
                    }
                }
            >
                {children}
            </code>
        )
    }
}

module.exports = { theme }