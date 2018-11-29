cc.Class({
    extends: cc.Component,

    properties: {
        levels:{
            default:[],
            type:cc.SpriteFrame
        },
        levelSprite:cc.Sprite,
        _time:0,
        _ctrl:false,
        resultContent:{
            default:null,
            type:cc.Node
        },
        resultbg:{
            default:[],
            type:cc.SpriteFrame
        }
    },

    onLoad () {
        this.node.scale=0.01;
        this.node.active = false;
        this.resultContent.active=false;
    },
    init:function(){
        this.node.scale=0.01;
        this.node.active = false;
    },

    openResult:function(data,house){
        this._ctrl=true;
        this.node.active = true;
        this.levelSprite.spriteFrame = this.levels[data];
        let scale = cc.scaleTo(1,1); 
        scale.easing(cc.easeBackOut());
        this.node.runAction(scale);
        //背景替换
        if(data>0){
            this.resultContent.active=true;
            let resultdb=cc.find("Canvas/resultContent/resultScroll");
            resultdb.getComponent(cc.Sprite).spriteFrame=this.resultbg[house];
            this.changeContent(house,data);
        } 
    },
    closeResult:function(){
        let scale = cc.scaleTo(0.6,0.01); 
        scale.easing(cc.easeSineInOut());
        let callback=cc.callFunc(this.callback,this);
        let sequence=cc.sequence(scale,callback);
        this.node.runAction(sequence);   
    },
    callback:function(){
        this.node.active = false;
    },
    changeContent:function(house,level){
        //内容替换
        let content=cc.find("Canvas/resultContent/resultScroll/view/content/sprite");
        //content.getComponent(Sprite).spriteFrame;
        cc.loader.loadRes("./txt-"+house+"-"+level, cc.SpriteFrame, function (err, spFrame) {
            if(err){
                cc.log(err);
            }else{
                content.getComponent(cc.Sprite).spriteFrame = spFrame; 
            }        
        });
    },

    update(dt){
        if(this._ctrl){
            this._time +=dt;
            if(this._time>4){
                this._time=0;
                this._ctrl=false;
                this.closeResult();
            }
        }   
    }
});
