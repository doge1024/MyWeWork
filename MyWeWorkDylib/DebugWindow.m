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

@interface DebugWindow ()

@property (nonatomic, strong) UISwitch *openRedSwitch;

@end

@implementation DebugWindow

- (instancetype)init {
    if (self = [super init]) {
        [self initViews];
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
    self.openRedSwitch = [[UISwitch alloc] init];
    [self addSubview:self.openRedSwitch];
    RACChannelTo(self.openRedSwitch, on) = RACChannelTo([HookTool sharedInstance], startSnatchHB);
    
    UIButton *closeBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [closeBtn setTitle:@" 关闭 " forState:UIControlStateNormal];
    [closeBtn setBackgroundColor:[UIColor colorWithWhite:0.2 alpha:1]];
    [closeBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [self addSubview:closeBtn];
    
    @weakify(self);
    closeBtn.rac_command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
        @strongify(self);
        [self setHidden:!self.hidden];
        return [RACSignal empty];
    }];
    
    // layout
    CGRect bounds = [UIScreen mainScreen].bounds;
    // 没有父视图不能使用masonry
    self.frame = CGRectMake(0, 0, bounds.size.width / 2, bounds.size.height / 3);
    self.center = CGPointMake(bounds.size.width / 2, bounds.size.height / 2);
    
    [startLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(@15);
        make.top.equalTo(@30);
    }];
    
    [self.openRedSwitch mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(self).offset(-15);
        make.centerY.equalTo(startLabel);
    }];
    
    [closeBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.bottom.equalTo(self).offset(-15);
        make.centerX.equalTo(self);
    }];
}

@end
