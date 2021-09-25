<template>
    <modal v-show="show" :show-close="modalOption.showClose" :click-to-hide="modalOption.clickToHide">
        <div slot="content" class="vue-modal-container valentines-day-location">
            <div class="tool-tip">
                <p>您当前的定位不在北京</p>
                <p>此活动仅限北京地区</p>
            </div>
            <div class="button" @click="gotoZhinan">去指南频道 看约会指南</div>
        </div>
    </modal>
</template>

<script type="es6">
    import Modal from './Model';

    export default {
        name: 'xp-valentines-day-location',

        components: {
            'modal': Modal
        },

        data() {
            return {
                show: false,
                modalOption: {
                    showClose: false,
                    clickToHide: false
                },
                show: false
            };
        },

        mounted() {
            if (this.isWMApp() || this.isNuomi()) {
                this.NAready().then(() => {
                    this.getCityId().then((location = {}) => {
                        location.city_id != 131 && (this.show = true);
                    });
                });
            }
        },

        methods: {
            gotoZhinan(e) {
                const link = 'http://waimai.baidu.com/static/chisha/index.html#/home/start';
                this.changePage(link);
            }
        }
    }
</script>

<style lang="less-loader">
    .vue-modal-container {
        position: relative;
        display: table-cell;
        vertical-align: middle;
        background: url(http://img.waimai.baidu.com/pb/4b6a6828dfb52bcb8bfe19a06cc19a1172@f_png) no-repeat center 25%;
        background-size: contain;
    }

    .valentines-day-location {
        .tool-tip {
            position: absolute;
            top: 25%;
            left: .4rem;
            color: #d98658;
            font-size: .3rem;
            letter-spacing: 2px;
        > p:last-child {
              margin-top: .1rem;
          }
        }

        .button {
            position: relative;
            top: 1.5rem;
            padding: .12rem 0;
            margin: 0 auto;
            width: 3.5rem;
            text-align: center;
            background-color: rgb(238, 57, 59);
            border-radius: .15rem;
            border-bottom: .1rem solid #d4353d;
            color: #fff;
            letter-spacing: 1px;
            font-size: .25rem;
        }
    }
</style>