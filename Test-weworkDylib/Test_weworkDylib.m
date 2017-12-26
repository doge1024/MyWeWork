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
#import <CaptainHook/CaptainHook.h>
#import <UIKit/UIKit.h>
#import <Cycript/Cycript.h>
#ifdef DEBUG
#import <FLEX/FLEX.h>
#endif

static __attribute__((constructor)) void entry(){
    NSLog(@"\n               🎉!!！congratulations!!！🎉\n👍----------------insert dylib success----------------👍");
    
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidFinishLaunchingNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        
        CYListenServer(6666);
        
        // show FLEX
//        [[FLEXManager sharedManager] showExplorer];
    }];
}


@interface WWKGmailOAuthRequester

+ (id)get:(id)arg1 parameters:(id)arg2 useProxy:(_Bool)arg3 error:(NSError **)arg4;

@end

CHDeclareClass(WWKGmailOAuthRequester)

CHOptimizedMethod(4, self, id, WWKGmailOAuthRequester, get, id, arg1, parameters, id, arg2, useProxy, _Bool, arg3, error, NSError **, arg4) {
    //get origin value
    id originName = CHSuper(4, WWKGmailOAuthRequester, get, arg1, parameters, arg2, useProxy, arg3, error, arg4);
    return originName;
    
}

CHConstructor{
    CHLoadLateClass(WWKGmailOAuthRequester);
    CHClassHook(4, WWKGmailOAuthRequester, get, parameters, useProxy, error);
}
