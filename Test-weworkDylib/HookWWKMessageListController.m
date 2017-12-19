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
    
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    button.frame = CGRectMake(100, 100, 80, 40);
    button.backgroundColor = [UIColor orangeColor];
    [vc.view addSubview:button];
    button.rac_command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
        return [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
            NSLog(@"123");
            [subscriber sendCompleted];
            return [RACDisposable disposableWithBlock:nil];
        }];
    }];
}
    
@end


CHDeclareClass(WWKMessageListController)
CHDeclareClass(WWKConversationViewController)

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

CHOptimizedMethod1(self, void, WWKConversationViewController, viewDidAppear, BOOL, animted){
    CHSuper1(WWKConversationViewController, viewDidAppear, animted);
    
    // add my view
    UIViewController *viewController = (UIViewController *)self;
    [HookWWKMessageListController addMyViewFor:viewController];
}

CHConstructor{
    CHLoadLateClass(WWKMessageListController);
    CHClassHook(2, WWKMessageListController, p_findDataWrapperType, andConvId);
    
    CHLoadLateClass(WWKConversationViewController);
    CHClassHook1(WWKConversationViewController, viewDidAppear);
}
