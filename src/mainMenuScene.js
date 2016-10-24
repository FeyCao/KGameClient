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
    zhanjiInfoLayer:null,
    loadTime:null,
    onEnteredFunction:null,	//OnEnter调用结束后的Function

    ctor: function ()
    {
        this._super();
        this.backgroundLayer=null;
        this.backgroundSprite=null;
        this.infoLabel=null;
        this.winOneLabel=null;
        this.sumOneLabel=null;
        //this.winOfMatchForMore=null;
        //this.gainCumulation=null;
        //this.sumOfAllMatch=null;
        this.renjizhanLabel=null;

        this.firstMode=null;
        this.secondMode=null;


        this.zhanjiInfoLayer=null;
        this.klineScene=null;
        this.onEnteredFunction=null;
    },
	onEnter:function () 
	{
		this._super();
        gMainMenuScene=this;
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

        this.touxiangSprite.setScale(fXScale,fYScale);
        this.touxiangSprite.setPosition(cc.p(180*fXScale,500*fYScale));


        self.infoLabel=cc.LabelTTF.create("练习场:", "Arial",15);
        //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        self.infoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        self.infoLabel.setAnchorPoint(0,0.5);
        self.infoLabel.setPosition(cc.p(450*fXScale,pButtonY*fYScale));
        self.backgroundLayer.addChild(self.infoLabel,5);

        self.winOneLabel= cc.LabelTTF.create("", "Arial",15);
        self.winOneLabel.setAnchorPoint(0,0.5);
        self.winOneLabel.setColor(YellowColor);
        self.winOneLabel.setPosition(cc.pAdd(self.infoLabel.getPosition(),cc.p(self.infoLabel.getContentSize().width,0)));
        this.backgroundLayer.addChild(self.winOneLabel,5);
        self.sumOneLabel= cc.LabelTTF.create("", "Arial",15);
        self.sumOneLabel.setAnchorPoint(0,0.5);
        self.sumOneLabel.setColor(WhiteColor);
        self.sumOneLabel.setPosition(cc.pAdd(self.winOneLabel.getPosition(),cc.p(self.winOneLabel.getContentSize().width,0)));
        this.backgroundLayer.addChild(self.sumOneLabel,5);
        //设置对战信息时数据可能还没取到
        this.setDataforInfo();

        this.setButtonInfo();

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
        this.backgroundLayer.addChild(this.touxiangSprite,2);
		this.backgroundLayer.addChild(this.zhanjiButton, 2);
        this.backgroundLayer.addChild(this.configButton, 2);
        this.backgroundLayer.addChild(this.paimingButton, 2);
        this.backgroundLayer.addChild(this.helpButton, 2);
		this.backgroundLayer.addChild(this.firstMode, 2);
		this.backgroundLayer.addChild(this.secondMode, 2);
		this.backgroundLayer.addChild(this.thirdMode, 2);
		this.backgroundLayer.addChild(this.fourthMode, 2);



        this.btnHome=new Button("res/home.png");
        this.btnHome.setPosition(cc.p(40*fXScale,size.height-35*fYScale));
        this.btnHome.setScale(fXScale*0.8,fYScale*0.8);
        //this.btnHome.setScale(0.8);
        this.btnHome.setClickEvent(function(){self.toHome();});
        this.addChild(this.btnHome,123);
        //this.backgroundLayer.setScale(0.8);
		//this.firstMode.setChecked(true);
        //this.firstMode.setDisabled(true)
        loadTime=new Date().getTime();
        if(this.onEnteredFunction!=null)
        {
            this.onEnteredFunction();
        }
	},

    
    moveTofirstMode:function()
    {

        var self=gMainMenuScene;
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
        var self =gMainMenuScene;
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
        console.log("Waiting for zhanji...");
        var userId=GetQueryString("userId");
		gSocketConn.SendZhanjiMessage(userId,0);
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
    setButtonInfo:function()
    {
        var self =this;
        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;
        var pButtonY = 520;
        var pButtonScale = cc.p(28*fXScale,60*fYScale);

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

        this.paimingButton.setDisabled(true);
        this.helpButton.setDisabled(true);
        this.configButton.setDisabled(true);
    },
    setDataforInfo:function()
    {

        var self =this;

        if(userInfo.winOfMatchForOne!=null)
        {
            cc.log("setDataforInfoW="+userInfo.winOfMatchForOne);
            self.winOneLabel.setPosition(cc.pAdd(self.infoLabel.getPosition(),cc.p(self.infoLabel.getContentSize().width,0)));
            self.winOneLabel.setString(userInfo.winOfMatchForOne);

            cc.log("setDataforInfoS="+ userInfo.sumOfMatchForOne);
            self.sumOneLabel.setString("/"+userInfo.sumOfMatchForOne);
            self.sumOneLabel.setPosition(cc.pAdd(self.winOneLabel.getPosition(),cc.p(self.winOneLabel.getContentSize().width,0)));
        }

    },
    setMainMenuScenedata:function(jsonText)
    {
        var data=JSON.parse(jsonText);
        console.log("jsonText parse over");

        userInfo.winOfMatchForOne=data["winOfMatchForOne"];
        userInfo.sumOfMatchForOne=data["sumOfMatchForOne"];
        userInfo.winOfMatchForMore=data["winOfMatchForMore"];
        userInfo.gainCumulation=data["gainCumulation"];
        userInfo.sumOfAllMatch=data["sumOfAllMatch"];

        this.setDataforInfo();
        //this.onShareklinedata(data);
    },
	messageCallBack:function(message)
	{
		var self=gMainMenuScene;
		var packet=Packet.prototype.Parse(message);
        console.log("messageCallBack mainScene message callback packet="+packet.msgType+" content="+packet.content);
		if(packet==null) return;
        if(packet.msgType=="P")
        {
            //self.moveToNextScene();
            //接收到了K线数据的消息
            console.log("call get MainMenuScene data");
            //
            self.setMainMenuScenedata(packet.content);
            console.log("get MainMenuScene passed");

            self.stopProgress();
        }
        else if(packet.msgType=="Z")
        {
        //接收到战绩的数据
            self.showZhanjiInfo(packet.content);
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
            self.stopProgress();
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
            self.stopProgress();
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
            self.stopProgress();
		}
	},

    showZhanjiInfo:function(content)
    {
        console.log("showZhanjiInfo  visible = true");
        cc.log(content);
        var self=this;

        //"uid":"3434343770","totalCount":45,"winRate":0.0,"AvgGain":0.14939284434998082,"historyMatchList":[
        var data=JSON.parse(content);
        userInfo.userId = data["uid"];
        userInfo.totalCount=data["totalCount"];
        userInfo.winRate=data["winRate"];
        userInfo.AvgGain=data["AvgGain"];
        var historyMatchListData=data["historyMatchList"];
        console.log("historyMatchListData="+historyMatchListData);
        userInfo.MatchListData=[];
        for(var i=0;i<historyMatchListData.length;i++)
        {
            var matchData=historyMatchListData[i];
            cc.log("MatchListData.matchId="+matchData["matchId"]);
            userInfo.MatchListData.push(matchData);
            //this.klinedataMain.push({o:dailyData[5*i],x:dailyData[5*i+1],i:dailyData[5*i+2],c:dailyData[5*i+3],v:dailyData[5*i+4]});
            //this.MatchListData.push({matchId:matchData["matchId"],matchTime:matchData["matchId"],playerNum:matchData["matchId"],score:matchData["matchId"],uid:matchData["matchId"]});
        }



        if(this.zhanjiInfoLayer==null){
            this.zhanjiInfoLayer=new ZhanjiViewLayer();
            this.zhanjiInfoLayer.setVisible(false);
            this.zhanjiInfoLayer.setPosition(0,0);
            this.otherMessageTipLayer.addChild(this.zhanjiInfoLayer, 1,this.zhanjiInfoLayer.getTag());
            //this.zhanjiInfoLayer.applyParamsFromContent(content);
            //content的内容为:   总用户个数(假设为2)#用户名A#收益率A#得分A#用户名B#收益率B#得分B#品种名字#起始日期#终止日期
            this.zhanjiInfoLayer.closeCallBackFunction=function(){self.zhanjiInfoLayer_Close()};
            this.zhanjiInfoLayer.replayCallBackFunction=function(){self.matchEndInfoLayer_Replay()};
        }


        this.zhanjiInfoLayer.showLayer();
        this.pauseLowerLayer();

    },
    zhanjiInfoLayer_Close:function()
    {
        //关闭战绩界面
        this.zhanjiInfoLayer.hideLayer();
        this.resumeLowerLayer();
    },
    toHome:function()
    {
        //window.close();
        window.location.href="http://analyse.kiiik.com";
    },
	//moveToNextScene:function()
	//{
	//	cc.director.runScene(this.klineScene);
	//	console.log("run scene called");
	//}

});