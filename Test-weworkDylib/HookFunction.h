//
//  HookFunction.h
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/22.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <CaptainHook/CaptainHook.h>
#import <Cycript/Cycript.h>
#import <ReactiveObjC/ReactiveObjC.h>

@interface HookFunction : NSObject

@property (nonatomic, strong) id message;
@property (nonatomic, weak) id delegate;

@property(nonatomic, assign) NSInteger qyhbSubType;
@property(nonatomic, assign) NSInteger mHongbaoStatus;
@property(strong, nonatomic) UIButton *mOpenBtn;

- (void)onOpenBtnClick:(id)arg1;

@end
