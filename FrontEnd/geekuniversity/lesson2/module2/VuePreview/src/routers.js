import VueRouter from 'vue-router'

const Edit = resolve => { import( /* webpackChunkName: "EditPage" */ './pages/Edit/Edit').then((mod) => { resolve(mod.default); }) };
const MinePage = resolve => {import( /* webpackChunkName: "MinePage" */ './pages/Mine/MinePage').then((mod) => { resolve(mod.default); }) }
const MinePublish = resolve => { import( /* webpackChunkName: "MinePublish" */ './pages/Mine/MinePublish').then((mod) => { resolve(mod); }) };
const MineWidget = resolve => { import( /* webpackChunkName: "MineWidget" */ './pages/Mine/MineWidget').then((mod) => { resolve(mod); }) };
const MineComponent = resolve => { import( /* webpackChunkName: "MineComponent" */ './pages/Mine/MineComponent').then((mod) => { resolve(mod); }) };
const PublishPage = resolve => { import( /* webpackChunkName: "Publish" */ './pages/Publish/Publish').then((mod) => { resolve(mod); }) };
const Models = resolve => { import( /* webpackChunkName: "Models" */ './pages/Models/Models').then((mod) => { resolve(mod.default); }) };
const MediaUpload = resolve => { import( /* webpackChunkName: "MediaUpload" */ './pages/Media/MediaUpload').then((mod) => { resolve(mod); }) };
const RealTime = resolve => { import( /* webpackChunkName: "RealTime" */ './pages/RealTime/RealTime').then((mod) => { resolve(mod.default); }) };

let router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            name: 'edit',
            path: '/edit',
            component: Edit,
        },
        {
            name: 'mine',
            path: '/',
            component: MinePage
        },
        {
            name: 'publish',
            path: '/publish',
            component: PublishPage,
        },
        {
            name: 'minePublish',
            path: '/minePublish',
            component: MinePublish,
        },
        {
            name: 'mineComponent',
            path: '/mineComponent',
            component: MineComponent,
        },
        {
            name: 'mineWidget',
            path: '/mineWidget',
            component: MineWidget,
        },
        {
            name: 'models',
            path: '/models',
            component: Models,
        },
        {
            name: 'media',
            path: '/mediaUpload',
            component: MediaUpload,
        },
        {
            name: 'realtime',
            path: '/realtime',
            component: RealTime,
        }
    ]
});

export default router;