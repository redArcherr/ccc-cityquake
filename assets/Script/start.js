import global from './global';
cc.Class({
    extends: cc.Component,

    properties: {
        exPageView:{
            default:null,
            type:cc.Node
        }
    },
    onLoad:function(){
        global.gameState="loaded";
        this.exPageView.x=cc.winSize.x+1000;
        cc.director.preloadScene("game");
    },

    exButtonClick:function(){
        this.exPageView.x=0;
    },
    clButtonClick:function(){
        this.exPageView.x=cc.winSize.x+1000;
    },
    stButtonClick:function(){
        global.gameState="start";
        cc.director.loadScene("game");
    }
    
});
