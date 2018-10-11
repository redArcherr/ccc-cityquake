cc.Class({
    extends: cc.Component,

    properties: {
        levels:{
            default:[],
            type:cc.SpriteFrame
        },
        levelSprite:cc.Sprite,
        _time:0,
        _ctrl:false
    },

    onLoad () {
        this.node.scale=0.01;
        this.node.active = false;
    },
    init:function(){
        this.node.scale=0.01;
        this.node.active = false;
    },

    openResult:function(data){
        this._ctrl=true;
        this.node.active = true;
        this.levelSprite.spriteFrame = this.levels[data];
        let scale = cc.scaleTo(1,1); 
        scale.easing(cc.easeBackOut());
        this.node.runAction(scale);
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
