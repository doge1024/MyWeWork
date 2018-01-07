//  weibo: http://weibo.com/xiaoqing28
//  blog:  http://www.alonemonkey.com
//
//  Test_weworkDylib.m
//  Test-weworkDylib
//
//  Created by lzh on 2017/11/30.
//  Copyright (c) 2017年 lzh. All rights reserved.
//

#import "Test_weworkDylib.h"
#import <UIKit/UIKit.h>
#import "HookFunctionsAndPropertys.h"
#ifdef DEBUG
#import <CaptainHook/CaptainHook.h>
#import <Cycript/Cycript.h>
#import <FLEX/FLEX.h>
#endif

static __attribute__((constructor)) void entry(){

#ifdef DEBUG
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidFinishLaunchingNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        
        CYListenServer(6666);
        
        // show FLEX
        [[FLEXManager sharedManager] showExplorer];
    }];
#endif
}
