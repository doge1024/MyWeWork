// See http://iphonedevwiki.net/index.php/Logos

#import <UIKit/UIKit.h>
#import "HookTool.h"
#import "HookFunctionsAndPropertys.h"

@class WWKMessageRedEnvelopes;
@class WWKConversationRedEnvelopesBubbleView;

%hook WWKConversationViewController

// 初始化以后weak持有会话控制器
- (id)initWithConversation:(void *)arg1 {
    id conversationViewController = %orig;
    [HookTool sharedInstance].startSnatchHB = NO;
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    return conversationViewController;
}

- (void)viewDidLoad {
    %orig;
    
    // 添加抢红包按钮
    UIViewController *viewController = (UIViewController *)self;
    UIBarButtonItem *conversationMsgItems = viewController.navigationItem.rightBarButtonItem;
    
    UISwitch *swt = [[UISwitch alloc] init];
    UIBarButtonItem *swtItem = [[UIBarButtonItem alloc] initWithCustomView:swt];
    viewController.navigationItem.rightBarButtonItems = @[ swtItem, conversationMsgItems ];
    [[[swt rac_newOnChannel] takeUntil:viewController.rac_willDeallocSignal] subscribeNext:^(NSNumber * _Nullable x) {
        [HookTool sharedInstance].startSnatchHB = [x boolValue];
    }];
}

%end

%hook WWKMessage

// 接受到消息以后， 判断红包，并打开
- (id)initWithMessage:(void *)arg1 {
    // 通过message 这个结构体，进行初始化，WWKMessage多了text和messageItems
    WWKMessage *wkMessage = %orig;
    
    // 是红包消息
    id redEnvelopes = [wkMessage.messageItems firstObject]; // WWKMessageRedEnvelopes
    
    if ([HookTool sharedInstance].startSnatchHB && redEnvelopes && [redEnvelopes isKindOfClass:%c(WWKMessageRedEnvelopes)]) {
        %log(redEnvelopes);
        
        if ([HookTool sharedInstance].currentConversationViewController) { // 处在会话
            WWKConversationRedEnvelopesBubbleView *bubbleView = [[%c(WWKConversationRedEnvelopesBubbleView) alloc] init];
            bubbleView.message = wkMessage;
            bubbleView.delegate = [HookTool sharedInstance].currentConversationViewController; // 代理是会话控制器
            [bubbleView tony_onClickHongbaoMessage];
            // hold 红包view
            [HookTool sharedInstance].redEnvelopesBubbleView = bubbleView;
        }
    }
    
    return (WWKMessage *)wkMessage;
}

// initWithMessage: => initWithMessage:observe: => return initWithMessage:
- (id)initWithMessage:(void *)arg1 observe:(BOOL)arg2 {
    return %orig;
}

%end

%hook WWRedEnvOpenHongBaoWindow

// 红包window，设置完最后一个属性后，自动打开红包
- (void)setQyhbSubType:(NSInteger)type {
    %orig;
    
    if (self.mHongbaoStatus == 2) {
        [self onOpenBtnClick:self.mOpenBtn];
        [self playCustomSuccessSound];
    }
}

// 去掉动画
- (void)startOpenHongbaoAnimation {
    return;
}

// 自己播放声音，但不要动画
%new
- (void)playCustomSuccessSound {
    NSString *soundPath = [[NSBundle mainBundle] pathForResource:@"hongbaoopensuccess" ofType:@"mp3"];
    SystemSoundID soundID;
    AudioServicesCreateSystemSoundID((__bridge CFURLRef)[NSURL fileURLWithPath: soundPath], &soundID);
    AudioServicesPlaySystemSound (soundID);
}

%end
