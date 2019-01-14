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
#import "DEBUGViewController.h"
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

@implementation UITabBarController (AppDelegate)

- (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    if (motion == UIEventSubtypeMotionShake) {
        
        return;
        UIViewController *rootVC = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
        if ([rootVC.presentedViewController isKindOfClass:[DEBUGViewController class]]) {
            [rootVC.presentedViewController dismissViewControllerAnimated:NO completion:nil];
        } else {
            UIViewController *vc = [[DEBUGViewController alloc] init];
            [rootVC presentViewController:vc animated:NO completion:nil];
        }
    }
}

@end
