//
//  HookTool.m
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/23.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import "HookTool.h"

@implementation HookTool

+ (instancetype)sharedInstance {
    //  Static local predicate must be initialized to 0
    static HookTool *sharedInstance = nil;
    static dispatch_once_t onceToken = 0;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[HookTool alloc] init];
        
        // Do any other initialisation stuff here
        [sharedInstance addObserverLog];
    });
    return sharedInstance;
}

- (void)addObserverLog {
    [RACObserve(self, startSnatchHB) subscribeNext:^(NSNumber* x) {
        NSLog(@"自动抢红包%@", [x boolValue] ? @"打开" : @"关闭");
    }];
}

- (void)create {
//    WWRedEnvOpenHongBaoWindow *window = [[WWRedEnvOpenHongBaoWindow alloc] init];
//    window.mToVidList = [@[ @1688850851293754 ] mutableCopy]; // tovidlist
//    window.mHongbaoTicket = @"f908f8de0063f90d1cf8daeb292042b897f75cce5533a4d52248bc0804f73d3a3198d4b0a0f729e5130e7435e2144aee6e867b14d506eb6a6d3a58e36d60897aa2b56fea005d001931d23c59d3e028d3"; // HongbaoTicket
//    window.mSelfVid = [[window.mToVidList firstObject] unsignedLongLongValue];
//    window.mSenderVid = [@1688850015272719 unsignedLongLongValue]; // sendervid
//    window.mHongbaoType = [@1 unsignedIntValue]; // HongbaoType
//    window.mHongbaoSubType = [@3 unsignedIntValue];
//    window.mHongbaoStatus = [@2 unsignedIntValue];
//    window.mHongBaoID = @"1000040501201712255000001633556";
//    window.itilInviteeVid = [@0 unsignedLongLongValue];
//    window.senderCorpAppId = [@0 unsignedLongLongValue];
//    window.qyhbSubType = [@0 unsignedIntValue];
////    mHongbaoVidTicket
}

@end
