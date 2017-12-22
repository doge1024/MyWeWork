//
//  HookTool.h
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/23.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import <Foundation/Foundation.h>

@class WWKConversationViewController;
@class WWKConversationRedEnvelopesBubbleView;

@interface HookTool : NSObject

+ (instancetype)sharedInstance;

@property(nonatomic, weak) WWKConversationViewController *currentConversationViewController;

@property(nonatomic, strong) WWKConversationRedEnvelopesBubbleView *redEnvelopesBubbleView;

@end
