//
//  DebugWindow.m
//  Test-weworkDylib
//
//  Created by lzh on 2017/12/23.
//  Copyright © 2017年 lzh. All rights reserved.
//

#import "DebugWindow.h"
#import "DebugTableViewController.h"

@interface DebugWindow ()

@end

@implementation DebugWindow

+ (instancetype)getWindow {
    static DebugWindow *window = nil;
    if (window == nil) {
        window = [[DebugWindow alloc] init];
        window.rootViewController = [[DebugTableViewController alloc] init];
    }
    return window;
}

- (instancetype)init {
    if (self = [super init]) {
        [self initViews];
        [self layoutViews];
    }
    return self;
}

- (void)initViews {
    self.windowLevel = UIWindowLevelStatusBar;
    self.backgroundColor = [UIColor colorWithWhite:0.8 alpha:0.8];
    self.layer.borderWidth = 1;
    self.layer.borderColor = [UIColor blackColor].CGColor;
}

- (void)layoutViews {
    // layout
    CGRect bounds = [UIScreen mainScreen].bounds;
    // 没有父视图不能使用masonry
    self.frame = CGRectMake(0, 0, bounds.size.width * 0.7, bounds.size.height * 0.6);
    self.center = CGPointMake(bounds.size.width / 2, bounds.size.height / 2);
}

@end
