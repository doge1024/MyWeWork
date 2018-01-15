# 免越狱企业微信抢红包功能

写这个，主要是为了：认真工作的时候却错过了老板的红包，心里不爽😂

![wwk](./wework.gif)

### 使用

###### - 测试使用
1. 将脱壳后的企业微信ipa解压取得.app文件放到`Test-wework/TargetApp/wework.app`  
2. 选择自己的BundleID和证书  
3. 插上手机，`cmd+R`  
4. 聊天会话页面右上角有个开关，打开后，新消息如果是红包的话，会自动抢（默认打开）  

###### - 正式使用
1. 改为Release，编译`cmd+B`
2. 双击`LatestBuild/createIPA.command`，待进程完成后，文件夹下面会多一个ipa文件，拿去用吧
3. 如果需要使用原bundleid签名，将bundleid改为aaa [最新的MonkeyDev-wiki](https://github.com/AloneMonkey/MonkeyDev/wiki/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97)

### 效果
1. 自动打开红包
2. 因为本身就是聊天应用，程序在后台也是可以抢的
3. 仔细想了想应该不会封号，还能把你开除企业么？😏

### 注意
1. 本功能只能在聊天会话页面使用
2. 只能一个一个的抢红包
3. 里面涉及到一些C的函数，逆向接触时间有限，不能更深入和解决上面的问题，很遗憾，有时间会继续学习

### 感谢
1. 感谢 [MonkeyDev](https://github.com/AloneMonkey/MonkeyDev)，在没有越狱机的情况下还能简单的调试编写
2. 感谢同事的1分钱测试红包
3. 感谢各位小白鼠
