#line 1 "/Users/lzh/Desktop/test/MyWeWork_r/MyWeWorkDylib/MyWeWorkDylib.xm"


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

@class WWKMessage; @class WWRedEnvDetailViewController; @class WWKConversationRedEnvelopesBubbleView; @class WWKConversationWrapper; @class WWKMessageRedEnvelopes; @class WWRedEnvOpenHongBaoWindow; @class WWKNavigationController; @class WWKConversationViewController; @class WXCCommonUtil; 
static void (*_logos_orig$_ungrouped$WWKNavigationController$pushViewController$animated$)(_LOGOS_SELF_TYPE_NORMAL WWKNavigationController* _LOGOS_SELF_CONST, SEL, UIViewController *, BOOL); static void _logos_method$_ungrouped$WWKNavigationController$pushViewController$animated$(_LOGOS_SELF_TYPE_NORMAL WWKNavigationController* _LOGOS_SELF_CONST, SEL, UIViewController *, BOOL); static void (*_logos_orig$_ungrouped$WWKConversationWrapper$___setLastMessageText$)(_LOGOS_SELF_TYPE_NORMAL WWKConversationWrapper* _LOGOS_SELF_CONST, SEL, NSString *); static void _logos_method$_ungrouped$WWKConversationWrapper$___setLastMessageText$(_LOGOS_SELF_TYPE_NORMAL WWKConversationWrapper* _LOGOS_SELF_CONST, SEL, NSString *); static WWKConversationViewController * (*_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$)(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL, void *); static WWKConversationViewController * _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL, void *); static WWKMessage* (*_logos_orig$_ungrouped$WWKMessage$initWithMessage$)(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static void (*_logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$)(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST, SEL, id, int, id); static void _logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST, SEL, id, int, id); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, NSInteger); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, NSInteger); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$onCloseBtnClick$)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, id); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$onCloseBtnClick$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, id); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$_closeRedEnvWindow)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$_closeRedEnvWindow(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); 
static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWKMessageRedEnvelopes(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWKMessageRedEnvelopes"); } return _klass; }static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWKConversationRedEnvelopesBubbleView(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWKConversationRedEnvelopesBubbleView"); } return _klass; }static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWRedEnvDetailViewController(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWRedEnvDetailViewController"); } return _klass; }
#line 10 "/Users/lzh/Desktop/test/MyWeWork_r/MyWeWorkDylib/MyWeWorkDylib.xm"

static void _logos_method$_ungrouped$WWKNavigationController$pushViewController$animated$(_LOGOS_SELF_TYPE_NORMAL WWKNavigationController* _LOGOS_SELF_CONST self, SEL _cmd, UIViewController * viewController, BOOL animated) {
    if ([viewController isKindOfClass:_logos_static_class_lookup$WWRedEnvDetailViewController()]) {
        WWRedEnvDetailViewController *vc = (WWRedEnvDetailViewController *)viewController;
        if ([HookTool removeBubbleViewWithHongBaoID:vc.mHongBaoID]) {
            return;
        }
    }
    return _logos_orig$_ungrouped$WWKNavigationController$pushViewController$animated$(self, _cmd, viewController, animated);
}


#pragma mark - 首页红包提醒

static void _logos_method$_ungrouped$WWKConversationWrapper$___setLastMessageText$(_LOGOS_SELF_TYPE_NORMAL WWKConversationWrapper* _LOGOS_SELF_CONST self, SEL _cmd, NSString * arg1) {
    if ([arg1 containsString:@"[红包]"]) {
        
    }
    return _logos_orig$_ungrouped$WWKConversationWrapper$___setLastMessageText$(self, _cmd, arg1);
}




static WWKConversationViewController * _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST self, SEL _cmd, void * arg1) {
    WWKConversationViewController *conversationViewController = _logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$(self, _cmd, arg1);
    [HookTool sharedInstance].startSnatchHB = NO;
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    
    __weak typeof(self) weakSelf = self;
    [[[weakSelf rac_signalForSelector:@selector(viewDidAppear:)] take:1] subscribeNext:^(RACTuple * _Nullable x) {
        __strong typeof(self) strongSelf = weakSelf;
        UIBarButtonItem *conversationMsgItems = strongSelf.navigationItem.rightBarButtonItem;
        if (conversationMsgItems) {
            UISwitch *swt = [[UISwitch alloc] init];
            UIBarButtonItem *swtItem = [[UIBarButtonItem alloc] initWithCustomView:swt];
            strongSelf.navigationItem.rightBarButtonItems = @[ swtItem, conversationMsgItems ];
            [[[swt rac_newOnChannel] takeUntil:strongSelf.rac_willDeallocSignal] subscribeNext:^(NSNumber * _Nullable x) {
                [HookTool sharedInstance].startSnatchHB = [x boolValue];
            }];
            swt.on = YES;
            [swt sendActionsForControlEvents:UIControlEventValueChanged];
        }
    }];
    
    return conversationViewController;
}








static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage* self, SEL _cmd, void * arg1) _LOGOS_RETURN_RETAINED {
    
    WWKMessage *wkMessage = _logos_orig$_ungrouped$WWKMessage$initWithMessage$(self, _cmd, arg1);
    
    
    WWKMessageRedEnvelopes *redEnvelopes = [wkMessage.messageItems firstObject]; 
    
    if ([HookTool sharedInstance].startSnatchHB && redEnvelopes && [redEnvelopes isKindOfClass:_logos_static_class_lookup$WWKMessageRedEnvelopes()]) {
        HBLogDebug(@"-[<WWKMessage: %p> initWithMessage:%p]: %@", self, arg1, (redEnvelopes));
        
        if ([HookTool sharedInstance].currentConversationViewController) { 
            WWKConversationRedEnvelopesBubbleView *bubbleView = [[_logos_static_class_lookup$WWKConversationRedEnvelopesBubbleView() alloc] init];
            bubbleView.message = wkMessage;
            
            [bubbleView tony_onClickHongbaoMessage];
            
            [[HookTool sharedInstance].redEnvelopesBubbleViews addObject:bubbleView];
        }
    }
    return (WWKMessage *)wkMessage;
}



 

 static void _logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST self, SEL _cmd, id arg1, int arg2, id arg3) {
     return _logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(self, _cmd, arg1, arg2, arg3);
     




 }
 









static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST self, SEL _cmd, NSInteger type) {
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(self, _cmd, type);
    
    
    if (self.mHongbaoStatus == 2) {
        [self onOpenBtnClick:self.mOpenBtn];
        NSLog(@"打开红包");
    }
}

static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$onCloseBtnClick$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST self, SEL _cmd, id arg1) {
    [HookTool removeBubbleViewWithHongBaoID:self.mHongBaoID];
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$onCloseBtnClick$(self, _cmd, arg1);
}

static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$_closeRedEnvWindow(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST self, SEL _cmd) {
    [HookTool removeBubbleViewWithHongBaoID:self.mHongBaoID];
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$_closeRedEnvWindow(self, _cmd);
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST self, SEL _cmd) {
    CGFloat bgWidth = self.mFrontContainerView.image.size.width;
    CGFloat bgHeight = self.mFrontContainerView.image.size.height;
    CGFloat openBtnWidth = self.mOpenBtn.frame.size.width;
    CGFloat openBtnHeight = self.mOpenBtn.frame.size.height;
    self.mOpenBtn.frame = CGRectMake((bgWidth - openBtnWidth) * 0.5, bgHeight - openBtnHeight * 0.5, openBtnWidth, openBtnWidth);
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(self, _cmd);
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST self, SEL _cmd) {
    return;
}

static __attribute__((constructor)) void _logosLocalInit() {
{Class _logos_class$_ungrouped$WWKNavigationController = objc_getClass("WWKNavigationController"); if (_logos_class$_ungrouped$WWKNavigationController) {MSHookMessageEx(_logos_class$_ungrouped$WWKNavigationController, @selector(pushViewController:animated:), (IMP)&_logos_method$_ungrouped$WWKNavigationController$pushViewController$animated$, (IMP*)&_logos_orig$_ungrouped$WWKNavigationController$pushViewController$animated$);} else {HBLogError(@"logos: nil class %s", "WWKNavigationController");}Class _logos_class$_ungrouped$WWKConversationWrapper = objc_getClass("WWKConversationWrapper"); if (_logos_class$_ungrouped$WWKConversationWrapper) {MSHookMessageEx(_logos_class$_ungrouped$WWKConversationWrapper, @selector(___setLastMessageText:), (IMP)&_logos_method$_ungrouped$WWKConversationWrapper$___setLastMessageText$, (IMP*)&_logos_orig$_ungrouped$WWKConversationWrapper$___setLastMessageText$);} else {HBLogError(@"logos: nil class %s", "WWKConversationWrapper");}Class _logos_class$_ungrouped$WWKConversationViewController = objc_getClass("WWKConversationViewController"); if (_logos_class$_ungrouped$WWKConversationViewController) {MSHookMessageEx(_logos_class$_ungrouped$WWKConversationViewController, @selector(initWithConversation:), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$initWithConversation$, (IMP*)&_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$);} else {HBLogError(@"logos: nil class %s", "WWKConversationViewController");}Class _logos_class$_ungrouped$WWKMessage = objc_getClass("WWKMessage"); if (_logos_class$_ungrouped$WWKMessage) {MSHookMessageEx(_logos_class$_ungrouped$WWKMessage, @selector(initWithMessage:), (IMP)&_logos_method$_ungrouped$WWKMessage$initWithMessage$, (IMP*)&_logos_orig$_ungrouped$WWKMessage$initWithMessage$);} else {HBLogError(@"logos: nil class %s", "WWKMessage");}Class _logos_class$_ungrouped$WXCCommonUtil = objc_getClass("WXCCommonUtil"); Class _logos_metaclass$_ungrouped$WXCCommonUtil = object_getClass(_logos_class$_ungrouped$WXCCommonUtil); if (_logos_metaclass$_ungrouped$WXCCommonUtil) {MSHookMessageEx(_logos_metaclass$_ungrouped$WXCCommonUtil, @selector(_wxc_logConvert:level:function:), (IMP)&_logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$, (IMP*)&_logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$);} else {HBLogError(@"logos: nil class %s", "WXCCommonUtil");}Class _logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow = objc_getClass("WWRedEnvOpenHongBaoWindow"); if (_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow) {MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(setQyhbSubType:), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$);} else {HBLogError(@"logos: nil class %s", "WWRedEnvOpenHongBaoWindow");}if (_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow) {MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(onCloseBtnClick:), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$onCloseBtnClick$, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$onCloseBtnClick$);} else {HBLogError(@"logos: nil class %s", "WWRedEnvOpenHongBaoWindow");}if (_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow) {MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(_closeRedEnvWindow), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$_closeRedEnvWindow, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$_closeRedEnvWindow);} else {HBLogError(@"logos: nil class %s", "WWRedEnvOpenHongBaoWindow");}if (_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow) {MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(startOpenHongbaoAnimation), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation);} else {HBLogError(@"logos: nil class %s", "WWRedEnvOpenHongBaoWindow");}if (_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow) {MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(playOpenSuccessVoice), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice);} else {HBLogError(@"logos: nil class %s", "WWRedEnvOpenHongBaoWindow");}} }
#line 144 "/Users/lzh/Desktop/test/MyWeWork_r/MyWeWorkDylib/MyWeWorkDylib.xm"
