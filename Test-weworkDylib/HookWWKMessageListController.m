//
//  HookWWKMessageListController.m
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/19.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import "HookWWKMessageListController.h"

@implementation HookWWKMessageListController

+ (void)addMyViewFor:(UIViewController *)vc {
    
    [[[vc rac_signalForSelector:@selector(viewDidAppear:)] takeUntil:vc.rac_willDeallocSignal] subscribeNext:^(RACTuple * _Nullable x) {
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        
        CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
        CGFloat width = 80;
        button.frame = CGRectMake(screenWidth - width, 100, width, 40);
        button.backgroundColor = [UIColor orangeColor];
        [button setTitle:@"打开" forState:UIControlStateNormal];
        [vc.view addSubview:button];
        button.rac_command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
            return [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
                NSLog(@"123");
                [subscriber sendCompleted];
                return [RACDisposable disposableWithBlock:^{}];
            }];
        }];
    }];
}
    
@end


CHDeclareClass(WWKMessageListController)
CHDeclareClass(WWKConversationViewController)
CHDeclareClass(WWKMessageRedEnvelopes)

CHOptimizedMethod(2, self, NSInteger, WWKMessageListController, p_findDataWrapperType, NSUInteger, type, andConvId, NSInteger, convid){
    //get origin value
    NSInteger find = CHSuper(2, WWKMessageListController, p_findDataWrapperType, type, andConvId, convid);
    
    NSLog(@"find is:%ld", (long)find);
    
    //    //get property
    //    NSString* password = CHIvar(self,_password,__strong NSString*);
    //
    
    NSLog(@"type============ %ld", type);
    NSLog(@"convId============ %ld", convid);
    
    //change the value
    return find;
}

CHOptimizedMethod0(self, void, WWKConversationViewController, loadView){
    
    UIViewController *vc = (UIViewController *)self;
    if([vc isMemberOfClass:NSClassFromString(@"WWKConversationViewController")]) {
        // add my view
        [HookWWKMessageListController addMyViewFor:vc];
    }
    
    CHSuper0(WWKConversationViewController, loadView);
}

// 拦截设置红包ID
CHOptimizedMethod1(self, void, WWKMessageRedEnvelopes, setHongbaoID, NSString *, hongbaoID){
    
    CHSuper1(WWKMessageRedEnvelopes, setHongbaoID, hongbaoID);
}

CHConstructor{
    CHLoadLateClass(WWKMessageListController);
    CHClassHook(2, WWKMessageListController, p_findDataWrapperType, andConvId);
    
    CHLoadLateClass(WWKConversationViewController);
    CHClassHook0(WWKConversationViewController, loadView);
    
    CHLoadLateClass(WWKMessageRedEnvelopes);
    CHClassHook1(WWKMessageRedEnvelopes, setHongbaoID);
}
