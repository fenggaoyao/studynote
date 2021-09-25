import  './iscroll.less';
import Utils from 'utils'

const config = [
    {
        name: 'cid',
        title: 'cid',
        type: String,
        default: '',
        require: false,
        component: 'none'
    },
    {
        name: 'columns',
        title: '列数',
        type: Number,
        default: 2,
        require: true,
        component: 'InputNumber'
    },
    {
        name: 'itemWidth',
        title: '宽度',
        type: Number,
        default: 200,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        type: Number,
        default: 200,
        require: false,
        component: 'InputNumber'
    },
];

export default {
    name: 'xp-iscroll',
    props: Utils.toProps(config),

    data(){
        let w = this.itemWidth * this.columns;
        let ow = Math.min(document.body.offsetWidth, 640);
        let maxScrollLeft = ow - w;
        return {
            hScroll: true,
            width: w,
            startX: 0,
            startY: 0,
            startTime: 0,
            curX: 0,
            moveX: 0,
            canDrag: true,
            timer: null,
            directionLocked: null,
            maxScrollLeft: maxScrollLeft
        }
    },

    render(h) {
        return (
            <div class="compo-iscroll">
                <div class="h-scroll-wraper" ref="scrollWraper" on-touchstart={this.touchStart} on-mousedown={this.touchStart}>
                    <div class="h-scroll-body" ref="scrollBody">
                        {this.$slots.default}
                    </div>
                </div>
            </div>
        );
    },

    mounted() {
        this.$el.style.height = this.height + 'px';
        this.$refs.scrollBody.style.width = this.width + 'px';
        this.padTabs(this.columns);
    },

    watch: {
        columns: function(val, oldVal){
            this.width = this.itemWidth * val;
            this.$refs.scrollBody.style.width = this.width + 'px';
            this.padTabs(val);
        }
    },

    updated(){
    },

    methods: {
        padTabs(val){
            let data = this.getModelData();
            if(data){
                if(val >= data.children.length){
                    let newCols = val - data.children.length;
                    for(let i=0; i<newCols; i++){
                        this.addComponent({
                            name: 'xp-flex-item',
                            path: 'common/FlexItem/FlexItem',
                            props: {}
                        });
                    }
                } else {
                    let newCols = data.children.length - val;
                    for(let i=0; i<newCols; i++){
                        let child = data.children.pop();
                        this.removeComponent(child.cid);
                    }
                }
            }
        },

        touchStart: function(e) {
            var me = this;
            
            if(me.running){
                return;
            }
            me.canDrag = true;
            me.directionLocked = null;
            
            let tt = e.targetTouches ? e.targetTouches[0] : e;

            me.startX = tt.pageX;
            me.startY = tt.pageY;
            me.startTime = Date.now();
            me.moveX = me.curX;

            var move = me.getRandomName();
            var end = me.getRandomName();
            if (me.timer) {
                clearTimeout(me.timer);
            }
            window[move] = function(e) {
                me.touchMove(e);
            };
            window[end] = function(e) {
                document.removeEventListener('touchmove', window[move], false);
                document.removeEventListener('touchend', window[end], false);
                document.removeEventListener('mousemove', window[move], false);
                document.removeEventListener('mouseup', window[end], false);
                delete window[move];
                delete window[end];
                me.touchEnd(e);
            };
            document.addEventListener('touchmove', window[move], false);
            document.addEventListener('touchend', window[end], false);
            document.addEventListener('mousemove', window[move], false);
            document.addEventListener('mouseup', window[end], false);

        },

        touchMove: function(e) {
            var me = this;
            if(!me.canDrag) return;

            if (Date.now() - me.startTime > 40) {
                let tt = e.targetTouches ? e.targetTouches[0] : e;
                if (me.hScroll) {
                    var disX = tt.pageX - me.startX;
                    var disY = tt.pageY - me.startY;

                    if (!me.directionLocked) {
                        if (Math.abs(disX) > Math.abs(disY))
                            me.directionLocked = 'x';
                        else
                            me.directionLocked = 'y';
                    }
                    if (me.directionLocked == 'x') {
                        e.preventDefault();
                        me.draw(disX);
                    } else {
                        me.canDrag = false;
                    }
                }
            }
            
        },

        touchEnd: function(e) {
            var me = this;
            if(!me.canDrag) return;
            let tt = e.changedTouches ? e.changedTouches[0] : e;
            if (me.hScroll) {
                var offX = tt.pageX - me.startX;
                var end = me.moveX;

                if (end > 0) {
                    //左回归
                    me.draw(-me.curX, true, function() {
                        me.curX = 0;
                    }, 0, true);
                } else if (end < me.maxScrollLeft) {
                    //右回归
                    var v = Math.min(0, me.maxScrollLeft);
                    me.draw(v - me.curX, true, function() {
                        me.curX = v;
                    }, 0, true);
                } else {
                    //惯性运动
                    var time = Date.now() - me.startTime;
                    if (offX) {
                        if(time < 300){
                            let result = me.momentum(me.moveX, offX, time, me.maxScrollLeft, me.width)
                            let momentum = result.destination;

                            me.draw(momentum - me.curX, true, function() {
                                if(momentum > 0){
                                    // 左回归
                                    me.draw(-me.curX, true, function() {
                                        me.curX = 0;
                                    }, 0, true);
                                } else if(momentum < me.maxScrollLeft){
                                    // 右回归
                                    me.draw(me.maxScrollLeft - me.curX, true, function() {
                                        me.curX = me.maxScrollLeft;
                                    }, 0, true);
                                } else {
                                    me.curX = momentum;
                                }
                            }, result.time, true);

                        } else {
                            me.curX = me.moveX;
                        }
                    }

                }
            }
        },

        draw: function(offset, animate, func, time, isMomentum) {
            var me = this;
            var sbody = me.$refs.scrollBody;
            if (!sbody) {
                return;
            }
            let dist = me.curX + offset;
            let offx = 0;
            if(!isMomentum ){
                if (dist < me.maxScrollLeft) {
                    offx = (dist - me.maxScrollLeft)/3;
                }
                if (dist > 0) {
                    offx = dist/3;
                }
            }
            me.setTransition(sbody, dist - offx, animate, function() {
                func && func();
            }, time);
        },

        setTransition: function(dom, x, animate, func, time) {
            let me = this;
            let didEnd = false;
            if (animate && !me.running) {
                me.running = true;
                let t = 0.3;
                if(time){ t = time + 0.3; }
                dom.style.webkitTransition = 'all ' + t +'s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                let rn = me.getRandomName();
                
                window[rn] = function(e) {
                    if (!didEnd) {
                        didEnd = true;
                        me.running = false;
                        dom.removeEventListener('webkitTransitionEnd', window[rn], false);
                        dom.removeEventListener('transitionend', window[rn], false);
                        delete window[rn];
                        func && func();
                    }
                };
                dom.addEventListener('webkitTransitionEnd', window[rn], false);
                dom.addEventListener('transitionend', window[rn], false);
                setTimeout(window[rn], (t+0.1)*1000);
            } else {
                dom.style.webkitTransition = 'none';
            }
            dom.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
            dom.style.transform = 'translate3d(' + x + 'px, 0, 0)';
            x && (me.moveX = x);
        },

        momentum: function (current, distance, time, maxScrollLeft, wrapperSize, deceleration) {
            let speed = Math.abs(distance) / time,
                destination,
                duration;
		    deceleration = deceleration === undefined ? 0.0006 : deceleration;
            
		    destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		    duration = speed / deceleration;

            if ( destination < maxScrollLeft ) {
                destination = wrapperSize ? maxScrollLeft - ( wrapperSize / 2.5 * ( speed / 8 ) ) : maxScrollLeft;
                distance = Math.abs(destination - current);
                duration = distance / speed;
            } else if ( destination > 0 ) {
                destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed;
            }

            return {
                destination: Math.round(destination),
                duration: duration/1000
            };
	    },

        getRandomName: function() {
            return 'func_' + (Math.random() * 1000000).toString(32) + '_' + Date.now().toString(32);
        },
        
    }
}



