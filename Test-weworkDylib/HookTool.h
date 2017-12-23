//
//  HookTool.h
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/23.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HookFunctionsAndPropertys.h"

@class WWKConversationViewController;
@class WWKConversationRedEnvelopesBubbleView;

@interface HookTool : NSObject

@property(nonatomic, weak) WWKConversationViewController *currentConversationViewController;

@property(nonatomic, strong) WWKConversationRedEnvelopesBubbleView *redEnvelopesBubbleView;

@property(nonatomic, assign, getter=isStartSnatchHB) BOOL startSnatchHB;

+ (instancetype)sharedInstance;

@end
