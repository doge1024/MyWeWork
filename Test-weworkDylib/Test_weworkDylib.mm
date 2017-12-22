#line 1 "/Users/lzh/Desktop/test/Test-wework/Test-weworkDylib/Test_weworkDylib.xm"


#import <UIKit/UIKit.h>
#import "HookTool.h"
#import "HookFunction.h"

@class WWKMessageRedEnvelopes;


#include <substrate.h>
#if defined(__clang__)
#if __has_feature(objc_arc)
#define _LOGOS_SELF_TYPE_NORMAL __unsafe_unretained
#define _LOGOS_SELF_TYPE_INIT __attribute__((ns_consumed))
#define _LOGOS_SELF_CONST const
#define _LOGOS_RETURN_RETAINED __attribute__((ns_returns_retained))
#else
#define _LOGOS_SELF_TYPE_NORMAL
#define _LOGOS_SELF_TYPE_INIT
#define _LOGOS_SELF_CONST
#define _LOGOS_RETURN_RETAINED
#endif
#else
#define _LOGOS_SELF_TYPE_NORMAL
#define _LOGOS_SELF_TYPE_INIT
#define _LOGOS_SELF_CONST
#define _LOGOS_RETURN_RETAINED
#endif

@class WWKConversationViewController; @class WWKMessage; 
static WWKConversationViewController* (*_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$)(_LOGOS_SELF_TYPE_INIT WWKConversationViewController*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKConversationViewController* _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_INIT WWKConversationViewController*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* (*_logos_orig$_ungrouped$WWKMessage$initWithMessage$)(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* (*_logos_orig$_ungrouped$WWKMessage$initWithMessage$observe$)(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *, BOOL) _LOGOS_RETURN_RETAINED; static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$observe$(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *, BOOL) _LOGOS_RETURN_RETAINED; 

#line 9 "/Users/lzh/Desktop/test/Test-wework/Test-weworkDylib/Test_weworkDylib.xm"



static WWKConversationViewController* _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_INIT WWKConversationViewController* __unused self, SEL __unused _cmd, void * arg1) _LOGOS_RETURN_RETAINED {
    id conversationViewController = _logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$(self, _cmd, arg1);
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    return conversationViewController;
}













static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage* __unused self, SEL __unused _cmd, void * arg1) _LOGOS_RETURN_RETAINED {
    
    id wkMessage = _logos_orig$_ungrouped$WWKMessage$initWithMessage$(self, _cmd, arg1);
    
    
    NSArray *messageItems = [wkMessage messageItems];
    id redEnvelopes = [messageItems firstObject]; 
    if (redEnvelopes && [redEnvelopes isKindOfClass:NSClassFromString(@"WWKMessageRedEnvelopes")]) {
        if ([HookTool sharedInstance].currentConversationViewController) { 
            id view = [[NSClassFromString(@"WWKConversationRedEnvelopesBubbleView") alloc] init];
            [view performSelector:@selector(setMessage:) withObject:wkMessage];
            [view performSelector:@selector(setDelegate:) withObject:[HookTool sharedInstance].currentConversationViewController]; 
            [view performSelector:NSSelectorFromString(@"tony_onClickHongbaoMessage")];
            
            [HookTool sharedInstance].redEnvelopesBubbleView = view;
        }
    }
    
    return wkMessage;
}


static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$observe$(_LOGOS_SELF_TYPE_INIT WWKMessage* __unused self, SEL __unused _cmd, void * arg1, BOOL arg2) _LOGOS_RETURN_RETAINED {
    return _logos_orig$_ungrouped$WWKMessage$initWithMessage$observe$(self, _cmd, arg1, arg2);
}


static __attribute__((constructor)) void _logosLocalInit() {
{Class _logos_class$_ungrouped$WWKConversationViewController = objc_getClass("WWKConversationViewController"); MSHookMessageEx(_logos_class$_ungrouped$WWKConversationViewController, @selector(initWithConversation:), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$initWithConversation$, (IMP*)&_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$);Class _logos_class$_ungrouped$WWKMessage = objc_getClass("WWKMessage"); MSHookMessageEx(_logos_class$_ungrouped$WWKMessage, @selector(initWithMessage:), (IMP)&_logos_method$_ungrouped$WWKMessage$initWithMessage$, (IMP*)&_logos_orig$_ungrouped$WWKMessage$initWithMessage$);MSHookMessageEx(_logos_class$_ungrouped$WWKMessage, @selector(initWithMessage:observe:), (IMP)&_logos_method$_ungrouped$WWKMessage$initWithMessage$observe$, (IMP*)&_logos_orig$_ungrouped$WWKMessage$initWithMessage$observe$);} }
#line 57 "/Users/lzh/Desktop/test/Test-wework/Test-weworkDylib/Test_weworkDylib.xm"
