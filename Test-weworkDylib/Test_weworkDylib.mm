#line 1 "/Users/lzh/Desktop/test/Test-wework/Test-weworkDylib/Test_weworkDylib.xm"


#import <UIKit/UIKit.h>
#import "HookTool.h"
#import "HookFunctionsAndPropertys.h"

@class WWKMessageRedEnvelopes;
@class WWKConversationRedEnvelopesBubbleView;


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

@class WXCCommonUtil; @class WWKConversationViewController; @class WWKMessageRedEnvelopes; @class WWKMessage; @class WWKConversationRedEnvelopesBubbleView; @class WWRedEnvOpenHongBaoWindow; 
static WWKConversationViewController* (*_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$)(_LOGOS_SELF_TYPE_INIT WWKConversationViewController*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKConversationViewController* _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_INIT WWKConversationViewController*, SEL, void *) _LOGOS_RETURN_RETAINED; static void (*_logos_orig$_ungrouped$WWKConversationViewController$viewDidLoad)(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWKConversationViewController$viewDidLoad(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL); static WWKMessage* (*_logos_orig$_ungrouped$WWKMessage$initWithMessage$)(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* (*_logos_orig$_ungrouped$WWKMessage$initWithMessage$observe$)(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *, BOOL) _LOGOS_RETURN_RETAINED; static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$observe$(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *, BOOL) _LOGOS_RETURN_RETAINED; static void (*_logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$)(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST, SEL, id, int, id); static void _logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST, SEL, id, int, id); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, NSInteger); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, NSInteger); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playCustomSuccessSound(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); 
static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWKMessageRedEnvelopes(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWKMessageRedEnvelopes"); } return _klass; }static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWKConversationRedEnvelopesBubbleView(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWKConversationRedEnvelopesBubbleView"); } return _klass; }
#line 10 "/Users/lzh/Desktop/test/Test-wework/Test-weworkDylib/Test_weworkDylib.xm"



static WWKConversationViewController* _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_INIT WWKConversationViewController* __unused self, SEL __unused _cmd, void * arg1) _LOGOS_RETURN_RETAINED {
    id conversationViewController = _logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$(self, _cmd, arg1);
    [HookTool sharedInstance].startSnatchHB = NO;
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    return conversationViewController;
}

static void _logos_method$_ungrouped$WWKConversationViewController$viewDidLoad(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    _logos_orig$_ungrouped$WWKConversationViewController$viewDidLoad(self, _cmd);
    
    
    UIViewController *viewController = (UIViewController *)self;
    UIBarButtonItem *conversationMsgItems = viewController.navigationItem.rightBarButtonItem;
    
    UISwitch *swt = [[UISwitch alloc] init];
    UIBarButtonItem *swtItem = [[UIBarButtonItem alloc] initWithCustomView:swt];
    viewController.navigationItem.rightBarButtonItems = @[ swtItem, conversationMsgItems ];
    [[[swt rac_newOnChannel] takeUntil:viewController.rac_willDeallocSignal] subscribeNext:^(NSNumber * _Nullable x) {
        [HookTool sharedInstance].startSnatchHB = [x boolValue];
    }];
    swt.on = YES;
    [swt sendActionsForControlEvents:UIControlEventValueChanged];
}






static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage* __unused self, SEL __unused _cmd, void * arg1) _LOGOS_RETURN_RETAINED {
    
    WWKMessage *wkMessage = _logos_orig$_ungrouped$WWKMessage$initWithMessage$(self, _cmd, arg1);
    
    
    id redEnvelopes = [wkMessage.messageItems firstObject]; 
    
    if ([HookTool sharedInstance].startSnatchHB && redEnvelopes && [redEnvelopes isKindOfClass:_logos_static_class_lookup$WWKMessageRedEnvelopes()]) {
        HBLogDebug(@"-[<WWKMessage: %p> initWithMessage:%p]: %@", self, arg1, (redEnvelopes));
        
        if ([HookTool sharedInstance].currentConversationViewController) { 
            WWKConversationRedEnvelopesBubbleView *bubbleView = [[_logos_static_class_lookup$WWKConversationRedEnvelopesBubbleView() alloc] init];
            bubbleView.message = wkMessage;
            bubbleView.delegate = [HookTool sharedInstance].currentConversationViewController; 
            [bubbleView tony_onClickHongbaoMessage];
            
            [HookTool sharedInstance].redEnvelopesBubbleView = bubbleView;
        }
    }
    
    return (WWKMessage *)wkMessage;
}


static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$observe$(_LOGOS_SELF_TYPE_INIT WWKMessage* __unused self, SEL __unused _cmd, void * arg1, BOOL arg2) _LOGOS_RETURN_RETAINED {
    return _logos_orig$_ungrouped$WWKMessage$initWithMessage$observe$(self, _cmd, arg1, arg2);
}






































 

 static void _logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, id arg1, int arg2, id arg3) {
     NSLog(@"强制输出log-start");
     _logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(self, _cmd, arg1, 2, arg3);
     NSLog(@"强制输出log-end");
 }
 




static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, NSInteger type) {
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(self, _cmd, type);
    
    if (self.mHongbaoStatus == 2) {
        [self onOpenBtnClick:self.mOpenBtn];
        [self playCustomSuccessSound];
    }
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    return;
}



static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playCustomSuccessSound(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    NSString *soundPath = [[NSBundle mainBundle] pathForResource:@"hongbaoopensuccess" ofType:@"mp3"];
    SystemSoundID soundID;
    AudioServicesCreateSystemSoundID((__bridge CFURLRef)[NSURL fileURLWithPath: soundPath], &soundID);
    AudioServicesPlaySystemSound (soundID);
}

static __attribute__((constructor)) void _logosLocalInit() {
{Class _logos_class$_ungrouped$WWKConversationViewController = objc_getClass("WWKConversationViewController"); MSHookMessageEx(_logos_class$_ungrouped$WWKConversationViewController, @selector(initWithConversation:), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$initWithConversation$, (IMP*)&_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$);MSHookMessageEx(_logos_class$_ungrouped$WWKConversationViewController, @selector(viewDidLoad), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$viewDidLoad, (IMP*)&_logos_orig$_ungrouped$WWKConversationViewController$viewDidLoad);Class _logos_class$_ungrouped$WWKMessage = objc_getClass("WWKMessage"); MSHookMessageEx(_logos_class$_ungrouped$WWKMessage, @selector(initWithMessage:), (IMP)&_logos_method$_ungrouped$WWKMessage$initWithMessage$, (IMP*)&_logos_orig$_ungrouped$WWKMessage$initWithMessage$);MSHookMessageEx(_logos_class$_ungrouped$WWKMessage, @selector(initWithMessage:observe:), (IMP)&_logos_method$_ungrouped$WWKMessage$initWithMessage$observe$, (IMP*)&_logos_orig$_ungrouped$WWKMessage$initWithMessage$observe$);Class _logos_class$_ungrouped$WXCCommonUtil = objc_getClass("WXCCommonUtil"); Class _logos_metaclass$_ungrouped$WXCCommonUtil = object_getClass(_logos_class$_ungrouped$WXCCommonUtil); MSHookMessageEx(_logos_metaclass$_ungrouped$WXCCommonUtil, @selector(_wxc_logConvert:level:function:), (IMP)&_logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$, (IMP*)&_logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$);Class _logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow = objc_getClass("WWRedEnvOpenHongBaoWindow"); MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(setQyhbSubType:), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$);MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(startOpenHongbaoAnimation), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation);{ char _typeEncoding[1024]; unsigned int i = 0; _typeEncoding[i] = 'v'; i += 1; _typeEncoding[i] = '@'; i += 1; _typeEncoding[i] = ':'; i += 1; _typeEncoding[i] = '\0'; class_addMethod(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(playCustomSuccessSound), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playCustomSuccessSound, _typeEncoding); }} }
#line 142 "/Users/lzh/Desktop/test/Test-wework/Test-weworkDylib/Test_weworkDylib.xm"
