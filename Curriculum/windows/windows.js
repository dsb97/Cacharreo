var fileSystem = [
    {
        icon: '/resources/themes/default/system/folder.png',
        name: 'user',
        content: [
            {
                icon: '/resources/themes/default/system/code.png',
                name: 'Lenguajes',
                content: [
                    {
                        icon: '/resources/themes/default/misc/csharp.png',
                        name: 'C#',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/sql.png',
                        name: 'SQL',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/html.png',
                        name: 'HTML5',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/css.png',
                        name: 'CSS',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/js.png',
                        name: 'JavaScript/TypeScript',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/php.png',
                        name: 'PHP',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/java.png',
                        name: 'Java',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/vb.png',
                        name: 'Visual Basic',
                        content: []
                    }
                ]
            },
            {
                icon: '/resources/themes/default/system/framework.png',
                name: 'Frameworks',
                content: [
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: '.NET (Classic/Core)',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/laravel.png',
                        name: 'Laravel',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/angular.png',
                        name: 'Angular',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/bootstrap.png',
                        name: 'Bootstrap',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/electron.png',
                        name: 'Electron',
                        content: []
                    },
                    {
                        icon: '/resources/themes/default/misc/vue.png',
                        name: 'Vue',
                        content: []
                    }

                ]
            },
            {
                icon: '/resources/themes/default/system/ide.png',
                name: 'Entornos de desarrollo',
                content: [
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                    ,
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                    ,
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                    ,
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                    ,
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                    ,
                    {
                        icon: '/resources/themes/default/misc/net.png',
                        name: 'JQuery',
                        content: []
                    },
                ]
            }
        ]
    },
    {
        type: type.folder,
        name: 'resources',
        content: []
    },
    {
        type: type.folder,
        name: 'library',
        content: []
    }
]

function openLink(url, id) {
    let fullURL = `${url}?id=${id}`;
    addCachedWindowHistoryURL(id, fullURL);
    window.parent.document.getElementById(id).getElementsByTagName('iframe')[0].src = fullURL;
}

