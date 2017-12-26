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

@property(copy, nonatomic) NSString *mHongbaoTicket;
@property(copy, nonatomic) NSString *mHongBaoID;
@property(retain, nonatomic) NSMutableArray *mToVidList;
@property(nonatomic) unsigned int qyhbSubType;
@property(nonatomic) unsigned long long senderCorpAppId;
@property(nonatomic) unsigned long long itilInviteeVid;
@property(nonatomic) unsigned int mHongbaoStatus;
@property(nonatomic) unsigned int mHongbaoSubType;
@property(nonatomic) unsigned int mHongbaoType;
@property(nonatomic) unsigned long long mSenderVid;
@property(nonatomic) unsigned long long mSelfVid;
@property(nonatomic) _Bool isFullMemberGroupHongbao;
@property(nonatomic) int mHongbaoVidTicket;
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

#pragma mark - WWKMessageRedEnvelopes
@interface WWKGmailOAuthRequester: NSObject
+ (void)setProxyForRequest:(id)arg1;
+ (id)post:(id)arg1 parameters:(id)arg2 useProxy:(_Bool)arg3 error:(id *)arg4;
+ (id)get:(id)arg1 parameters:(id)arg2 useProxy:(_Bool)arg3 error:(id *)arg4;
+ (void)aync_requestTokenWithRefreshToken:(id)arg1 useProxy:(_Bool)arg2 callback:(void *)arg3;
+ (id)requestTokenWithRefreshToken:(id)arg1 useProxy:(_Bool)arg2 error:(id *)arg3;
+ (id)requestTokensWithCode:(id)arg1 useProxy:(_Bool)arg2 error:(id *)arg3;
+ (id)requestEmailWithAccessToken:(id)arg1 useProxy:(_Bool)arg2 error:(id *)arg3;
@end
