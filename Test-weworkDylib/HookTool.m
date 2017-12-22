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
    });
    return sharedInstance;
}

@end
