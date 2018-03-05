// See http://iphonedevwiki.net/index.php/Logos

#import <UIKit/UIKit.h>
#import "HookTool.h"
#import "HookFunctionsAndPropertys.h"

@class WWKMessageRedEnvelopes;
@class WWKConversationRedEnvelopesBubbleView;

%hook WWKNavigationController
- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated {
    if ([viewController isKindOfClass:%c(WWRedEnvDetailViewController)]) {
        WWRedEnvDetailViewController *vc = (WWRedEnvDetailViewController *)viewController;
        if ([HookTool removeBubbleViewWithHongBaoID:vc.mHongBaoID]) {
            return;
        }
    }
    return %orig;
}
%end

#pragma mark - 首页红包提醒
%hook WWKConversationWrapper
- (void)___setLastMessageText:(NSString *)arg1 {
    if ([arg1 containsString:@"[红包]"]) {
        
    }
    return %orig;
}
%end

%hook WWKConversationViewController
// 初始化以后weak持有会话控制器
- (WWKConversationViewController *)initWithConversation:(void *)arg1 {
    WWKConversationViewController *conversationViewController = %orig;
    [HookTool sharedInstance].startSnatchHB = NO;
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    return conversationViewController;
}

%new
- (void)my_swtAction:(UISwitch *)swt {
    [HookTool sharedInstance].startSnatchHB = swt.isOn;
}

- (void)viewDidLoad {
    %orig;
    UIBarButtonItem *conversationMsgItems = self.navigationItem.rightBarButtonItem;
    if (conversationMsgItems) {
        UISwitch *swt = [[UISwitch alloc] init];
        UIBarButtonItem *swtItem = [[UIBarButtonItem alloc] initWithCustomView:swt];
        self.navigationItem.rightBarButtonItems = @[ swtItem, conversationMsgItems ];
        [swt.rac_newOnChannel subscribeNext:^(NSNumber * _Nullable x) {
            [HookTool sharedInstance].startSnatchHB = [x boolValue];
            NSLog(@"抢红包：%@", [x boolValue] ? @"开" : @"关");
        }];
        swt.on = YES;
        [swt sendActionsForControlEvents:UIControlEventValueChanged];
    }
}

%end

%hook WWKMessage

// 接受到消息以后， 判断红包，并打开
- (id)initWithMessage:(void *)arg1 {
    // 通过message 这个结构体，进行初始化，WWKMessage多了text和messageItems
    WWKMessage *wkMessage = %orig;
    
    // 是红包消息
    WWKMessageRedEnvelopes *redEnvelopes = [wkMessage.messageItems firstObject]; // WWKMessageRedEnvelopes
    
    if ([HookTool sharedInstance].startSnatchHB && redEnvelopes && [redEnvelopes isKindOfClass:%c(WWKMessageRedEnvelopes)]) {
        %log(redEnvelopes);
        
        if ([HookTool sharedInstance].currentConversationViewController) { // 处在会话
            WWKConversationRedEnvelopesBubbleView *bubbleView = [[%c(WWKConversationRedEnvelopesBubbleView) alloc] init];
            bubbleView.message = wkMessage;
            bubbleView.delegate = [HookTool sharedInstance].currentConversationViewController; // 代理是会话控制器
            [bubbleView tony_onClickHongbaoMessage];
            // hold 红包view
            [HookTool saveBubbleView:bubbleView];
        }
    }
    return (WWKMessage *)wkMessage;
}

%end

/*
%hook WXCCommonUtil
// 强制输出log
+ (void)_wxc_logConvert:(id)arg1 level:(int)arg2 function:(id)arg3 {
 return %orig(arg1, arg2, arg3);

 NSLog(@"强制输出log-start");
 %orig(arg1, 2, arg3);
 NSLog(@"强制输出log-end");
 
}
%end
*/

%hook WWRedEnvOpenHongBaoWindow

- (void)_initUI {
    %orig;
    [self.rac_willDeallocSignal subscribeCompleted:^{
        [HookTool removeBubbleViewWithHongBaoID:self.mHongBaoID];
    }];
}

// 红包window，设置完最后一个属性后，自动打开红包
- (void)setQyhbSubType:(NSInteger)type {
    %orig;
    
    // 如果是未打开的红包
    if (self.mHongbaoStatus == 2) {
        [self onOpenBtnClick:self.mOpenBtn];
        NSLog(@"打开红包");
    }
}

// btn的位置会偏移
- (void)startOpenHongbaoAnimation {
    CGFloat bgWidth = self.mFrontContainerView.image.size.width;
    CGFloat bgHeight = self.mFrontContainerView.image.size.height;
    CGFloat openBtnWidth = self.mOpenBtn.frame.size.width;
    CGFloat openBtnHeight = self.mOpenBtn.frame.size.height;
    self.mOpenBtn.frame = CGRectMake((bgWidth - openBtnWidth) * 0.5, bgHeight - openBtnHeight * 0.5, openBtnWidth, openBtnWidth);
    %orig;
}

// 不播放声音
- (void)playOpenSuccessVoice {
    return;
}
%end
