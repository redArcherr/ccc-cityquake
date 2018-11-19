cc.Class({
    extends: cc.Component,

    properties: {
       bgm_audio:{
           default:null,
           type:cc.AudioClip
       }
    },

   onLoad:function(){
       cc.game.addPersistRootNode(this.node);
       this.bgm=cc.audioEngine.play(this.bgm_audio,true,1);   
   }
});