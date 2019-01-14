//
//  HookTool.m
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/23.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import "HookTool.h"

@interface HookTool ()

@property (nonatomic, strong) NSMutableArray *hongBaoIDs;

@end

@implementation HookTool

+ (instancetype)sharedInstance {
    //  Static local predicate must be initialized to 0
    static HookTool *sharedInstance = nil;
    static dispatch_once_t onceToken = 0;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[HookTool alloc] init];
        
        // Do any other initialisation stuff here
        sharedInstance.stopToRedPackageVC = YES;
    });
    return sharedInstance;
}

+ (void)saveBubbleView:(WWKConversationRedEnvelopesBubbleView *)view {
    [[HookTool sharedInstance].redEnvelopesBubbleViews addObject:view];
    if (view.message.messageItems.firstObject.hongbaoID) {
        [[HookTool sharedInstance].hongBaoIDs addObject:view.message.messageItems.firstObject.hongbaoID];
    }
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
    
    // 第二次删id，用于防止跳转详情页
    NSArray *ids = [tool.hongBaoIDs copy];
    for (NSString *saveHongBaoID in ids) {
        if ([saveHongBaoID isEqualToString:hongBaoID]) {
            [tool.hongBaoIDs removeObject:saveHongBaoID];
            return YES;
        }
    }
    return NO;
}

- (NSMutableArray<WWKConversationRedEnvelopesBubbleView *> *)redEnvelopesBubbleViews {
    if (!_redEnvelopesBubbleViews) {
        _redEnvelopesBubbleViews = [NSMutableArray array];
    }
    return _redEnvelopesBubbleViews;
}

- (NSMutableArray *)hongBaoIDs {
    if (!_hongBaoIDs) {
        _hongBaoIDs = [NSMutableArray array];
    }
    return _hongBaoIDs;
}

@end

