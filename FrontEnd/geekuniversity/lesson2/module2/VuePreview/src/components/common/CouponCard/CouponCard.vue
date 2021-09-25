<template>
    <div class="coupon-card" :style="couponCardStyle">
        <div class="coupon-card-list" :style="{backgroundColor: cardBackgroundColor}">
            <div class="semi-circle-top" :style="{backgroundColor: semiBackgroundColor}"></div>
            <div class="semi-circle-bottom" :style="{backgroundColor: semiBackgroundColor}"></div>
            <div class="coupon-container">
                <div class="coupon-amount">
                    <div class="coupon-amount-num">
                        ￥<div class="coupon-money">{{amount}}</div>
                    </div>
                </div>
                <div class="coupon-type">
                    <div class="coupon-type-info">
                        <p class="coupon-type-name">{{coupName}}</p>
                        <p class="coupon-type-num">{{countText}}</p>
                    </div>
                    <div class="get-coupon">
                        <div v-if="checkStatus('toget')" class="get-all-coupon" :style="{borderColor: fontColor}">领券</div>
                        <div v-if="checkStatus('got')" class="get-all-coupon" :style="{borderColor: fontColor}">已领</div>
                        <div v-if="checkStatus('none')" class="get-all-coupon" :style="{borderColor: fontColor}">已抢光</div>
                        <div v-if="checkStatus('used')" class="get-all-coupon" :style="{borderColor: fontColor}">已使用</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'xp-coupon-card',
        props: {
            couponTypeId: {
                type: String,
                require: true
            },
            cardBackgroundColor: {
                type: String,
                default: '#fb7d45',
                require: false
            },
            semiBackgroundColor: {
                type: String,
                default: '#fff',
                require: false
            },
            fontColor: {
                type: String,
                default: '#fff',
                require: false
            },
            leftAndRightMargin: {
                type: String,
                default: '10px',
                require: false
            },
            topMargin: {
                type: String,
                default: '10px',
                require: false
            }
        },
        mounted() {
            const phone = location.search.match(/[&|\?]phone=\d{11}/);
            if (phone && phone[0]) {
                this.phone = phone[0];
                this.bindCoupon();
            }
            if (this.couponTypeId) {
                this.fetchCouponInfo();
            }
        },
        data() {
            return {
                coupName: '',
                limitNum: '',
                amount: '',
                phone: undefined,
                status: 'toget'
            };
        },
        computed: {
            couponCardStyle: function () {
                return {
                    color: this.fontColor,
                    marginTop: this.topMargin,
                    marginLeft: this.leftAndRightMargin,
                    marginRight: this.leftAndRightMargin
                };
            },
            countText: function () {
                return `满${this.limitNum}减${this.amount}`;
            }
        },
        watch: {
            couponTypeId: function () {
                this.fetchCouponInfo();
            }
        },
        methods: {
            fetchCouponInfo(param = {}) {
                /*param.display = 'json';
                this.get({
                    url: '/coupon/getcoupontype',
                    param: param
                }).then(res => {
                    this.coupName = res.name;
                    this.limitNum = res.limit_num;
                    this.amount = res.amount;
                    // TODO check status
                }).catch(error => {

                });*/
            },

            handleClickBind() {
                if (this.checkBrowser()) {
                    if (this.isWeixin()) {
                        if (this.phone) {
                            this.bindCoupon();
                        } else {
                            const referer = encodeURIComponent(`${location.href}&couponId=${this.couponTypeId}`);
                            location.href = `http://waimai.baidu.com/static/phonebind/index.html?referer=${referer}`;
                        }
                    } else {
                        this.checkLogin(this.bindCoupon, location.href, {});
                    }
                }
            },

            checkLogin(...args) {
                this.login(...args);
            },

            bindCoupon() {
                const param = {
                    coupon_type_id: this.couponTypeId,
                    phone: this.phone,
                    display: 'json'
                };
                this.get({
                    url: '/upcshopui/huodong/bindcoupon',
                    param: param
                }).then(res => {
                    if (res.error_no === 0) {
                        this.alert('领取成功');
                        this.status = 'got';
                    } else if (res.error_no === 106) {
                        this.alert('抱歉,该券已领完');
                        this.status = 'none';
                    } else {
                        this.alert('抱歉,领取不成功');
                    }
                }).catch(error => {
                    this.alert('抱歉,领取不成功');
                });
            },

            checkStatus(status) {
                return this.status === status;
            }
        }
    }
</script>

<style lang="less">
    .coupon-card {
        height: 1.8rem;
        overflow: hidden;

        .coupon-card-list {
            width: 100%;
            height: 100%;
            position: relative;
            font-size: 0;
            padding: 0.2rem 0;

            .coupon-container {
                width: 100%;
                height: 100%;

                .coupon-amount {
                    height: 100%;
                    border-right: 1px dashed #fca47b;
                    width: 30%;
                    font-size: .28rem;
                    vertical-align: middle;
                    display: inline-block;
                    padding-top: .25rem;

                    .coupon-amount-num {
                        text-align: center;
                    }

                    .coupon-money {
                        font-size: .75rem;
                        display: inline-block;
                    }
                }
                .coupon-type {
                    width: 70%;
                    height: 100%;
                    vertical-align: middle;
                    padding: 0 .24rem;
                    display: inline-table;

                    .coupon-type-info {
                        height: 100%;
                        vertical-align: middle;
                        display: inline-block;
                        width: 75%;
                        display: table-cell;
                        table-layout: fixed;

                        .coupon-type-name {
                            word-break: break-all;
                        }

                        .coupon-type-num {
                            font-size: .24rem;
                        }
                    }
                    .get-coupon {
                        vertical-align: middle;
                        display: inline-block;
                        width: 25%;
                        display: table-cell;
                        table-layout: fixed;

                        .get-all-coupon {
                            width: 100%;
                            height: .62rem;
                            line-height: .62rem;
                            border-radius: 2.4rem;
                            font-size: .28rem;
                            border: 1px solid white;
                            text-align: center;
                        }
                    }
                }
            }
            .semi-circle-top {
                width: .24rem;
                height: .24rem;
                text-align: center;
                background-color: white;
                border-radius: 0 0 2.4rem 2.4rem;
                position: absolute;
                left: 30%;
                top: -0.144rem;
                margin-left: -0.12rem;
            }

            .semi-circle-bottom {
                width: .24rem;
                height: .24rem;
                text-align: center;
                background-color: white;
                border-radius: 2.4rem 2.4rem 0 0;
                position: absolute;
                left: 30%;
                bottom: -0.144rem;
                margin-left: -0.12rem;
            }

        }
        .receive-coupon-card-list {
            background-color: white;
            border: 1px solid #e5e5e5;

            .semi-circle-top {
                border: 1px solid #e5e5e5;
                border-top: none;
                /* top: -1px; */
            }

            .semi-circle-bottom {
                border: 1px solid #e5e5e5;
                border-bottom: none;
                /* bottom: -1px; */
            }

            .coupon-container {

                .coupon-amount {
                    border-right: 1px dashed #e5e5e5;

                    .coupon-amount-num {
                        color: #fb7d45;
                    }
                }
                .coupon-type {
                    color: black;

                    .coupon-type-info {

                        .coupon-type-name {
                        }

                        .coupon-type-num {
                            color: #666666;
                        }

                    }
                    .get-coupon {

                        .get-all-coupon {
                            border: none;
                            color: #666666;
                        }

                    }
                }
            }
        }
    }

</style>
