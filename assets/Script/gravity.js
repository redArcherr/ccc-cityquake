// 重力测试
import global from './global';
cc.Class({
    extends: cc.Component,

    properties: {
        //result:cc.Label,
        //lab:cc.Label,
        _time: 0,//计时器
        _shakeX:0,//当前帧角度x
        _shakeY:0,//当前帧角度y
        _state:false,//5s开关
        _lastX:0,//上一阵角度x
        _lastY:0,//上一帧角度y
        _count:0//计数
    },

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        //cc.systemEvent.setAccelerometerEnabled(true);
        //this.openDev();
    },

    openDev:function(){
        this._count=0;
        this._time=0;
        cc.systemEvent.setAccelerometerEnabled(true);
        this._state=true;
    },
    closeDev:function(){
        cc.systemEvent.setAccelerometerEnabled(false);
    },

    onDeviceMotionEvent (event) {
        this._shakeX= Math.abs(event.acc.x*100)-Math.abs(this._lastX);
        this._shakeY= Math.abs(event.acc.y*100)-Math.abs(this._lastY);
        if(Math.abs(this._shakeX)>30 || Math.abs(this._shakeY)>30){
            if(this._state){
                this._count++;
            }
        }
        //this.lab.string="c:"+this._count+" x:"+parseInt(Math.abs(this._shakeX))+" y:"+parseInt(Math.abs(this._shakeY));
        this._lastX=event.acc.x*100;
        this._lastY=event.acc.y*100;
    },
    /*//结果测试
    result:function(){
        if(this._count<5){
            //this.result.string="0-5级地震";
        }else if(this._count>=5 && this._count<9){
            //this.result.string="6级地震";
        }else if(this._count>=9 && this._count<13){
            //this.result.string="7级地震";
        }else if(this._count>=13 && this._count<17){
            //this.result.string="8级地震";
        }else if(this._count>=17 && this._count<20){
            //this.result.string="9级地震";
        }else if(this._count>=20 && this._count<22){
            //this.result.string="10级地震";
        }else if(this._count>=22){
            //this.result.string="11级地震";
        }
    },*/
    update (dt) {
        if(this._state){ 
            this._time +=dt;
            if(this._time>5){
                cc.log("结束");
                this._state=false;
                global.event.fire("shake",this._count);
                //this.result();
            }
        }
        
    }

});
