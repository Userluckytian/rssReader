module.exports = [
    {
        type: 'confirm',
        name: 'private',
        message: 'this resgistery is private?'
    },
    {
        type: 'input',
        name: 'author',
        message: 'author?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'description?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'license?',
        choices: [
            'MIT',
            'Apache',
            'Apache 2.0'
        ]
    }
]