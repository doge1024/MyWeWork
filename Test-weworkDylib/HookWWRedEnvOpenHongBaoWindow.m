//
//  HookWWRedEnvOpenHongBaoWindow.m
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/22.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HookFunction.h"


CHDeclareClass(WWRedEnvOpenHongBaoWindow)

// 红包window，自动打开红包
CHOptimizedMethod1(self, void, WWRedEnvOpenHongBaoWindow, setQyhbSubType, NSInteger, type){
    CHSuper1(WWRedEnvOpenHongBaoWindow, setQyhbSubType, type);
    id this = self;
    if ([this mHongbaoStatus] == 2) {
        UIButton *btn = [this mOpenBtn];
        [this performSelector:@selector(onOpenBtnClick:) withObject:btn];
    }
}

// 去掉动画
CHOptimizedMethod0(self, void, WWRedEnvOpenHongBaoWindow, startOpenHongbaoAnimation){
    return;
}

CHConstructor{
    CHLoadLateClass(WWRedEnvOpenHongBaoWindow);
    CHClassHook1(WWRedEnvOpenHongBaoWindow, setQyhbSubType);
    
    CHLoadLateClass(WWRedEnvOpenHongBaoWindow);
    CHClassHook0(WWRedEnvOpenHongBaoWindow, startOpenHongbaoAnimation);
}

