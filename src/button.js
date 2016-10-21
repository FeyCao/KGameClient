// JavaScript Document
Button=cc.Sprite.extend({
	clickevent:null,		//按钮按下的回调函数
	clickeventparam:null,	//回调函数的参数
	listener:null,
	isPressedDown:false,
	
	ctor: function (fileName, rect, rotated)
	{
		this._super(fileName, rect, rotated);

	},
	
	setClickEvent:function(clickevent)
	{
		this.clickevent=clickevent;
		
		var self=this;
		this.listener= cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
			swallowTouches: false,
			//onTouchBegan event callback function						
			onTouchBegan: function (touch, event) {	
				if(self.isVisible()==true)
				{
					//var nextSceneM=new NextScene();
					var target = event.getCurrentTarget();	
					var touchLocation=touch.getLocation();
					//Get the position of the current point relative to the button
					var locationInNode = target.convertToNodeSpace(touchLocation);	
					var s = target.getContentSize();
					var rect = cc.rect(0, 0, s.width, s.height);
					//Check the click area
					if (cc.rectContainsPoint(rect, locationInNode)) 
					{		
						console.log("onTouchBegan");
						self.shrink();
						this.isPressedDown=true;
					}
					else
					{
	
					}
				}
				return true;
			},
			
			onTouchEnded: function (touch, event) {	
				if(self.isVisible()==true)
				{
					//var nextSceneM=new NextScene();
					var target = event.getCurrentTarget();	
					var touchLocation=touch.getLocation();
					//Get the position of the current point relative to the button
					var locationInNode = target.convertToNodeSpace(touchLocation);	
					var s = target.getContentSize();
					var rect = cc.rect(0, 0, s.width, s.height);
					if(this.isPressedDown==true)
					{
						console.log("onTouchEnded");
						self.unshrink();
						if(self.clickevent!=null)
						{
							self.clickevent();
						}
						this.isPressedDown=false;
					}
					//Check the click area
					//if (cc.rectContainsPoint(rect, locationInNode)) 
					//{		
					//	console.log("onTouchEnded");
					//	self.unshrink();
					//	if(self.clickevent!=null)
					//	{
					//		self.clickevent();
					//	}
					//}
					//else
					//{
					//	console.log("doesn't contain "+self.__instanceId);
					//}
				}
				
			},
		});
		
		cc.eventManager.addListener(this.listener, this);
	},
	
	///当按钮按下去的时候，缩小
	shrink:function()
	{
        var self=this;
		var actionNormal=new cc.ScaleTo(0.032,self.scale*0.8,self.scale*0.8);
		this.runAction(actionNormal);
	},
	
	///当按钮弹起来的时候，放大
	unshrink:function()
	{
        var self=this;
        var actionNormal=new cc.ScaleTo(0.032,self.scale*1.25,self.scale*1.25);
		this.runAction(actionNormal);
	},
});