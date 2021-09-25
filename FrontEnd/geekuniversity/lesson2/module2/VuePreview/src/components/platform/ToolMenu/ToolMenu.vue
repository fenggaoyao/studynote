<template>
    <div>
        <el-menu mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">
                    <i class="icon-save"></i>文件</template>
                <el-menu-item index="1-1">
                    <i class="icon-save"></i>保存</el-menu-item>
                <el-menu-item index="1-2">
                    <i class="icon-file_upload"></i>导入</el-menu-item>
                <el-menu-item index="1-3">
                    <i class="icon-get_app"></i>导出</el-menu-item>
                <el-menu-item index="1-4">
                    <i class="icon-settings"></i>偏好设置</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">编辑</template>
                <el-menu-item index="2-1">
                    <i class="icon-undo"></i>撤销</el-menu-item>
                <el-menu-item index="2-2">
                    <i class="icon-redo"></i>重做</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">组件</template>
                <el-menu-item index="3-1">
                    <i class="icon-publish"></i>上传组件</el-menu-item>
                <el-menu-item index="3-2" :route="{path: '/mineComponent'}">
                    <i class="icon-dashboard"></i>管理组件</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">组合件</template>
                <el-menu-item index="4-1" :route="{path: '/mineWidget'}">
                    <i class="icon-settings_input_composite"></i>管理组合件</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">发布</template>
                <el-menu-item index="5-1" :route="{path: '/publish'}">
                    <i class="icon-settings_input_composite"></i>发布</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import Vue from 'vue'
import NewComponent from 'components/platform/NewComponent'
import api from 'api'
import { Message, Menu, Submenu, MenuItem} from 'element-ui';
import utils from 'utils'

export default {
    name: 'xp-toolmenu',
    components:{
        'el-menu': Menu,
        'el-submenu': Submenu,
        'el-menu-item': MenuItem
    },
    methods: {
        handleSelect: function(key, keyPath) {
            switch (key) {
                case '2':
                    eventHub.$emit('publish-page');
                    break;
                case '1-1':
                    this.save();
                    break;
                case '3-1':
                    NewComponent();
                    break;
                case '3-2':
                    location.hash = '#/mineComponent';
                    break;
                case '4-1':
                    location.hash = '#/mineWidget';
                    break;
            };
        },

        save() {
            eventHub.$emit('xp-save');
        }

    }
}
</script>
