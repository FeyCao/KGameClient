// JavaScript Document
function Packet()
{
	this.msgType="";
	this.content="";
}

Packet.prototype.Parse=function(message)
{
	var fields=message.split("|");
	if(fields.length<2) return null;
	var packetReutrn=new Packet();
	packetReutrn.msgType=fields[0];
	packetReutrn.content=fields[1];
	return packetReutrn;
}

//var wsURL = 'ws://222.66.97.203:5003/';//公网测试
//var wsURL = 'ws://222.66.97.203:5003/Kgamefeng/websocket';//晓峰环境
//var wsURL = 'ws://180.169.108.231:5003/';//生产环境
//var wsURL = 'ws://192.168.16.250:8484/';//测试
//var wsURL = 'ws://192.168.16.250:8384/';//调试
//var wsURL = 'ws://192.168.16.250:5180/Kgamefeng/websocket';//晓峰环境
var wsURL = 'ws://192.168.16.145:8080/Kgamefeng/websocket';//晓峰环境
SOURCE_DHJK = "DHJK";     //东航金控APP
SOURCE_ZSQQ = "ZSQQ";     //掌上全球APP
SOURCE_ZZFW = "ZZFW";     //增值服务中心网站
SOURCE_TEST = "TEST";     //东航金控APP
SOURCE_WEB = "SWEB";      //通过web访问

