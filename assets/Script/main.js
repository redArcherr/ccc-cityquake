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
        xzSprite:cc.Node,//选址纹理
        djSprite:cc.Node,//地基纹理
        jzSprite:cc.Node,//建筑纹理
        choseNode:cc.Node,
        btnNode:cc.Node,
        resultBtn:cc.Node,
        shakeNode:cc.Node,
        desPage:cc.Node,
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
        //纹理初始化
        this.xzSprite.getComponent(cc.Sprite).spriteFrame=null;
        this.djSprite.getComponent(cc.Sprite).spriteFrame=null;
        this.jzSprite.getComponent(cc.Sprite).spriteFrame=null;
        //控制和选择组件初始化
        this.resultBtn.active=false;
        this.btnNode.active=false;
        this.btnNode.getChildByName("3s_tips").active=false;//隐藏摇一摇提示
        this.shakeNode.active=false;
        this.choseNode.x=1000;
        //注册接收数据
        global.event.on("shake",this.shakeResult.bind(this));
        //注册页
        this.desPage.active=false;
    },
    //下一步按钮
    enterClick:function(){
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
            this.btnNode.getChildByName("3s_tips").active=true;//显示摇一摇提示
        }else if(this.gameState==="jz"){
            this.jz_scrollview.runAction(move);
            //摇一摇界面,打开重力
            this.shakeNode.active=true;
            let shakeLogo=cc.find("Canvas/shakeNode/shake_logo");
            let shakeAnim= shakeLogo.getComponent(cc.Animation);
            shakeAnim.play("shake");
            this.shakeNode.getComponent("gravity").openDev();
        }
        //按钮和选择框消失
        this.btnNode.active=false;
        this.choseNode.x=1000;
    },
    //选择元素
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
        //选择框位置
        let chosePos = this.node.convertToNodeSpaceAR(event.target.position);
        this.choseNode.position = chosePos;
        this.choseNode.x=this.choseNode.x+10;
        this.choseNode.y=this.choseNode.y+10;
        //按钮出现
        this.btnNode.active=true;
    },
    //取消按钮（暂时不用）
    cancelClick:function(){
        if(this.gameState==="xz"){
            this.xzSprite.getComponent(cc.Sprite).spriteFrame=null;     
        }else if(this.gameState==="dj"){
            this.djSprite.getComponent(cc.Sprite).spriteFrame=null;   
        }else if(this.gameState==="jz"){
            this.jzSprite.getComponent(cc.Sprite).spriteFrame=null;
        }
        this.btnNode.active=false;
    },
    //摇一摇结果
    shakeResult:function(data){
        let resultNode=cc.find("Canvas/resultNode");
        if(data<5){
            resultNode.getComponent("shake-level").openResult(0);
        }else if(data>=5 && data<9){
            resultNode.getComponent("shake-level").openResult(1);
        }else if(data>=9 && data<13){
            resultNode.getComponent("shake-level").openResult(2);
        }else if(data>=13 && data<17){
            resultNode.getComponent("shake-level").openResult(3);
        }else if(data>=17 && data<20){
            resultNode.getComponent("shake-level").openResult(4);
        }else if(data>=20 && data<22){
            resultNode.getComponent("shake-level").openResult(5);
        }else if(data>=22){
            resultNode.getComponent("shake-level").openResult(6);
        }
        if(this.shakeNode){
            this.shakeNode.getComponent("gravity").closeDev();
            this.shakeNode.active=false;
            this.resultBtn.active=true;
        }
    },
    //重新开始
    restart:function(){
        cc.director.loadScene("game");
    },
    openDesPage:function(){
        this.desPage.active=true;
    },
    closeDesPage:function(){
        this.desPage.active=false;
    }
});
