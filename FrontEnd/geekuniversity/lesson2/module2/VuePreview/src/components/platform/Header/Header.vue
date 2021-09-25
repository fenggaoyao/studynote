<template>
    <div class="compo-page-header">
        <div class="logo">
            <a href="#/"><img src="/static/images/deer.svg"/></a>
        </div>
        <div class="title">通用模版平台</div>

        <ul class="menu">
            <a href="#/models"><li name="excellent" :class="active == 'models' ? 'menu-item active' : 'menu-item'">创意模版</li></a>
            <li name="help" :class="active == 'help' ? 'menu-item active' : 'menu-item'">帮助文档</li>
            <a href="#/"><li name="mineModel" :class="active == 'mineModel' ? 'menu-item active' : 'menu-item'">我的</li></a>
        </ul>

        <ul v-if="active == 'mineModel'" class="top-menu">
            <li :class="hash == '#/' ? 'active' : '' "><a href="#/">我的模版</a></li>
            <li :class="hash == '#/mineComponent' ? 'active' : '' "><a href="#/mineComponent">我的组件</a></li>
            <li :class="hash == '#/mineWidget' ? 'active' : '' "><a href="#/mineWidget">我的组合件</a></li>
        </ul>

        <div class="user"><a target="_blank" href="https://uuap.inwaimai.baidu.com/">{{user}}</a></div>
    </div>
</template>

<script>
import Utils from 'utils'

export default {
    name: 'xp-page-header',
    props: {
        active: {
            type: String,
            require: false
        }
    },
    data(){
        return {
            hash: location.hash,
            user: Utils.getCookie('userId')
        }
    },
    methods: {
        closeView(e){
            this.showView = false;
        },

    }
}
</script>

<style lang="less-loader">
    .compo-page-header{
        width: 100%;
        background-color: #444;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .logo{
            width: 50px;
            height: 50px;
            background-color: #444;
            cursor: pointer;
            img{
                width: 90%;
                height: 90%;
                cursor: pointer;
                margin: 4%;
            }
        }
        .logo:hover{
            background-color: #666;
        }

        .title{
            padding: 10px;
            font-size: 18px;
            color: #eee;
        }

        .menu{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: 50px;

            .menu-item{
                padding: 10px 15px;
                font-size: 14px;
                cursor: pointer;
                margin-right: 5px;
                color: #666;
                border-radius: 6px;
            }
            .menu-item.active{
                background-color: #666;
                color: #ddd;
            }
            .menu-item:hover{
                background-color: #666;
                color: #ddd;
            }
        }


        .top-menu{
            display: flex;
            padding: 0px 10px 10px 0px;
            margin-top: 9px;
            margin-left: 20px;

            li{
                padding: 5px 15px;
                border-right: 1px #ccc solid;
                font-size: 14px;
                background-color: #f5f8fa;
                a{
                    cursor: pointer;
                    color: #999;
                }
            }
            li:first-child{
                border-radius: 10px 0 0 10px;
            }
            li:last-child{
                border-radius: 0 10px 10px 0;
            }
            li.active{
                background-color: #d8dbde;
                color: #666;
                a{
                    color: #444;
                }
            }
        }

        .user{
            position: absolute;
            right: 10px;
            color: #ccc;
            background-color: #555;
            padding: 5px 10px;
            border-radius: 4px;
            a{
                color: #ccc;
            }
        }

    }
</style>