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
#import <AVFoundation/AVFoundation.h>

#pragma mark - WWRedEnvOpenHongBaoWindow
@interface WWRedEnvOpenHongBaoWindow : UIWindow

@property(nonatomic, assign) NSInteger qyhbSubType;
@property(nonatomic, assign) NSInteger mHongbaoStatus;
@property(strong, nonatomic) UIButton *mOpenBtn;

- (void)onOpenBtnClick:(UIButton *)btn;
- (void)playCustomSuccessSound;

@end

#pragma mark - WWKConversationRedEnvelopesBubbleView
@interface WWKConversationRedEnvelopesBubbleView: UIView

@property (nonatomic, strong) id message;
@property (nonatomic, weak) id delegate;

- (void)tony_onClickHongbaoMessage;

@end

#pragma mark - WWKMessage
@interface WWKMessage: NSObject

@property(nonatomic, strong) NSArray *messageItems;

@end

#pragma mark - WWKMessageRedEnvelopes
@interface WWKMessageRedEnvelopes: NSObject

@end
