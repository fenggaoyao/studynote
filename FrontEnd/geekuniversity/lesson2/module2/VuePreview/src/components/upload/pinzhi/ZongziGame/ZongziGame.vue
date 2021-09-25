<template>
    <div class="game-app" ref="gameBox" @click="playBgSound">
        <div v-if="showWeixinShare" class="weixin-layer" @click="hideMask">
            <img src="https://img.waimai.baidu.com/pb/f772d7dc35e3661e43b4add43c3ed8da35@f_png,q_80"/>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import 'pixi.js';
import PixiAudio from './Audio';

var gapp;
var resources;
var sprites = {};
var animations = {};
var foods = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var totalNum = 0;
var resets = [];
var sounds = [];

let shareInfo = {
    title: '震惊！你的小伙伴吃了90颗粽子，并向你投来挑衅的表情包',
    description: '不服来战！',
    image: 'https://img.waimai.baidu.com/pb/011583b70c1892a7f784a3a86a6e170d2e@q_80',
    url: 'https://waimai.baidu.com/static/h5/index.html?modelId=14956078701',
};

export default {
    name: 'xp-zongji-game',
    data () {
        return {
            ready: false,
            loaded: false,
            isOver: false,
            leftReady: false,
            rightReady: false,
            leftScore: 0,
            rightScore: 0,
            isVirtical: false,
            showWeixinShare: false,
            stopBgSound: false
        }
    },
    
    methods: {
        screenDetect () {
            if(window.innerHeight < window.innerWidth){
                this.isVirtical = true;
            } else {
                this.isVirtical = false;
            }
            if(this.isVirtical){
                setTimeout( () => {
                    this.initGame()
                }, 500)
            }
        },
        initGame () {
            if(gapp) return;
            let me = this;
            let w = window.innerWidth;
            let h = window.innerHeight;
            // if(w < h) return;
            PIXI.settings.RENDER_OPTIONS.autoResize = true;
            gapp = new PIXI.Application(h, w, {transparent: false});

            gapp.ticker.add(function(delta) {
                me.runAnimation()
                me.draw();
            });

            this.$refs.gameBox.appendChild(gapp.view);
            this.initLoading();
            sounds.bgSound = new PixiAudio('/static/h5/public/images/zongzigame/bg-sound.mp3', false, true);
            sounds.bgSound.loop = true;

            const loader = new PIXI.loaders.Loader();
            loader.add('background', '/static/h5/public/images/zongzigame/background.png')
            .add('bg', '/static/h5/public/images/zongzigame/bg.png')
            .add('boat', '/static/h5/public/images/zongzigame/boat.png')
            .add('ready1', '/static/h5/public/images/zongzigame/ready1.png')
            .add('ready2', '/static/h5/public/images/zongzigame/ready2.png')
            .add('joystick1', '/static/h5/public/images/zongzigame/joystick1.png')
            .add('joystick1On', '/static/h5/public/images/zongzigame/joystick1-on.png')
            .add('joystick2', '/static/h5/public/images/zongzigame/joystick2.png')
            .add('joystick2On', '/static/h5/public/images/zongzigame/joystick2-on.png')
            .add('barbg', '/static/h5/public/images/zongzigame/bloodbg.png')
            .add('bloodBarLeft', '/static/h5/public/images/zongzigame/blood-left.png')
            .add('bloodBarRight', '/static/h5/public/images/zongzigame/blood-right.png')
            .add('scoreLeft', '/static/h5/public/images/zongzigame/score-left.png')
            .add('scoreRight', '/static/h5/public/images/zongzigame/score-right.png')
            .add('baozi', '/static/h5/public/images/zongzigame/left-food1.png')
            .add('egg', '/static/h5/public/images/zongzigame/left-food2.png')
            .add('meat', '/static/h5/public/images/zongzigame/left-food3.png')
            .add('zao', '/static/h5/public/images/zongzigame/right-food1.png')
            .add('huasheng', '/static/h5/public/images/zongzigame/right-food2.png')
            .add('zao2', '/static/h5/public/images/zongzigame/right-food3.png')
            .add('armLeft', '/static/h5/public/images/zongzigame/arm-left.png')
            .add('armLeftDown', '/static/h5/public/images/zongzigame/arm-left-down.png')
            .add('armLeftUp', '/static/h5/public/images/zongzigame/arm-left-up.png')
            .add('armRight', '/static/h5/public/images/zongzigame/arm-right.png')
            .add('armRightUp', '/static/h5/public/images/zongzigame/arm-right-up.png')
            .add('armRightDown', '/static/h5/public/images/zongzigame/arm-right-down.png')
            .add('faceLeft', '/static/h5/public/images/zongzigame/emo-left-default.png')
            .add('faceLeftBehind', '/static/h5/public/images/zongzigame/emo-left-behind.png')
            .add('faceLeftAhead', '/static/h5/public/images/zongzigame/emo-left-ahead.png')
            .add('faceRight', '/static/h5/public/images/zongzigame/emo-right-default.png')
            .add('faceRightBehind', '/static/h5/public/images/zongzigame/emo-right-behind.png')
            .add('faceRightAhead', '/static/h5/public/images/zongzigame/emo-right-ahead.png')
            .add('resultLeftWin', '/static/h5/public/images/zongzigame/result-left-win.png')
            .add('resultLeftFail', '/static/h5/public/images/zongzigame/result-left-fail.png')
            .add('resultRightWin', '/static/h5/public/images/zongzigame/result-right-win.png')
            .add('resultRightFail', '/static/h5/public/images/zongzigame/result-right-fail.png')
            .add('buyBtn', '/static/h5/public/images/zongzigame/buy-btn.png')
            .add('shareButton', '/static/h5/public/images/zongzigame/share-btn.png')
            .add('resetButton', '/static/h5/public/images/zongzigame/restart-btn.png')
            
            loader.load((loader, imgs) => {
                resources = imgs;
                this.loaded = true
                this.addAnimate('loading', sprites.loading, 'alpha', 1, 0, 1000, () => {
                    sprites.loading.visible = false;
                    sprites.loadingText.visible = false;
                    this.gameStart();
                    this.removeAnimate('loading');
                });
            });
            loader.onError.add((e) => {
                alert(JSON.parse(e));
            });
            loader.onProgress.add((e) => {
                this.drawLoading(e.progress);
            })
        },
        gameStart () {
            this.initBackground();
            this.initUIReadyButton();
            sounds.click = new PixiAudio('/static/h5/public/images/zongzigame/click-sound.mp3');
            sounds.eatLeft = new PixiAudio('/static/h5/public/images/zongzigame/eat-sound.mp3');
            sounds.eatRight = new PixiAudio('/static/h5/public/images/zongzigame/eat-sound.mp3');
            sounds.leftLaugh = new PixiAudio('/static/h5/public/images/zongzigame/left-laugh.mp3');
            sounds.rightLaugh = new PixiAudio('/static/h5/public/images/zongzigame/right-laugh.mp3');
            
            gapp.stage.pivot.set(0, gapp.stage.height);
            gapp.stage.rotation = Math.PI / 2;
        },
        initBackground () {
            let bg = this.createSprite('bg', {
                texture: resources.bg.texture,
                width: gapp.renderer.width,
                height: gapp.renderer.height,
                x: 0, y: 0
            });
            let boat = this.createSprite('boat', {
                texture: resources.boat.texture,
                width: gapp.renderer.width + this.toVW(20),
                height: this.toVW(60),
                x:this.toVW( -10), y: this.toVW(185)
            });
            let background = this.createSprite('background', {
                texture: resources.background.texture,
                width: gapp.renderer.width,
                height: gapp.renderer.height,
                x: 0, y: 0
            });
            let leftFace = this.createSprite('faceLeft', {
                texture: resources.faceLeft.texture,
                width: this.toVW(145),  height: this.toVW(85),
                x: this.toVW(154), y: this.toVW(80)
            });
            let rightFace = this.createSprite('faceRight', {
                texture: resources.faceRight.texture,
                width: this.toVW(145),  height: this.toVW(140),
                x: gapp.renderer.width - this.toVW(293), y: this.toVW(80)
            });
            this.initUIFood();
            let leftArm = this.createSprite('armLeft', {
                texture: resources.armLeft.texture,
                width: this.toVW(280),  height: this.toVW(117),
                x: this.toVW(90), y: this.toVW(150)
            });
            let rightArm = this.createSprite('armRight', {
                texture: resources.armRight.texture,
                width: this.toVW(240),  height: this.toVW(94),
                x: gapp.renderer.width - this.toVW(350), y: this.toVW(145)
            });
            let enterMask = this.createMask('enterMask', {
                color: '#000000', alpha: 1
            });
            this.addAnimate('background', enterMask, 'alpha', 1, 0, 2000, () => {
                this.removeAnimate('background');
            })
            this.addAnimate('boat', boat, 'x', -10, 0, 500, () => {}, false, true);
        },
        initUIFood() {
            let foodLeft0 = this.createSprite('foodLeft0', {
                texture: resources.baozi.texture,
                width: this.toVW(60), height: this.toVW(40),
                x: this.toVW(110), y: gapp.renderer.height - this.toVW(130)
            });
            let foodLeft1 = this.createSprite('foodLeft1', {
                texture: resources.baozi.texture,
                width: this.toVW(50), height: this.toVW(40),
                x: this.toVW(180), y: gapp.renderer.height - this.toVW(170)
            });
            let foodLeft2 = this.createSprite('foodLeft2', {
                texture: resources.egg.texture,
                width: this.toVW(50), height: this.toVW(40),
                x: this.toVW(140), y: gapp.renderer.height - this.toVW(150)
            });
            let foodLeft3 = this.createSprite('foodLeft3', {
                texture: resources.meat.texture,
                width: this.toVW(80), height: this.toVW(50),
                x: this.toVW(130), y: gapp.renderer.height - this.toVW(120)
            });
            let foodLeft4 = this.createSprite('foodLeft4', {
                texture: resources.meat.texture,
                width: this.toVW(80), height: this.toVW(50),
                x: this.toVW(160), y: gapp.renderer.height - this.toVW(150)
            });
            let foodLeft5 = this.createSprite('foodLeft5', {
               texture: resources.baozi.texture,
                width: this.toVW(60), height: this.toVW(40),
                x: this.toVW(240), y: gapp.renderer.height - this.toVW(160)
            });
            let foodLeft6 = this.createSprite('foodLeft6', {
                texture: resources.egg.texture,
                width: this.toVW(60), height: this.toVW(40),
                x: this.toVW(200), y: gapp.renderer.height - this.toVW(150)
            });
            let foodLeft7 = this.createSprite('foodLeft7', {
                texture: resources.meat.texture,
                width: this.toVW(80), height: this.toVW(50),
                x: this.toVW(160), y: gapp.renderer.height - this.toVW(110)
            });
            let foodLeft8 = this.createSprite('foodLeft8', {
                texture: resources.egg.texture,
                width: this.toVW(50), height: this.toVW(40),
                x: this.toVW(270), y: gapp.renderer.height - this.toVW(130)
            });
            let foodLeft9 = this.createSprite('foodLeft9', {
                texture: resources.baozi.texture,
                width: this.toVW(80), height: this.toVW(50),
                x: this.toVW(220), y: gapp.renderer.height - this.toVW(120)
            });

            let foodRight0 = this.createSprite('foodRight0', {
               texture: resources.huasheng.texture,
                width: this.toVW(50), height: this.toVW(60),
                x: gapp.renderer.width - this.toVW(260), y: gapp.renderer.height - this.toVW(170)
            });
            let foodRight1 = this.createSprite('foodRight1', {
                texture: resources.huasheng.texture,
                width: this.toVW(60), height: this.toVW(40),
                x: gapp.renderer.width - this.toVW(320), y: gapp.renderer.height - this.toVW(160)
            });
            let foodRight2 = this.createSprite('foodRight2', {
                texture: resources.zao.texture,
                width: this.toVW(50), height: this.toVW(40),
                x: gapp.renderer.width - this.toVW(330), y: gapp.renderer.height - this.toVW(140)
            });
            let foodRight3 = this.createSprite('foodRight3', {
                texture: resources.huasheng.texture,
                width: this.toVW(60), height: this.toVW(40),
                x: gapp.renderer.width - this.toVW(340), y: gapp.renderer.height - this.toVW(116)
            });
            let foodRight4 = this.createSprite('foodRight4', {
                texture: resources.zao2.texture,
                width: this.toVW(60), height: this.toVW(70),
                x: gapp.renderer.width - this.toVW(300), y: gapp.renderer.height - this.toVW(140)
            });
            let foodRight5 = this.createSprite('foodRight5', {
                texture: resources.zao2.texture,
                width: this.toVW(50), height: this.toVW(50),
                x: gapp.renderer.width - this.toVW(220), y: gapp.renderer.height - this.toVW(160)
            });
            let foodRight6 = this.createSprite('foodRight6', {
                texture: resources.zao.texture,
                width: this.toVW(60), height: this.toVW(50),
                x: gapp.renderer.width - this.toVW(240), y: gapp.renderer.height - this.toVW(140)
            });
            let foodRight7 = this.createSprite('foodRight7', {
                texture: resources.huasheng.texture,
                width: this.toVW(60), height: this.toVW(50),
                x: gapp.renderer.width - this.toVW(250), y: gapp.renderer.height - this.toVW(110)
            });
            let foodRight8 = this.createSprite('foodRight8', {
                texture: resources.huasheng.texture,
                width: this.toVW(60), height: this.toVW(50),
                x: gapp.renderer.width - this.toVW(160), y: gapp.renderer.height - this.toVW(130)
            });
            let foodRight9 = this.createSprite('foodRight9', {
                texture: resources.zao.texture,
                width: this.toVW(60), height: this.toVW(60),
                x: gapp.renderer.width - this.toVW(200), y: gapp.renderer.height - this.toVW(130)
            });
        },
        initUIReadyButton () {
            let readyLeft = this.createSprite('readyLeft', {
                texture: resources.ready1.texture,
                width: this.toVW(200), height: this.toVW(80),
                x: this.toVW(40), y: gapp.renderer.height - this.toVW(120),
                interactive: true,
                buttonMode: true
            });
            readyLeft.on('pointerdown', () => {
                this.leftReady = true
                readyLeft.visible = false;
                this.checkReady()
                sounds.click.play();
            });
            let readyRight = this.createSprite('readyRight', {
                texture: resources.ready2.texture,
                width: this.toVW(200), height: this.toVW(80),
                x: gapp.renderer.width - this.toVW(240), y: gapp.renderer.height - this.toVW(120),
                interactive: true,
                buttonMode: true
            });
            readyRight.on('pointerdown', () => {
                this.rightReady = true
                readyRight.visible = false;
                this.checkReady()
                sounds.click.play();
            });
        },
        checkReady () {
            if(this.leftReady && this.rightReady){
                this.initCountDown();
            }
        },
        initCountDown () {
            let countdownMask = this.createMask('countdownMask', {
                color: '#000000', alpha: 0.6
            });
            let cd = this.createText('countdown', 3, {
                x: gapp.renderer.width/2,  
                y: gapp.renderer.height/2,
                fontSize: 500,
                fontStyle: 'italic',
                color: 0xffffff
            });
            cd.anchor.set(0.5, 0.5);
            let current = 3;
            this.addAnimate('countdown', cd, 'scale', 1, 0.2, 1000, () => {
                if(current > 1){
                    cd.text = --current;
                    this.rerunAnimate('countdown');
                } else {
                    cd.visible = false;
                    this.ready = true;
                    this.removeAnimate('countdown');
                    countdownMask.visible = false;
                    this.startTick();
                    this.initUIButton();
                    this.initUIBlood();
                }
            })
        },
        startTick () {
            let tt = this.createText('timeTick', 10, {
                x: gapp.renderer.width/2,  
                y: 30,
                fontSize: 50,
                color: 0xffffff
            });
            tt.anchor.set(0.5, 0.5);
            let current = 10;
            this.addAnimate('timeTick', tt, 'scale', 1, 0.8, 1000, () => {
                if(current > 1){
                    tt.text = --current;
                    this.rerunAnimate('timeTick');
                } else {
                    this.isOver = true;
                    tt.text = 0;
                    this.removeAnimate('timeTick');
                    this.gameOver();
                }
            })
        },
        initUIButton(){
            let leftButton = this.createSprite('leftButton', {
                texture: resources.joystick1.texture,
                width: this.toVW(120), height: this.toVW(120),
                x: this.toVW(10), y: gapp.renderer.height - this.toVW(130),
                interactive: true, buttonMode: true
            });
            leftButton.on('pointerdown', () => {
                if(this.isOver){
                    if(this.leftScore >= this.rightScore){
                        sounds.leftLaugh.play();
                    } else {
                        sounds.rightLaugh.play();
                    }
                    return;
                }
                this.leftScore++;
                sprites.armLeft.texture = resources.armLeftDown.texture;
                leftButton.texture = resources.joystick1On.texture;
                this.checkEmotion();
                sounds.eatLeft.play();
            });
            leftButton.on('pointerup', () => {
                if(this.isOver) return;
                let index = this.getRandomFood();
                let name = 'foodLeft' + index;
                let food = sprites[name];
                if(!food) return;
                this.addAnimate(name, food, ['x', 'y', 'alpha'], [food.x, food.y, 1], [this.toVW(180), this.toVW(gapp.renderer.height - 220), 0], 300, () => {
                    this.removeAnimate(name);
                    this.resetFood(index);
                }, true)
                sprites.armLeft.texture =  resources.armLeftUp.texture;
                leftButton.texture = resources.joystick1.texture
            });
            let rightButton = this.createSprite('rightButton', {
                texture: resources.joystick2.texture,
                width: this.toVW(120), height: this.toVW(120),
                x: gapp.renderer.width - this.toVW(130), y: gapp.renderer.height - this.toVW(130),
                interactive: true, buttonMode: true
            });
            rightButton.on('pointerdown', () => {
                if(this.isOver) {
                    if(this.leftScore < this.rightScore){
                        sounds.rightLaugh.play();
                    } else {
                        sounds.leftLaugh.play();
                    }
                    return;
                }
                this.rightScore++;
                sprites.armRight.texture = resources.armRightDown.texture;
                rightButton.texture = resources.joystick2On.texture;
                this.checkEmotion();
                sounds.eatRight.play();
            });
            rightButton.on('pointerup', () => {
                if(this.isOver) return;
                let index = this.getRandomFood();
                let name = 'foodRight' + index;
                let food = sprites[name];
                if(!food) return;
                this.addAnimate(name, food, ['x', 'y', 'alpha'], [food.x, food.y, 1], [this.toVW(gapp.renderer.width - 155), this.toVW(gapp.renderer.height - 220), 0], 300, () => {
                    this.removeAnimate(name);
                    this.resetFood(index);
                }, true)
                sprites.armRight.texture =  resources.armRightUp.texture;
                rightButton.texture = resources.joystick2.texture
            });
        },
        initUIBlood() {
            let bloodBarLeft = this.createSprite('bloodBarLeft', {
                texture: resources.barbg.texture,
                width: this.toVW(200), height: this.toVW(20),
                x: this.toVW(56), y: this.toVW(10)
            });
            let bloodLeft = this.createSprite('bloodLeft', {
                texture: resources.bloodBarLeft.texture,
                width: this.toVW(this.leftScore), height: this.toVW(10),
                x: this.toVW(65), y: this.toVW(15)
            });
            let scoreLeft = this.createSprite('scoreLeft', {
                texture: resources.scoreLeft.texture,
                width: this.toVW(40), height: this.toVW(40),
                x: this.toVW(10), y: this.toVW(10)
            });
            let scoreTextLeft = this.createText('scoreTextLeft', 0, {
                x: this.toVW(30), y: this.toVW(30), color: 0xffffff
            });

            let bloodBarRight = this.createSprite('bloodBarRight', {
                texture: resources.barbg.texture,
                width: this.toVW(200), height: this.toVW(20),
                x: gapp.renderer.width - this.toVW(256), y: this.toVW(10)
            });
            let bloodRight = this.createSprite('bloodRight', {
                texture: resources.bloodBarRight.texture,
                width: this.toVW(this.rightScore), height: this.toVW(10),
                x: gapp.renderer.width - this.toVW(245), y: this.toVW(15)
            });
            let scoreRight = this.createSprite('scoreRight', {
                texture: resources.scoreRight.texture,
                width: this.toVW(40), height: this.toVW(40),
                x: gapp.renderer.width - this.toVW(50), y: this.toVW(10)
            });
            let scoreTextRight = this.createText('scoreTextRight', 0, {
                x: gapp.renderer.width - this.toVW(30), y: this.toVW(30), color: 0xffffff
            });
        },
        checkEmotion () {
            if(this.leftScore >= this.rightScore) {
                sprites.faceLeft.texture = resources.faceLeftAhead.texture;
                sprites.faceRight.texture = resources.faceRightBehind.texture;
            } else {
                sprites.faceLeft.texture = resources.faceLeftBehind.texture;
                sprites.faceRight.texture = resources.faceRightAhead.texture;
            }
        },
        initLoading () {
            var loading = new PIXI.Graphics();
            gapp.stage.addChild(loading);
            sprites.loading = loading;
            loading.lineStyle(10, 0xffffff, 1);
            loading.beginFill(0xffffff, 1);
            let x = gapp.renderer.width / 2;
            let y = gapp.renderer.height / 2;
            let r = 20;
            sprites.loading.moveTo(x, y - r);

            this.createText('loadingText', 0, {
                x: gapp.renderer.width / 2, y: gapp.renderer.height / 2 + 50, fontSize: 16
            });
        },

        getRandomFood () {
            let idx = Math.floor(Math.random() * foods.length);
            let result = foods[idx];
            foods.splice(idx, 1);
            return result
        },
        resetFood (index) {
            foods.push(index);
        },
        gameOver () {
            let gameoverMask = this.createMask('gameoverMask', {
                color: '#000000', alpha: 0.8
            });
            this.stopBgSound = true;
            sounds.bgSound.stop();
            let leftBoxX = 0;
            let rightBoxX = 0;

            if(!sprites.leftBox){
                sprites.leftBox = new PIXI.Container();
                gapp.stage.addChild(sprites.leftBox);
            }
            let leftBox = sprites.leftBox;
            leftBox.visible = true;
            let leftCard = this.createSprite('leftResult', {
                texture: resources.resultLeftWin.texture,
                width: this.toVW(200), height: this.toVW(220),
                x: this.toVW(100), y: this.toVW(20),
                interactive: true, buttonMode: true
            }, leftBox);
            this.createText('leftResultScore', this.leftScore, {
                x: this.toVW(230),  
                y: this.toVW(180),
                fontSize: 20,
                color: 0xffffff
            }, leftBox);
            this.createText('leftResultPercent', Math.round(this.leftScore * 100 / 110), {
                x: this.toVW(204),  
                y: this.toVW(210),
                fontSize: 12,
                color: 0xffffff
            }, leftBox);

            if(!sprites.rightBox){
                sprites.rightBox = new PIXI.Container();
                gapp.stage.addChild(sprites.rightBox);
            }
            let rightBox = sprites.rightBox;
            rightBox.visible = true;
            let rightCard = this.createSprite('rightResult', {
                texture: resources.resultRightWin.texture,
                width: this.toVW(200), height: this.toVW(220),
                x: gapp.renderer.width - this.toVW(300), y: this.toVW(20),
                interactive: true, buttonMode: true
            }, rightBox);
            this.createText('rightResultScore', this.rightScore, {
                x: gapp.renderer.width - this.toVW(173),  
                y: this.toVW(180),
                fontSize: 20,
                color: 0xffffff
            }, rightBox);
            this.createText('rightResultPercent', Math.round(this.rightScore * 100 / 110), {
                x: gapp.renderer.width - this.toVW(197),  
                y: this.toVW(210),
                fontSize: 12,
                color: 0xffffff
            }, rightBox);

            if(this.leftScore >= this.rightScore){
                sprites.leftResult.texture = resources.resultLeftWin.texture;
                sprites.rightResult.texture = resources.resultRightFail.texture;
                sprites.leftResultPercent.visible = true;
                sprites.rightResultPercent.visible = false;
                shareInfo.title = '震惊！你的小伙伴吃了'+ this.leftScore +'颗粽子，并向你投来挑衅的表情包';
                leftBoxX = leftBox.x;
                this.addAnimate('leftWinBox', leftBox, 'x', leftBox.x, leftBox.x + 50, 600, ()=>{}, false, true);
                sprites.leftResult.on('pointerdown', ()=>{
                    sounds.leftLaugh.stop();
                    sounds.leftLaugh.play();
                })
            } else {
                sprites.leftResult.texture = resources.resultLeftFail.texture;
                sprites.rightResult.texture = resources.resultRightWin.texture;
                sprites.leftResultPercent.visible = false;
                sprites.rightResultPercent.visible = true;
                shareInfo.title = '震惊！你的小伙伴吃了'+ this.rightScore +'颗粽子，并向你投来挑衅的表情包';
                rightBoxX = rightBox.x;
                this.addAnimate('rightWinBox', rightBox, 'x', rightBox.x, rightBox.x - 50, 600, ()=>{}, false, true);
                sprites.rightResult.on('pointerdown', ()=>{
                    sounds.rightLaugh.stop();
                    sounds.rightLaugh.play();
                })
            }
            this.setWeixinShare();
            setTimeout(()=>{
                let gap = (gapp.renderer.width - this.toVW(690)) / 2;
                let shareButton = this.createSprite('shareButton', {
                    texture: resources.shareButton.texture,
                    width: this.toVW(150), height: this.toVW(50),
                    x: this.toVW(120), y: gapp.renderer.height - this.toVW(90),
                    interactive: true, buttonMode: true
                });
                shareButton.on('pointerdown', () => {
                    this.doShare()
                    this.newSak({
                        daSrc: 'share.click',
                        daAct: 'click',
                    });
                })

                let buyButton = this.createSprite('buyButton', {
                    texture: resources.buyBtn.texture,
                    width: this.toVW(150), height: this.toVW(50),
                    x: gap + this.toVW(270), y: gapp.renderer.height - this.toVW(90),
                    interactive: true, buttonMode: true
                });
                buyButton.on('pointerdown', () => {
                    this.newSak({
                        daSrc: 'pinzhi.click',
                        daAct: 'click',
                    }, () => {
                        this.changePage('https://waimai.baidu.com/fly/h5/advancedTemplate?game_id=20177')
                    })
                });

                let resetButton = this.createSprite('resetButton', {
                    texture: resources.resetButton.texture,
                    width: this.toVW(150), height: this.toVW(50),
                    x: 2 * gap + this.toVW(420), y: gapp.renderer.height - this.toVW(90),
                    interactive: true, buttonMode: true
                });
                resetButton.on('pointerdown', () => {
                    leftBox.x = leftBoxX;
                    rightBox.x = rightBoxX;
                    this.resetGame()
                    this.newSak({
                        daSrc: 'restart.click',
                        daAct: 'click',
                    });
                });
            }, 1500)
        },
        resetGame () {
            for(let key in sprites){
                sprites[key].visible = false
                sprites[key].off('pointerdown')
                sprites[key].off('pointerup')
            }
            this.ready = false;
            this.isOver = false;
            this.leftReady = false;
            this.rightReady = false;
            this.leftScore = 0;
            this.rightScore = 0;
            this.stopBgSound = false;
            this.removeAnimate('leftWinBox');
            this.removeAnimate('rightWinBox');
            this.gameStart();
        },
        draw() {
            if (this.ready && !this.isOver) {
                this.drawScore();
            }
        },

        drawLoading (percent) {
            if (!sprites.loading) return;
            this.degree = parseInt(3.6 * percent);
            let r = 20;
            let x = gapp.renderer.width / 2;
            let y = gapp.renderer.height / 2;
            let theta = Math.PI * (this.degree/180) ;
            let rx = x + r * Math.sin(theta);
            let ry = y - r * Math.cos(theta);
            sprites.loading.lineStyle(10, 0xffffff, 1);
            sprites.loading.beginFill(0xffffff, 1);
            sprites.loading.lineTo(rx, ry);

            sprites.loadingText.text = Math.round(percent) + '%';
        },

        drawScore () {
            sprites.bloodLeft.width = this.leftScore;
            sprites.bloodRight.width = this.rightScore;
            sprites.scoreTextLeft.text = this.leftScore;
            sprites.scoreTextRight.text = this.rightScore;
        },

        createSprite (name, opts, container) {
            if(sprites[name]) {
                sprites[name].visible = true
                sprites[name].alpha = 1
                return sprites[name];
            }
            var sprite = new PIXI.Sprite(opts.texture);
            sprite.anchor.set(0);
            sprite.width = opts.width;
            sprite.height = opts.height;
            sprite.x = opts.x;
            sprite.y = opts.y;
            sprite.interactive = opts.interactive || false;
            sprite.buttonMode = opts.buttonMode || false;
            sprite.alpha = opts.alpha === undefined ? 1 : opts.alpha;
            if(container){
                container.addChild(sprite);
            } else {
                gapp.stage.addChild(sprite);
            }
            sprites[name] = sprite;
            return sprite;
        },
        createText (name, txt, opts, container) {
            if(sprites[name]) {
                sprites[name].visible = true
                sprites[name].alpha = 1
                sprites[name].text = txt
                return sprites[name];
            }
            var text = new PIXI.Text(txt, {
                fontFamily : opts.fontFamily || 'Arial', 
                fontWeight: 'bold',
                fontSize: opts.fontSize || 24, 
                fontStyle: opts.fontStyle || 'normal',
                // fill: ['#ffffff', '#00ff99'],
                fill: ['#ffffff'],
                // stroke: '#4a1850',
                align : opts.align || 'center',
                // dropShadow: true,
                // dropShadowColor: '#333333',
                // dropShadowBlur: 2,
                // dropShadowAngle: Math.PI / 6,
                // dropShadowDistance: 4
            });
            text.x = opts.x;
            text.y = opts.y;
            if(container){
                container.addChild(text);
            } else {
                gapp.stage.addChild(text);
            }
            text.anchor.set(0.5, 0.5);
            sprites[name] = text;
            return text;
        },
        createMask (name, opts) {
            if(sprites[name]) {
                sprites[name].visible = true
                sprites[name].alpha = 1
                return sprites[name];
            }
            const mask = new PIXI.Graphics();
            mask.beginFill(opts.color || 0x000000, opts.alpha)
            .drawRect(0, 0, gapp.renderer.width, gapp.renderer.height);
            sprites[name] = mask;
            gapp.stage.addChild(mask);
            return mask;
        },
        addAnimate (name, sprite, attr, from, to, duration, done, reverse, loop) {
            animations[name] = { sprite, attr, from, to, duration, done, reverse, loop };
            animations[name].status = 'ready';
        },
        rerunAnimate (name) {
            animations[name].status = 'ready';
        },
        removeAnimate (name) {
            animations[name] = null;
            delete animations[name];
        },
        runAnimation () {
            for(let name in  animations){
                let anim = animations[name];
                if(anim.status == 'ready' ){
                    anim.startTime = Date.now();
                    this.setAttribute(anim.sprite, anim.attr, anim.from)
                    anim.status = 'running'
                } else if(anim.status == 'running') {
                    let delta = Date.now() - anim.startTime;
                    if(delta >= anim.duration){
                        anim.status = 'done';
                        this.setAttribute(anim.sprite, anim.attr, anim.to)
                        if(anim.reverse){
                            this.setAttribute(anim.sprite, anim.attr, anim.from)
                        }
                        if(anim.loop){
                            let temp = anim.from;
                            anim.from = anim.to;
                            anim.to = temp;
                            anim.status = 'ready';
                            return;
                        }
                        if(anim.done) anim.done();
                    } else {
                        let dist = this.caculateValue(anim.from, anim.to, anim.duration, delta);
                        this.setAttribute(anim.sprite, anim.attr, dist)
                    }
                }
            }
        },
        setAttribute (sprite, attr, value) {
            if(!sprite) return;
            let attrArray = attr, valueAttr = value;
            if(!Array.isArray(attr)){
                attrArray = [attr];
                valueAttr = [value];
            }
            for (let i = 0, len = attrArray.length; i < len; i++) {
                let item = attrArray[i];
                switch(item){
                    case 'scale':
                        sprite[item] = {x: valueAttr[i], y: valueAttr[i]};
                    break;
                    default:
                        sprite[item] = valueAttr[i];
                    break;
                }
            }
        },
        caculateValue (from, to, duration, delta) {
            let fromArray = from; 
            let toArray = to;
            if(!Array.isArray(from)){
                fromArray = [from];
                toArray = [to];
            }
            let dist = [];
            for (let i = 0, len = fromArray.length; i < len; i++) {
                let item = fromArray[i];
                dist.push(item + (toArray[i] - item) * (delta / duration))
            }
            return dist;
        },
        toVW (num) {
            let w = Math.min(gapp.renderer.width, gapp.renderer.height);
            return Math.round(num * w / 375) 
            // return num;
        },
        doShare () {
            let me = this;
            if (window.WMApp) {
                let params = {};
                let pinfo = {
                    'imageUrl': shareInfo.image,          // 图片
                    'title': shareInfo.title,             // 分享标题
                    'description': shareInfo.description, // 分享描述
                    'linkUrl': shareInfo.url, // 链接
                    'shareType': 0 // 0表示链接分享
                };
                let weixinInfo = Object.assign(pinfo, {linkUrl: shareInfo.url + '&from=weixin'});
                params.WXTimelineShare = weixinInfo;
                params.WXSessionShare = pinfo;
                params.TextCopyShare = pinfo;
                params.WeiboShare = pinfo;
                params.QQZoneShare = pinfo;
                params.QQSessionShare = pinfo;
                window.WMApp.share.universalShare(params);
            } else if (window.BNJS) {
                let pfs = ['weixin_timeline', 'weixin_session', 'copylink', 'sinaweibo', 'qq_zone', 'qq_friend'];
                window.BNJS.ui.share({
                    title: shareInfo.title,
                    content: shareInfo.description,
                    imgUrl: shareInfo.image,
                    platforms: pfs,
                    url: shareInfo.url,
                    onSuccess: function () {
                    },
                    onFail: function () {
                    }
                });
            } else if(me.isWeixin()){
                this.showWeixinShare = true;
            }
            this.newSak({
                daSrc: 'share.click',
                daAct: 'click',
            });
        },
        hideMask () {
            this.showWeixinShare = false;
        },
        playBgSound () {
            if(sounds.bgSound && !this.stopBgSound){
                if(!sounds.bgSound.paused){
                    sounds.bgSound.play();
                }
            }
        },
        setWeixinShare() {
            let me = this;
            if(me.isWeixin()){
                me.get({
                    url: '/fly/h5/rest/getwxtoken',
                    param: {url: location.href}
                }).then( data => {
                    if(data.error_no == 0){
                        me.res = data.result;
                        if(window._wxReady){
                            setShare();
                        } else {
                            window._setShare = setShare;
                        }
                    }
                });
            }
            function setShare(){
                window.setShareInfo({
                    title:  shareInfo.title,
                    summary: shareInfo.description,
                    url: shareInfo.url + '&from=weixin',
                    pic: shareInfo.image,
                    WXconfig: {
                        swapTitleInWX: false,
                        appId: me.res.appId,
                        timestamp: me.res.timestamp,
                        nonceStr: me.res.nonceStr,
                        signature: me.res.signature
                    }
                });
            }
        },
    },
    mounted () {

        this.$refs.gameBox.style.width = window.innerHeight + 'px';
        this.$refs.gameBox.style.height = window.innerWidth + 'px';
        this.initGame()

        // window.addEventListener('resize', (e) => {
        //     this.screenDetect();
        // })
        // window.addEventListener("orientationchange", (e) => {
        //     if(window.orientation == 180 || window.orientation==0){ 
        //         this.isVirtical = true;
        //     }
        //     if(window.orientation == 90 || window.orientation == -90){
        //         this.isVirtical = false;         
        //     }
        //     if(this.isVirtical){
        //         this.initGame()
        //     }
        // });
        shareInfo.title = '独乐乐不如粽乐乐，南北粽子大比拼马上挑战';
        shareInfo.description = '动动手指，尽情放粽';
        this.setWeixinShare();
    }
}
</script>

<style lang="less-loader">
.game-app {
    width: 100%;
    background: url(https://img.waimai.baidu.com/pb/533d6a4b7eb1c078fdcb843ee0faf8ca86@q_80);
    background-size: 100% 100%;
    transform: rotate(90deg) translateX(-375px);
    transform-origin: left bottom;

    .screen-warn{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 300;
        font-size: 0;
        background: url(http://img.waimai.baidu.com/pb/3ff5385afdb35824b19006968de6c85dee@q_80,w_750);
        background-size: 100% 100%;
    }
    .weixin-layer{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: right;
        background-color: rgba(0,0,0, 0.8);
    }
}

</style>
