//
//  *@项目名称:  MyWeWork
//  *@文件名称:  DebugWindow.m
//  *@Date 2019/1/17
//  *@Author lzh 
//  *@Copyright © :  2014-2019 X-Financial Inc.   All rights reserved.
//  *注意：本内容仅限于小赢科技有限责任公内部传阅，禁止外泄以及用于其他的商业目的。
//

#import "DebugWindow.h"
#import <ReactiveObjC/ReactiveObjC.h>
#import "HookTool.h"
#import <Masonry/Masonry.h>
#ifdef DEBUG
#import <FLEX/FLEX.h>
#endif

@interface DebugWindow ()

@property (nonatomic, strong) UILabel *startLabel;
@property (nonatomic, strong) UISwitch *openRedSwitch;

@property (nonatomic, strong) UILabel *openDetailLabel;
@property (nonatomic, strong) UISwitch *openDetailSwitch;

@property (nonatomic, strong) UILabel *debugLabel;
@property (nonatomic, strong) UISwitch *debugSwitch;

@property (nonatomic, strong) UIButton *closeBtn;

@end

@implementation DebugWindow

+ (instancetype)getWindow {
    static DebugWindow *window = nil;
    if (window == nil) {
        window = [[DebugWindow alloc] init];
    }
    return window;
}

- (instancetype)init {
    if (self = [super init]) {
        [self initViews];
        [self initActions];
        [self layoutViews];
    }
    return self;
}

- (void)initViews {
    self.windowLevel = UIWindowLevelStatusBar;
    self.backgroundColor = [UIColor colorWithWhite:1 alpha:0.8];
    
    UILabel *startLabel = [[UILabel alloc] init];
    startLabel.text = @"红包开关";
    startLabel.font = [UIFont systemFontOfSize:17];
    [self addSubview:startLabel];
    self.startLabel = startLabel;
    
    self.openRedSwitch = [[UISwitch alloc] init];
    [self addSubview:self.openRedSwitch];
    
    UILabel *openDetailLabel = [[UILabel alloc] init];
    openDetailLabel.text = @"查看红包详情";
    openDetailLabel.font = [UIFont systemFontOfSize:17];
    [self addSubview:openDetailLabel];
    self.openDetailLabel = openDetailLabel;
    
    self.openDetailSwitch = [[UISwitch alloc] init];
    [self addSubview:self.openDetailSwitch];
    
#ifdef DEBUG
    UILabel *debugLabel = [[UILabel alloc] init];
    debugLabel.text = @"打开Debug";
    debugLabel.font = [UIFont systemFontOfSize:17];
    [self addSubview:debugLabel];
    self.debugLabel = debugLabel;
    
    self.debugSwitch = [[UISwitch alloc] init];
    [self addSubview:self.debugSwitch];
#endif
    
    UIButton *closeBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [closeBtn setTitle:@" 关闭 " forState:UIControlStateNormal];
    [closeBtn setBackgroundColor:[UIColor colorWithWhite:0.2 alpha:1]];
    [closeBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [self addSubview:closeBtn];
    self.closeBtn = closeBtn;
}

- (void)initActions {
    @weakify(self);
    
    RACChannelTerminal *switchTerminal = self.openRedSwitch.rac_newOnChannel;
    RACChannelTerminal *startTerminal = [[RACKVOChannel alloc] initWithTarget:[HookTool sharedInstance] keyPath:@"startSnatchHB" nilValue:nil][@"followingTerminal"];
    
    [switchTerminal subscribe:startTerminal];
    [startTerminal subscribe:switchTerminal];
    
    RACChannelTerminal *openDetailSwitchTerminal = self.openDetailSwitch.rac_newOnChannel;
    RACChannelTerminal *canToRedPackageVCTerminal = [[RACKVOChannel alloc] initWithTarget:[HookTool sharedInstance] keyPath:@"canToRedPackageVC" nilValue:nil][@"followingTerminal"];
    
    [openDetailSwitchTerminal subscribe:canToRedPackageVCTerminal];
    [canToRedPackageVCTerminal subscribe:openDetailSwitchTerminal];
    
    // 打开抢红包时，关闭去详情
    [[self.openRedSwitch rac_newOnChannel] subscribeNext:^(NSNumber * _Nullable x) {
        if ([x boolValue]) {
            [HookTool sharedInstance].canToRedPackageVC = NO;
        } else {
            [HookTool sharedInstance].canToRedPackageVC = YES;
        }
    }];
    
    // 打开抢红包时，关闭去详情
    [[self.openDetailSwitch rac_newOnChannel] subscribeNext:^(NSNumber * _Nullable x) {
        if ([x boolValue]) {
            [HookTool sharedInstance].startSnatchHB = NO;
        } else {
            [HookTool sharedInstance].startSnatchHB = YES;
        }
    }];

    [self.openRedSwitch sendActionsForControlEvents:UIControlEventValueChanged];
    
#ifdef DEBUG
    [[self.debugSwitch rac_newOnChannel] subscribeNext:^(NSNumber * _Nullable x) {
        // show FLEX
        if ([x boolValue]) {
            [[FLEXManager sharedManager] showExplorer];
        } else {
            [[FLEXManager sharedManager] hideExplorer];
        }
    }];
#endif
    
    self.closeBtn.rac_command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
        @strongify(self);
        [self setHidden:!self.hidden];
        return [RACSignal empty];
    }];
}

- (void)layoutViews {
    // layout
    CGRect bounds = [UIScreen mainScreen].bounds;
    // 没有父视图不能使用masonry
    self.frame = CGRectMake(0, 0, bounds.size.width * 0.6, bounds.size.height / 3);
    self.center = CGPointMake(bounds.size.width / 2, bounds.size.height / 2);
    
    [self.startLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(@15);
        make.top.equalTo(@30);
    }];
    
    [self.openRedSwitch mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(self).offset(-15);
        make.centerY.equalTo(self.startLabel);
    }];
    
    [self.openDetailLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.startLabel);
        make.top.equalTo(self.startLabel.mas_bottom).offset(15);
    }];
    
    [self.openDetailSwitch mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(self).offset(-15);
        make.centerY.equalTo(self.openDetailLabel);
    }];
#ifdef DEBUG
    [self.debugLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.openDetailLabel);
        make.top.equalTo(self.openDetailLabel.mas_bottom).offset(15);
    }];
    
    [self.debugSwitch mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(self).offset(-15);
        make.centerY.equalTo(self.debugLabel);
    }];
#endif
    
    [self.closeBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.bottom.equalTo(self).offset(-15);
        make.centerX.equalTo(self);
    }];
}

@end
