const Koa = require('koa');
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const koaCors = require('koa-cors')

const app = new Koa();
const router = new Router();

const newsList = [
    {
        id: 5,
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583754325885&di=5323c8c818117858dbc900fa42c54cdd&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0704%2Fe53c868ee9e8e7b28c424b56afe2066d.jpg',
        name: '第五条新闻',
        time: '2020/01/02',
        is_collect: 0
    },
    {
        id: 4,
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583754388911&di=6e70bec810febc6f12e830607bd50a92&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg',
        name: '第四条新闻',
        time: '2020/01/02',
        is_collect: 0
    },
    {
        id: 3,
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583754676418&di=64b3b3ab3fcacbd41b0a664197e8e061&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9a673c53683e7ae9031398ab437c8d65b53ee431.jpg',
        name: '第三条新闻',
        time: '2020/01/02',
        is_collect: 0
    },
    {
        id: 2,
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583754710767&di=bf7e8ef0bd28a4e2818ae2ad5148893b&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F1006%2Fe94e4f70870be76a018dff428306c5a3.jpg',
        name: '第二条新闻',
        time: '2020/01/02',
        is_collect: 0
    },
    {
        id: 1,
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583754740928&di=aac215dd10d05b9f751b25cfa655cfa7&imgtype=0&src=http%3A%2F%2Fbbs.jooyoo.net%2Fattachment%2FMon_0905%2F24_65548_2835f8eaa933ff6.jpg',
        name: '第一条新闻',
        time: '2020/01/02',
        is_collect: 0
    }
]

router.get('/api/news/list', (ctx, next) => {
    ctx.body = {
        data: {
            list: newsList,
        },
        status: 0,
        statusText: '获取成功！'
    }
})

router.get('/api/news/detail', (ctx, next) => {
    let id = ctx.request.query.id;
    ctx.body = {
        data: findNews(id, newsList),
        status: 0,
        statusText: '获取成功'
    }
    function findNews(id, newsList) {
        let detail
        newsList.forEach((item, index) => {
            if (item.id == id) {
                detail = item;
                return detail;
            }
        })
        return detail;
    }
})
router.post('/api/news/collect', (ctx, next) => {
    let id = ctx.request.body.id;
    
    ctx.body = {
        data: {
            isCollect: '111',
            is_collect: findNews(id, newsList)
        },
        status: 0,
        statusText: '操作成功'
    }
    function findNews(id, newsList) {
        let is_collect
        newsList.forEach((item, index) => {
            if (item.id == id) {
                item.is_collect = item.is_collect == 1 ? 0 : 1;
                is_collect = item.is_collect
                console.log(newsList)
                console.log('\n')
                return is_collect;
            }
        })
        return is_collect;
    }
})

router.get('/api/news/collect_list', (ctx, next) => {
    ctx.response.body = {
        data: {
            list: findCollectNews(newsList)
        },
        status: 0,
        statusText: '获取成功'
    }
    function findCollectNews(newsList) {
        let arr = []
        newsList.forEach((item, index) => {
            if (item.is_collect == 1) {
                arr.push(item)
            }
        })
        return arr;
    }
    // ctx.body = {
    //     list: newsList
    // }
});

router.get('/api/form', (ctx, next) => {
    ctx.response.body = {
        data: '收到请求',
        status: 0,
        statusText: '获取成功'
    }
})

app
    .use((function(options) {
        return async (ctx, next) => {
            console.log(ctx.origin)
            ctx.set('Access-Control-Allow-Origin', '*')
            // ctx.set('Access-Control-Allow-Origin', 'http://vd.bch.leju.com')
            // ctx.set('Access-Control-Allow-Origin', options.origin);
            ctx.set('Access-Control-Allow-Methods', 'GET');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type');
            ctx.set('Access-Control-Allow-Credentials', 'true')
            if (ctx.method === 'OPTIONS') {
                ctx.status = 204;
            } else {
                await next()
            }
        }
    })(
        // {
        //     origin: 'http://res.devv.leju.com:8080'
        // }
    ))
    // .use(koaCors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)