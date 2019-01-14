#line 1 "/Users/lzh/Desktop/TestDemo/MyWeWork/MyWeWorkDylib/MyWeWorkDylib.xm"


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

@class WWKMessage; @class WWKMessageRedEnvelopes; @class WWRedEnvDetailViewController; @class WXCCommonUtil; @class WWKConversationWrapper; @class WWRedEnvOpenHongBaoWindow; @class WWKConversationViewController; @class WWKNavigationController; @class WWKConversationRedEnvelopesBubbleView; 
static void (*_logos_orig$_ungrouped$WWKNavigationController$pushViewController$animated$)(_LOGOS_SELF_TYPE_NORMAL WWKNavigationController* _LOGOS_SELF_CONST, SEL, UIViewController *, BOOL); static void _logos_method$_ungrouped$WWKNavigationController$pushViewController$animated$(_LOGOS_SELF_TYPE_NORMAL WWKNavigationController* _LOGOS_SELF_CONST, SEL, UIViewController *, BOOL); static void (*_logos_orig$_ungrouped$WWKConversationWrapper$___setLastMessageText$)(_LOGOS_SELF_TYPE_NORMAL WWKConversationWrapper* _LOGOS_SELF_CONST, SEL, NSString *); static void _logos_method$_ungrouped$WWKConversationWrapper$___setLastMessageText$(_LOGOS_SELF_TYPE_NORMAL WWKConversationWrapper* _LOGOS_SELF_CONST, SEL, NSString *); static WWKConversationViewController * (*_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$)(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL, void *); static WWKConversationViewController * _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL, void *); static void _logos_method$_ungrouped$WWKConversationViewController$my_swtAction$(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL, UISwitch *); static void (*_logos_orig$_ungrouped$WWKConversationViewController$viewDidLoad)(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWKConversationViewController$viewDidLoad(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST, SEL); static WWKMessage* (*_logos_orig$_ungrouped$WWKMessage$initWithMessage$)(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage*, SEL, void *) _LOGOS_RETURN_RETAINED; static void (*_logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$)(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST, SEL, id, int, id); static void _logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST, SEL, id, int, id); static BOOL _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$start(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setStart$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, BOOL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$p__startOpenRedPackage(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$_initUI)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$_initUI(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, NSInteger); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL, NSInteger); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void (*_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice)(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST, SEL); 
static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWKMessageRedEnvelopes(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWKMessageRedEnvelopes"); } return _klass; }static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWRedEnvDetailViewController(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWRedEnvDetailViewController"); } return _klass; }static __inline__ __attribute__((always_inline)) __attribute__((unused)) Class _logos_static_class_lookup$WWKConversationRedEnvelopesBubbleView(void) { static Class _klass; if(!_klass) { _klass = objc_getClass("WWKConversationRedEnvelopesBubbleView"); } return _klass; }
#line 10 "/Users/lzh/Desktop/TestDemo/MyWeWork/MyWeWorkDylib/MyWeWorkDylib.xm"

static void _logos_method$_ungrouped$WWKNavigationController$pushViewController$animated$(_LOGOS_SELF_TYPE_NORMAL WWKNavigationController* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, UIViewController * viewController, BOOL animated) {
    if ([viewController isKindOfClass:_logos_static_class_lookup$WWRedEnvDetailViewController()]) {
        
        WWRedEnvDetailViewController *vc = (WWRedEnvDetailViewController *)viewController;
        if ([HookTool removeBubbleViewWithHongBaoID:vc.mHongBaoID]) {
            NSLog(@"==Log 删除了mHongBaoID==");
        }
        if ([HookTool sharedInstance].stopToRedPackageVC) {
            return;
        }
    }
    return _logos_orig$_ungrouped$WWKNavigationController$pushViewController$animated$(self, _cmd, viewController, animated);
}


#pragma mark - 首页红包提醒

static void _logos_method$_ungrouped$WWKConversationWrapper$___setLastMessageText$(_LOGOS_SELF_TYPE_NORMAL WWKConversationWrapper* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, NSString * arg1) {
    if ([arg1 containsString:@"[红包]"]) {
        
    }
    return _logos_orig$_ungrouped$WWKConversationWrapper$___setLastMessageText$(self, _cmd, arg1);
}




static WWKConversationViewController * _logos_method$_ungrouped$WWKConversationViewController$initWithConversation$(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, void * arg1) {
    WWKConversationViewController *conversationViewController = _logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$(self, _cmd, arg1);
    [HookTool sharedInstance].startSnatchHB = NO;
    [HookTool sharedInstance].currentConversationViewController = conversationViewController;
    return conversationViewController;
}


static void _logos_method$_ungrouped$WWKConversationViewController$my_swtAction$(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, UISwitch * swt) {
    [HookTool sharedInstance].startSnatchHB = swt.isOn;
}

static void _logos_method$_ungrouped$WWKConversationViewController$viewDidLoad(_LOGOS_SELF_TYPE_NORMAL WWKConversationViewController* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    _logos_orig$_ungrouped$WWKConversationViewController$viewDidLoad(self, _cmd);
    UIBarButtonItem *conversationMsgItems = self.navigationItem.rightBarButtonItem;
    if (conversationMsgItems) {
        UISwitch *swt = [[UISwitch alloc] init];
        UIBarButtonItem *swtItem = [[UIBarButtonItem alloc] initWithCustomView:swt];
        self.navigationItem.rightBarButtonItems = @[ swtItem, conversationMsgItems ];
        [swt.rac_newOnChannel subscribeNext:^(NSNumber * _Nullable x) {
            [HookTool sharedInstance].startSnatchHB = [x boolValue];
            NSLog(@"Log 抢红包：%@", [x boolValue] ? @"开" : @"关");
        }];
        swt.on = YES;
        [swt sendActionsForControlEvents:UIControlEventValueChanged];
    }
}






static WWKMessage* _logos_method$_ungrouped$WWKMessage$initWithMessage$(_LOGOS_SELF_TYPE_INIT WWKMessage* __unused self, SEL __unused _cmd, void * arg1) _LOGOS_RETURN_RETAINED {
    
    WWKMessage *wkMessage = _logos_orig$_ungrouped$WWKMessage$initWithMessage$(self, _cmd, arg1);
    
    
    WWKMessageRedEnvelopes *redEnvelopes = [wkMessage.messageItems firstObject]; 
    
    if ([HookTool sharedInstance].startSnatchHB && redEnvelopes && [redEnvelopes isKindOfClass:_logos_static_class_lookup$WWKMessageRedEnvelopes()]) {
        HBLogDebug(@"-[<WWKMessage: %p> initWithMessage:%p]: %@", self, arg1, (redEnvelopes));
        
        if ([HookTool sharedInstance].currentConversationViewController) { 
            WWKConversationRedEnvelopesBubbleView *bubbleView = [[_logos_static_class_lookup$WWKConversationRedEnvelopesBubbleView() alloc] init];
            bubbleView.message = wkMessage;
            bubbleView.delegate = [HookTool sharedInstance].currentConversationViewController; 
            [bubbleView tony_onClickHongbaoMessage];
            
            [HookTool saveBubbleView:bubbleView];
        }
    }
    return (WWKMessage *)wkMessage;
}






static void _logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(_LOGOS_SELF_TYPE_NORMAL Class _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, id arg1, int arg2, id arg3) {
 return _logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(self, _cmd, arg1, arg2, arg3);

 NSLog(@"强制输出log-start");
 _logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$(self, _cmd, arg1, 2, arg3);
 NSLog(@"强制输出log-end");
 
}







static BOOL _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$start(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    return [objc_getAssociatedObject(self, @selector(start)) boolValue];
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setStart$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, BOOL start) {
    objc_setAssociatedObject(self, @selector(start), @(start), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$p__startOpenRedPackage(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    if (self.start == NO) {
        NSLog(@"==Log 循环拉取红包 return 掉 ==");
        return;
    }

    [self onOpenBtnClick:self.mOpenBtn];
    NSString *mHongBaoID = self.mHongBaoID;
    __weak typeof(self) weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!weakSelf.isHidden) {
            NSLog(@"==Log 循环拉取红包1==");
            [weakSelf p__startOpenRedPackage];
        } else {
            NSLog(@"==Log 循环拉取红包2==");
        }
    });
}

static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$_initUI(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$_initUI(self, _cmd);
    






}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd, NSInteger type) {
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$(self, _cmd, type);
    
    
    if (self.mHongbaoStatus == 2) {
        self.start = YES;
        [self p__startOpenRedPackage];
    }
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    CGFloat bgWidth = self.mFrontContainerView.image.size.width;
    CGFloat bgHeight = self.mFrontContainerView.image.size.height;
    CGFloat openBtnWidth = self.mOpenBtn.frame.size.width;
    CGFloat openBtnHeight = self.mOpenBtn.frame.size.height;
    self.mOpenBtn.frame = CGRectMake((bgWidth - openBtnWidth) * 0.5, bgHeight - openBtnHeight * 0.5, openBtnWidth, openBtnWidth);
    _logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation(self, _cmd);
}


static void _logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice(_LOGOS_SELF_TYPE_NORMAL WWRedEnvOpenHongBaoWindow* _LOGOS_SELF_CONST __unused self, SEL __unused _cmd) {
    return;
}


static __attribute__((constructor)) void _logosLocalInit() {
{Class _logos_class$_ungrouped$WWKNavigationController = objc_getClass("WWKNavigationController"); MSHookMessageEx(_logos_class$_ungrouped$WWKNavigationController, @selector(pushViewController:animated:), (IMP)&_logos_method$_ungrouped$WWKNavigationController$pushViewController$animated$, (IMP*)&_logos_orig$_ungrouped$WWKNavigationController$pushViewController$animated$);Class _logos_class$_ungrouped$WWKConversationWrapper = objc_getClass("WWKConversationWrapper"); MSHookMessageEx(_logos_class$_ungrouped$WWKConversationWrapper, @selector(___setLastMessageText:), (IMP)&_logos_method$_ungrouped$WWKConversationWrapper$___setLastMessageText$, (IMP*)&_logos_orig$_ungrouped$WWKConversationWrapper$___setLastMessageText$);Class _logos_class$_ungrouped$WWKConversationViewController = objc_getClass("WWKConversationViewController"); MSHookMessageEx(_logos_class$_ungrouped$WWKConversationViewController, @selector(initWithConversation:), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$initWithConversation$, (IMP*)&_logos_orig$_ungrouped$WWKConversationViewController$initWithConversation$);{ char _typeEncoding[1024]; unsigned int i = 0; _typeEncoding[i] = 'v'; i += 1; _typeEncoding[i] = '@'; i += 1; _typeEncoding[i] = ':'; i += 1; memcpy(_typeEncoding + i, @encode(UISwitch *), strlen(@encode(UISwitch *))); i += strlen(@encode(UISwitch *)); _typeEncoding[i] = '\0'; class_addMethod(_logos_class$_ungrouped$WWKConversationViewController, @selector(my_swtAction:), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$my_swtAction$, _typeEncoding); }MSHookMessageEx(_logos_class$_ungrouped$WWKConversationViewController, @selector(viewDidLoad), (IMP)&_logos_method$_ungrouped$WWKConversationViewController$viewDidLoad, (IMP*)&_logos_orig$_ungrouped$WWKConversationViewController$viewDidLoad);Class _logos_class$_ungrouped$WWKMessage = objc_getClass("WWKMessage"); MSHookMessageEx(_logos_class$_ungrouped$WWKMessage, @selector(initWithMessage:), (IMP)&_logos_method$_ungrouped$WWKMessage$initWithMessage$, (IMP*)&_logos_orig$_ungrouped$WWKMessage$initWithMessage$);Class _logos_class$_ungrouped$WXCCommonUtil = objc_getClass("WXCCommonUtil"); Class _logos_metaclass$_ungrouped$WXCCommonUtil = object_getClass(_logos_class$_ungrouped$WXCCommonUtil); MSHookMessageEx(_logos_metaclass$_ungrouped$WXCCommonUtil, @selector(_wxc_logConvert:level:function:), (IMP)&_logos_meta_method$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$, (IMP*)&_logos_meta_orig$_ungrouped$WXCCommonUtil$_wxc_logConvert$level$function$);Class _logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow = objc_getClass("WWRedEnvOpenHongBaoWindow"); { char _typeEncoding[1024]; unsigned int i = 0; memcpy(_typeEncoding + i, @encode(BOOL), strlen(@encode(BOOL))); i += strlen(@encode(BOOL)); _typeEncoding[i] = '@'; i += 1; _typeEncoding[i] = ':'; i += 1; _typeEncoding[i] = '\0'; class_addMethod(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(start), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$start, _typeEncoding); }{ char _typeEncoding[1024]; unsigned int i = 0; _typeEncoding[i] = 'v'; i += 1; _typeEncoding[i] = '@'; i += 1; _typeEncoding[i] = ':'; i += 1; memcpy(_typeEncoding + i, @encode(BOOL), strlen(@encode(BOOL))); i += strlen(@encode(BOOL)); _typeEncoding[i] = '\0'; class_addMethod(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(setStart:), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setStart$, _typeEncoding); }{ char _typeEncoding[1024]; unsigned int i = 0; _typeEncoding[i] = 'v'; i += 1; _typeEncoding[i] = '@'; i += 1; _typeEncoding[i] = ':'; i += 1; _typeEncoding[i] = '\0'; class_addMethod(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(p__startOpenRedPackage), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$p__startOpenRedPackage, _typeEncoding); }MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(_initUI), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$_initUI, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$_initUI);MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(setQyhbSubType:), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$setQyhbSubType$);MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(startOpenHongbaoAnimation), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$startOpenHongbaoAnimation);MSHookMessageEx(_logos_class$_ungrouped$WWRedEnvOpenHongBaoWindow, @selector(playOpenSuccessVoice), (IMP)&_logos_method$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice, (IMP*)&_logos_orig$_ungrouped$WWRedEnvOpenHongBaoWindow$playOpenSuccessVoice);} }
#line 180 "/Users/lzh/Desktop/TestDemo/MyWeWork/MyWeWorkDylib/MyWeWorkDylib.xm"
