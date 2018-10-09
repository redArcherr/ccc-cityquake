import global from './global';
cc.Class({
    extends: cc.Component,

    properties: {
        xz_scrollview:{//选址列表
            default:null,
            type:cc.Node
        },
        dj_scrollview:{//地基列表
            default:null,
            type:cc.Node
        },
        jz_scrollview:{//建筑列表
            default:null,
            type:cc.Node
        },
        xzSprite:cc.Node,
        djSprite:cc.Node,
        jzSprite:cc.Node,
        spriteFrames:{
            default:[],
            type:cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        this.gameState = "xz";//操作逻辑控制
        this.xz_scrollview.active=true;
        this.dj_scrollview.active=false;
        this.jz_scrollview.active=false;
        this.moveY=this.xz_scrollview.y;
    },

    enterClick:function(){
        let y=0;
        let move=cc.moveTo(0.3,cc.v2(0,this.moveY-this.xz_scrollview.height));
        if(this.gameState==="xz"){
            this.gameState = "dj";
            this.dj_scrollview.active=true;
            this.dj_scrollview.opacity=0;
            this.dj_scrollview.runAction(cc.fadeIn(0.5));
            this.xz_scrollview.runAction(move);
        }else if(this.gameState==="dj"){
            this.gameState = "jz";
            this.jz_scrollview.active=true;
            this.jz_scrollview.opacity=0;
            this.jz_scrollview.runAction(cc.fadeIn(0.5));
            this.dj_scrollview.runAction(move);
        }else if(this.gameState==="jz"){
            this.jz_scrollview.runAction(move);
        }
    },

    groundClick:function(event,customData){
        if(this.gameState==="xz"){
            cc.log("xz"+customData);
            this.xzSprite.getComponent(cc.Sprite).spriteFrame=this.spriteFrames[customData];
        }else if(this.gameState==="dj"){
            cc.log(3+customData);
            this.djSprite.getComponent(cc.Sprite).spriteFrame=this.spriteFrames[parseInt(customData)+3];
        }else if(this.gameState==="jz"){
            cc.log(6+customData);
            this.jzSprite.getComponent(cc.Sprite).spriteFrame=this.spriteFrames[parseInt(customData)+6];
        }
    }
});
