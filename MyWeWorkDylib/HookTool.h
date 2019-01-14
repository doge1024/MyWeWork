//
//  HookTool.h
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/23.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HookFunctionsAndPropertys.h"
#import <MSWeakTimer/MSWeakTimer.h>

@interface NSObject (TTTTTT)

@property(nonatomic, assign) BOOL start;

- (void)p__startOpenRedPackage;

@end

@interface HookTool : NSObject

@property(nonatomic, weak) WWKConversationViewController *currentConversationViewController;

@property(nonatomic, strong) NSMutableArray<WWKConversationRedEnvelopesBubbleView *> *redEnvelopesBubbleViews;

@property(nonatomic, assign, getter=isStartSnatchHB) BOOL startSnatchHB;

@property(nonatomic, assign) BOOL stopToRedPackageVC;

+ (instancetype)sharedInstance;

+ (void)saveBubbleView:(WWKConversationRedEnvelopesBubbleView *)view;

/**
 移除保存的bubbleView

 @param hongBaoID 唯一id
 @return 移除成功YES
 */
+ (BOOL)removeBubbleViewWithHongBaoID:(NSString *)hongBaoID;

@end
