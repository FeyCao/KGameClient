//var gMainMenusSceneInst;

var MainMenuScene =SceneBase.extend(
{
	klineScene:null,

    userId:null,
    deviceId:null,
    source:null,

	backgroundLayer:null,
	backgroundSprite:null,
    touxiangSprite:null,
	//praticeButton:null,
	//configButton:null,
	
	userNameLabel:null,				//自己的名字
	selfScoreLabel:null,			//自己的分数
   // "winOfMatchForOne":0,"sumOfMatchForOne":2,"winOfMatchForMore":0,"sumOfMatchForMore":0,"gainCumulation":0.0,"sumOfAllMatch":2}

    winOfMatchForOne:null,
    sumOfMatchForOne:null,
    winOfMatchForMore:null,
    gainCumulation:null,
    sumOfAllMatch:null,
    renjizhanLabel:null,


	firstMode:null,
	secondMode:null,
	thirdMode:null,
	fourthMode:null,

    klineScene:null,
    loadTime:null,
	//tabBarSelectedSprite:null,
    ctor: function ()
    {
        this._super();
        this.backgroundLayer=null;
        this.backgroundSprite=null;
        this.winOfMatchForOne=null;
        this.sumOfMatchForOne=null;
        this.winOfMatchForMore=null;
        this.gainCumulation=null;
        this.sumOfAllMatch=null;
        this.renjizhanLabel=null;

        this.firstMode=null;
        this.secondMode=null;


        this.klineScene=null;
    },
	onEnter:function () 
	{
		this._super();
		//gMainMenusSceneInst=this;
		
		var size = cc.director.getWinSize();
		
		var fXScale = size.width/1280;
		var fYScale = size.height/720;
        var pButtonY = 520;
        var pButtonScale = cc.p(30*fXScale,55*fYScale);
		var self=this;
        console.log("fXScale="+fXScale);
		console.log("fYScale="+fYScale);
		//先入队等待
		//"res/mainMenu_bg.png","res/btn_control.png","res/btn_zhanji.png","res/btn_paihang.png","res/btn_help.png"，"res/btn_model1_u.png","res/btn_model1_d.png"，"res/btn_model2_u.png","res/btn_model2_d.png"，"res/btn_model3_u.png","res/btn_model3_d.png"，"res/btn_model4_u.png","res/btn_model4_d.png"
		this.backgroundLayer=new cc.Layer();
		this.addChild(this.backgroundLayer, 1);
		
		this.backgroundSprite=cc.Sprite.create("res/mainMenu_bg.png");
		this.backgroundSprite.setScale(fXScale,fYScale);
		this.backgroundSprite.setPosition(size.width/2,size.height/2);

        this.touxiangSprite = cc.Sprite.create("res/touxiang.png");


        if(this.renjizhanLabel==null)
        {
            this.renjizhanLabel=cc.LabelTTF.create("人机战：", "Arial",15);
            //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
            this.renjizhanLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.renjizhanLabel.setAnchorPoint(0,0.5);
            this.renjizhanLabel.setPosition(cc.p(450*fXScale,pButtonY*fYScale));
            this.backgroundLayer.addChild(this.renjizhanLabel,5);
        }

		
		this.zhanjiButton=new Button("res/btn_zhanji.png");
        this.zhanjiButton.setScale(fXScale,fYScale);
		this.zhanjiButton.setPosition(cc.p(780*fXScale,pButtonY*fYScale));

		this.zhanjiButton.setClickEvent(function(){
            console.log("zhanjiButton ClickEvent");
			self.zhanji();
		});
         this.zhanjiLabel=cc.LabelTTF.create("战绩", "Arial",15);
		 //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
		 this.zhanjiLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		 this.zhanjiLabel.setAnchorPoint(0,0.5);
		 this.zhanjiLabel.setPosition(cc.pSub(cc.p(780*fXScale,pButtonY*fYScale),pButtonScale));
        this.backgroundLayer.addChild(this.zhanjiLabel,5);


		this.paimingButton=new Button("res/btn_paihang.png");
        this.paimingButton.setScale(fXScale,fYScale);
		this.paimingButton.setPosition(cc.p(890*fXScale,pButtonY*fYScale));
		this.paimingButton.setClickEvent(function(){
			//self.paiming();
		});
		 this.paimingLabel=cc.LabelTTF.create("排名", "Arial", 15);
		 //this.paimingLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
		 this.paimingLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		 this.paimingLabel.setAnchorPoint(0,0.5);
		 this.paimingLabel.setPosition(cc.pSub(cc.p(890*fXScale,pButtonY*fYScale),pButtonScale));
		 this.addChild(this.paimingLabel,5); 
		
		this.helpButton=new Button("res/btn_help.png");
        this.helpButton.setScale(fXScale,fYScale);
		this.helpButton.setPosition(cc.p(1000*fXScale,pButtonY*fYScale));
		this.helpButton.setClickEvent(function(){
			//self.help();
		});
		 this.helpLabel=cc.LabelTTF.create("帮助", "Arial", 15);
		 //this.helpLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
		 this.helpLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		 this.helpLabel.setAnchorPoint(0,0.5);
		 this.helpLabel.setPosition(cc.pSub(cc.p(1000*fXScale,pButtonY*fYScale),pButtonScale));
        this.backgroundLayer.addChild(this.helpLabel,5);
		
		this.configButton=new Button("res/btn_control.png");
        this.configButton.setScale(fXScale,fYScale);
		this.configButton.setPosition(cc.p(1110*fXScale,pButtonY*fYScale));
		this.configButton.setClickEvent(function(){
			//self.config();
		});
		 this.configLabel=cc.LabelTTF.create("设置", "Arial", 15);
		 //this.configLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
		 this.configLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		 this.configLabel.setAnchorPoint(0,0.5);
		 this.configLabel.setPosition(cc.pSub(cc.p(1110*fXScale,pButtonY*fYScale),pButtonScale));
        this.backgroundLayer.addChild(this.configLabel,5);
		 
        var pModeXdistance = 300;
		var pModeY = 240;

		//this.firstMode=new CheckButton("res/btn_mode1_u.png","res/btn_mode1_u.png");
        //this.firstMode.setScale(fXScale,fYScale);
		//this.firstMode.setPosition(cc.p(190*fXScale,pModeY*fYScale));
		//this.firstMode.setClickEvent(function(){
         //   console.log("zhanjiButton ClickEvent");
		//	//self.firstModeChanged();
		//});

        this.firstMode=new Button("res/btn_mode1_u.png");
        this.firstMode.setScale(fXScale,fYScale);
        this.firstMode.setPosition(cc.p(190*fXScale,pModeY*fYScale));
        this.firstMode.setClickEvent(function(){
            console.log("firstMode ClickEvent");
            self.firstModeChanged();
        });
		
		this.secondMode=new CheckButton("res/btn_mode2_u.png","res/btn_mode2_d.png");
        this.secondMode.setScale(fXScale,fYScale);
		this.secondMode.setPosition(cc.p((190+pModeXdistance)*fXScale,pModeY*fYScale));
//		this.secondMode.setClickEvent(function(){
//			self.secondModeChanged();
//		});
		
		this.thirdMode=new CheckButton("res/btn_mode3_u.png","res/btn_mode3_d.png");
        this.thirdMode.setScale(fXScale,fYScale);
		this.thirdMode.setPosition(cc.p((190+2*pModeXdistance)*fXScale,pModeY*fYScale));
//		this.thirdMode.setClickEvent(function(){
//			self.thirdModeChanged();
//		});
		
		this.fourthMode=new CheckButton("res/btn_mode4_u.png","res/btn_mode4_d.png");
        this.fourthMode.setScale(fXScale,fYScale);
		this.fourthMode.setPosition(cc.p((190+3*pModeXdistance)*fXScale,pModeY*fYScale));
//		this.fourthMode.setClickEvent(function(){
//			self.fourthModeChanged();
//		});
		
		this.backgroundLayer.addChild(this.backgroundSprite, 1);		
		this.backgroundLayer.addChild(this.zhanjiButton, 2);
        this.backgroundLayer.addChild(this.configButton, 2);
        this.backgroundLayer.addChild(this.paimingButton, 2);
        this.backgroundLayer.addChild(this.helpButton, 2);
		this.backgroundLayer.addChild(this.firstMode, 2);
		this.backgroundLayer.addChild(this.secondMode, 2);
		this.backgroundLayer.addChild(this.thirdMode, 2);
		this.backgroundLayer.addChild(this.fourthMode, 2);

        //this.backgroundLayer.setScale(0.8);
		//this.firstMode.setChecked(true);
        //this.firstMode.setDisabled(true)
        loadTime=new Date().getTime();
	},

    setMainScenedata:function(jsonText)
    {
        var data=JSON.parse(jsonText);
        console.log("jsonText parse over");

        this.winOfMatchForOne=data["winOfMatchForOne"];
        this.sumOfMatchForOne=data["sumOfMatchForOne"];
        this.winOfMatchForMore=data["winOfMatchForMore"];
        this.gainCumulation=data["gainCumulation"];
        this.sumOfAllMatch=data["sumOfAllMatch"];

        if(this.renjizhanLabel==null)
        {
            this.renjizhanLabel=cc.LabelTTF.create("人机战：", "Arial",15);
            //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
            this.renjizhanLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.renjizhanLabel.setAnchorPoint(0,0.5);
            this.renjizhanLabel.setPosition(cc.p(450*fXScale,pButtonY*fYScale));
            this.backgroundLayer.addChild(this.renjizhanLabel,5);
        }
        if(this.renjizhanLabel!=null)
        {
            this.renjizhanLabel.setString("人机战："+this.winOfMatchForOne+"/"+this.sumOfMatchForOne);
        }
        //this.onShareklinedata(data);
    },
    moveTofirstMode:function()
    {

        var self=this;
        var endTime=new Date().getTime();
        if(endTime-loadTime>5000)
        {
            this.firstModeChanged();
        }
        else
        {
            setTimeout(function(){self.firstModeChanged(),5000-(endTime-loadTime);});
        }
    },

    firstModeChanged:function()
    {
        console.log("Waiting for .firstModeChanged"+this.secondMode.isSelected);
        console.log("准备切换到KGameScene下一个场景");
        this.stopProgress();
        var self =this;
        if(self.klineScene==null)
        {
            self.klineScene=new KLineScene();
        }

        //self.klineScene.onEnteredFunction=function(){
        //    self.klineScene.showProgress();
        //};
        gSocketConn.RegisterEvent("onmessage",self.klineScene.messageCallBack);
        gSocketConn.BeginMatch(0);
        //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
        cc.director.runScene(self.klineScene);
        console.log("切换KGameScene场景调用完毕");
        console.log("Waiting for .firstModeChanged end");
    },

	secondModeChanged:function()
	{
		if(this.secondMode.isSelected==true)
		{
			console.log("Waiting for secondModeChanged");
		}
	},
	
	thirdModeChanged:function()
	{
		if(this.thirdMode.isSelected==true)
		{
			console.log("Waiting for thirdModeChanged");
		}
	},
	
	fourthModeChanged:function()
	{
		if(this.fourthMode.isSelected==true)
		{
			console.log("Waiting for fourthMode...");
		}
	},

	zhanji:function()
	{
        var userId=GetQueryString("userId");
		gSocketConn.SendZhanjiMessage(userId);
        console.log("Waiting for zhanji...");
	},

    paiming:function()
    {

    },

	config:function()
	{
		
	},
    help:function()
    {

    },
	
	messageCallBack:function(message)
	{
		var self=this;
		var packet=Packet.prototype.Parse(message);
        console.log("messageCallBack mainScene message callback packet="+packet.msgType+" content="+packet.content);
		if(packet==null) return;
		if(packet.msgType=="P")
        {
            self.setMainScenedata(packet.content);
        }

		else if(packet.msgType=="5")
		{
            self.klineScene=new KLineScene();
			//接收到了K线数据的消息
			gSocketConn.UnRegisterEvent("onmessage",self.messageCallBack);
			if(self.klineScene!=null)
			{
				console.log("call get kline data");
				self.klineScene.getklinedata(packet.content);
				console.log("get kline passed");
			}
		}
        else if(packet.msgType=="4")
        {
            self.klineScene=new KLineScene();
            //接收到了K线数据的消息
            gSocketConn.UnRegisterEvent("onmessage",self.messageCallBack);
            if(self.klineScene!=null)
            {
                console.log("call get kline data");
                self.klineScene.getklinedata(packet.content);
                console.log("get kline passed");
            }
        }
		else if(packet.msgType=="H")
		{
			self.klineScene=new KLineScene();
			//接收到了分享的K线数据的消息
			gSocketConn.UnRegisterEvent("onmessage",self.messageCallBack);
			if(self.klineScene!=null)
			{
				console.log("call get kline data");
				self.klineScene.getShareKlinedata(packet.content);
				console.log("get kline passed");
			}
		}
	},



	//moveToNextScene:function()
	//{
	//	cc.director.runScene(this.klineScene);
	//	console.log("run scene called");
	//}

});