//
//  HookWWKMessageListController.h
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/19.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CaptainHook/CaptainHook.h>
#import <UIKit/UIKit.h>
#import <Cycript/Cycript.h>
#import <ReactiveObjC/ReactiveObjC.h>

@interface HookWWKMessageListController : NSObject

+ (void)addMyViewFor:(UIViewController *)vc;
    
@end
