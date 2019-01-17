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
            NSLog(@"==Log 删除了mHongBaoID==");
        }
        if ([HookTool sharedInstance].stopToRedPackageVC) {
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


%new
- (BOOL)start {
    return [objc_getAssociatedObject(self, @selector(start)) boolValue];
}

%new
- (void)setStart:(BOOL)start {
    objc_setAssociatedObject(self, @selector(start), @(start), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

%new
- (void)p__startOpenRedPackage {
    if (self.start == NO) {
        NSLog(@"==Log 循环拉取红包 return 掉 ==");
        return;
    }

    [self onOpenBtnClick:self.mOpenBtn];
    NSString *mHongBaoID = self.mHongBaoID;
    __weak typeof(self) weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!weakSelf.isHidden) {
            NSLog(@"==Log 循环拉取红包1==");
            [weakSelf p__startOpenRedPackage];
        } else {
            NSLog(@"==Log 循环拉取红包2==");
        }
    });
}

- (void)_initUI {
    %orig;
    /*
    __weak typeof(self) weakSelf = self;
    [self.rac_willDeallocSignal subscribeCompleted:^{
        [HookTool removeBubbleViewWithHongBaoID:weakSelf.mHongBaoID];
        weakSelf.start == NO;
    }];
     */
}

// 红包window，设置完最后一个属性后，自动打开红包
- (void)setQyhbSubType:(NSInteger)type {
    %orig;
    
    // 如果是未打开的红包
    if (self.mHongbaoStatus == 2) {
        [self p__startOpenRedPackage];
    }
}

// btn的位置会偏移
- (void)startOpenHongbaoAnimation {
    self.start = YES;
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
