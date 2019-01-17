//  weibo: http://weibo.com/xiaoqing28
//  blog:  http://www.alonemonkey.com
//
//  MyWeWorkDylib.m
//  MyWeWorkDylib
//
//  Created by lzh on 2018/2/11.
//  Copyright (c) 2018年 harddog. All rights reserved.
//

#import "MyWeWorkDylib.h"
#import <UIKit/UIKit.h>
#import "HookFunctionsAndPropertys.h"
#import "DebugWindow.h"
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
    
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidFinishLaunchingNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        UIApplication *app = note.object;
        app.applicationSupportsShakeToEdit = YES;
    }];
}

@implementation UIViewController (MotionAppDelegate)

DebugWindow *window = nil;
- (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    if (motion == UIEventSubtypeMotionShake) {
        if (window == nil) {
            window = [[DebugWindow alloc] init];
        }
        window.hidden = !window.hidden;
    }
}

@end
