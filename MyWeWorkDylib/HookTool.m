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

- (NSMutableArray<WWKConversationRedEnvelopesBubbleView *> *)redEnvelopesBubbleViews {
    if (!_redEnvelopesBubbleViews) {
        _redEnvelopesBubbleViews = [NSMutableArray array];
    }
    return _redEnvelopesBubbleViews;
}

+ (BOOL)removeBubbleViewWithHongBaoID:(NSString *)hongBaoID {
    HookTool *tool = [self sharedInstance];
    NSArray *array = [tool.redEnvelopesBubbleViews copy];
    for (WWKConversationRedEnvelopesBubbleView *bubbleView in array) {
        if ([bubbleView.message.messageItems.firstObject isKindOfClass:NSClassFromString(@"WWKMessageRedEnvelopes")]
            && [bubbleView.message.messageItems.firstObject.hongbaoID isEqualToString:hongBaoID]) {
            [tool.redEnvelopesBubbleViews removeObject:bubbleView];
            return YES;
        }
    }
    return NO;
}

@end
