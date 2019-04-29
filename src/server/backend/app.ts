// 后端api

import {IncomingMessage, Server, ServerResponse} from 'http'

import * as mongoose from 'mongoose'
import * as fastify from 'fastify'

import { Resume } from './api/models/resumeModel'
import {routes} from './api/routes/resumeRoutes'


//
 const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})
//
// server.route({
//
// })

routes.forEach((route, index) => {
    // @ts-ignore
    server.route(route)
})


mongoose.connect('mongodb://localhost:27017/resumeDB', {useNewUrlParser: true})

server.listen('7654', () => {console.log('listening')})
// server.get('/', (request, reply) => {})

//
// const myResume = new Resume({
//     personalInformation: {
//         name: '孙莽岳',
//         phone: '18610244545',
//         email: 'sunmangyue@gmail.com',
//         sideNotes: []
//     },
//     experience: [
//         {
//             workplace: '上海，平安普惠有限公司',
//             time: '2018 年 6 月 - 2018 年 9 月',
//             job: '前端开发实习',
//             description: [
//                 '使用Vue搭建后台HR管理系统，Vuex作为状态管理，Vue-router作为前端路由，在旧有的管理系统基础上增加新的页面与功能',
//                 '依据公司要求，对传输的数据依据后台接口要求进行不同种类的加密，鉴权包装，解决较为复杂的异步请求逻辑',
//                 '使用jQuery维护旧有的登录验证页面，更改为新的登录验证方法，并将相关信息传递给登陆后的App',
//                 '使用大量不同的跨域传值手段，解决新旧项目间Token传递，数据传递，会话保持困难的问题',
//                 '将App收集到的地理位置转换为城市地区并进行统计'
//             ]
//         },
//         {
//             workplace: '北京，思科中国',
//             time: '2016年6月 – 2016年9月',
//             job: '技术支持',
//             description: [
//                 '协助起草Nexus-9000 系列交换机平台的Datasheet',
//                 '协助部署Nexus-9000系列交换机平台'
//             ]
//         }
//     ],
//     skill: [
//         {
//             title: '前端技术',
//             skills: ['Vue', 'Vuex', 'Vue-router', 'React', 'RxJS', 'webpack', 'HTML5']
//         },
//         {
//             title: '程序语言',
//             skills: ['JavaScript', 'TypeScript', 'Python', 'C++']
//         }
//     ],
//     project: [
//         {
//             workplace: 'Northeastern University (美国东北大学)',
//             time: '2018 年 12 月 - 2019 年 1 月',
//             projectName: 'Web app 开发项目',
//             description: [
//                 '利用React进行前端开发，构建用于领养流浪宠物的Web app。由于涉及较为复杂的异步逻辑，使用RxJS进行状态管理和数据获取',
//                 '包装前端 HTTP REST 接口在后端获取，放置数据',
//                 '为了良好的IDE提醒以及协作的便利，使用TypeScript作为开发语言，并对接口，Model进行了定义'
//             ]
//         },
//         {
//             workplace: 'Northeastern University (美国东北大学)',
//             time: '2018 年 12 月 - 2019 年 1 月',
//             projectName: 'Web app 开发项目',
//             description: [
//                 '利用React进行前端开发，构建用于领养流浪宠物的Web app。由于涉及较为复杂的异步逻辑，使用RxJS进行状态管理和数据获取',
//                 '包装前端 HTTP REST 接口在后端获取，放置数据',
//                 '为了良好的IDE提醒以及协作的便利，使用TypeScript作为开发语言，并对接口，Model进行了定义'
//             ]
//         }
//     ],
//     education: [
//         {
//             schoolName: 'Northeastern University （美国东北大学）',
//             time: '2017 年 9 月 - 2019 年 5 月',
//             diploma: '电子与计算机工程，硕士学位',
//             description: 'Database Management System, Machine Learning, Computer Architecture, Fundamentals of Computer Engineering, Classical Control Systems'
//         }
//     ]
// })
//
// myResume.save().then(() => console.log('save completed'))
