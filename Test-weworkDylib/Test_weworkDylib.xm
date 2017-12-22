// See http://iphonedevwiki.net/index.php/Logos

#import <UIKit/UIKit.h>
#import "HookTool.h"
#import "HookFunction.h"

@class WWKMessageRedEnvelopes;

%hook WWKConversationViewController

// first run
- (id)initWithConversation:(void *)arg1 {
    id conversationViewController = %orig;
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    return conversationViewController;
}

/*
// second run
- (id)initWithConversation:(void *)arg1 initialMessage:(void *)arg2 {
    return %orig;
}
 */

%end

%hook WWKMessage

// 接受到消息以后， 判断红包，并打开
- (id)initWithMessage:(void *)arg1 {
    // 通过message 这个结构体，进行初始化，WWKMessage多了text和messageItems
    id wkMessage = %orig;
    
    // 是红包消息
    NSArray *messageItems = [wkMessage messageItems];
    id redEnvelopes = [messageItems firstObject]; // WWKMessageRedEnvelopes
    if (redEnvelopes && [redEnvelopes isKindOfClass:NSClassFromString(@"WWKMessageRedEnvelopes")]) {
        if ([HookTool sharedInstance].currentConversationViewController) { // 处在会话
            id view = [[NSClassFromString(@"WWKConversationRedEnvelopesBubbleView") alloc] init];
            [view performSelector:@selector(setMessage:) withObject:wkMessage];
            [view performSelector:@selector(setDelegate:) withObject:[HookTool sharedInstance].currentConversationViewController]; // 代理是会话控制器
            [view performSelector:NSSelectorFromString(@"tony_onClickHongbaoMessage")];
            // hold 红包view
            [HookTool sharedInstance].redEnvelopesBubbleView = view;
        }
    }
    
    return wkMessage;
}

// initWithMessage: => initWithMessage:observe: => return initWithMessage:
- (id)initWithMessage:(void *)arg1 observe:(BOOL)arg2 {
    return %orig;
}

%end
