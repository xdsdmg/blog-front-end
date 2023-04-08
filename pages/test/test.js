const article = `
# Header 1
## Header 2

*React-Markdown* is **Awesome**

\`$> ls -al\`

$C_L$

_italic_

**bold**

<h1>Hello world!</h1>
    `

const content_info = [
    {
        name: "zk-SNARK",
        children: [
            {
                name: "算术电路",
                children: [
                    {
                        name: "Hello",
                        children: [{
                            name: "算术电路",
                            children: [
                                {
                                    name: "Hello",
                                    children: []
                                }
                            ]
                        }]
                    }
                ]
            },
            {
                name: "R1CS",
                children: []
            }
        ]
    },
    {
        name: "Compiler",
        children: [
            {
                name: "词法分析",
                children: []
            },
            {
                name: "语法分析",
                children: []
            }
        ]
    },
]

module.exports = {
    article,
    content_info
}