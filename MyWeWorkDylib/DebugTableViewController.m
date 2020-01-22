//
//  DebugTableViewController.m
//  MyWeWorkDylib
//
//  Created by lzh on 2020/1/21.
//  Copyright © 2020 harddog. All rights reserved.
//

#import "DebugTableViewController.h"

@interface DebugTableViewController () <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) UITableView *tableView;

@property (nonatomic, strong) UIButton *closeBtn;

@property(nonatomic, strong) DebugCellModel *redPacketModel;

@property(nonatomic, strong) DebugCellModel *lookRedPacketModel;

@property(nonatomic, strong) DebugCellModel *waitTimeModel;

#ifdef DEBUG
@property(nonatomic, strong) DebugCellModel *openDebugModel;
#endif

@property(nonatomic, strong) NSArray *items;

@property(nonatomic, strong) UILabel *tipsLabel;

@end

@implementation DebugTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self initViews];
    [self initActions];
    [self layoutViews];
}

- (void)initViews {
    
    self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStylePlain];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self.tableView registerClass:[DebugTableViewCell class] forCellReuseIdentifier:NSStringFromClass([DebugTableViewCell class])];
    [self.view addSubview:self.tableView];
    self.tableView.keyboardDismissMode = UIScrollViewKeyboardDismissModeOnDrag;
    
    NSMutableArray *array = [NSMutableArray array];
    
    DebugCellModel *redPacketModel = [[DebugCellModel alloc] init];
    redPacketModel.leftTitle = @"红包开关";
    UISwitch *openRedSwitch = [[UISwitch alloc] init];
    redPacketModel.rightView = openRedSwitch;
    [array addObject:redPacketModel];
    self.redPacketModel = redPacketModel;
    
    
    DebugCellModel *lookRedPacketModel = [[DebugCellModel alloc] init];
    lookRedPacketModel.leftTitle = @"查看红包详情";
    UISwitch *lookRedPacketSwitch = [[UISwitch alloc] init];
    lookRedPacketModel.rightView = lookRedPacketSwitch;
    [array addObject:lookRedPacketModel];
    self.lookRedPacketModel = lookRedPacketModel;
    
#ifdef DEBUG
    DebugCellModel *openDebugModel = [[DebugCellModel alloc] init];
    openDebugModel.leftTitle = @"打开Debug";
    UISwitch *openDebugSwitch = [[UISwitch alloc] init];
    openDebugModel.rightView = openDebugSwitch;
    [array addObject:openDebugModel];
    self.openDebugModel = openDebugModel;
#endif
    
    DebugCellModel *waitTimeModel = [[DebugCellModel alloc] init];
    waitTimeModel.leftTitle = @"延时抢(s)";
    UITextField *waitTimeTF = [[UITextField alloc] init];
    waitTimeTF.placeholder = @"如数字0.5";
    waitTimeTF.keyboardType = UIKeyboardTypeDecimalPad;
    waitTimeTF.textAlignment = NSTextAlignmentRight;
    waitTimeTF.text = [HookTool sharedInstance].waitTime;
    waitTimeModel.layoutAction = ^(__kindof UITableViewCell * _Nonnull cell, DebugCellModel * _Nonnull model) {
        [model.rightView mas_remakeConstraints:^(MASConstraintMaker *make) {
            make.height.equalTo(@44);
            make.width.equalTo(@84);
            make.left.equalTo(cell.textLabel.mas_right);
            make.right.equalTo(cell.contentView);
        }];
    };
    waitTimeModel.rightView = waitTimeTF;
    [array addObject:waitTimeModel];
    self.waitTimeModel = waitTimeModel;
    
    self.items = array;
    
    UIButton *closeBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [closeBtn setTitle:@" 关闭 " forState:UIControlStateNormal];
    [closeBtn setBackgroundColor:[UIColor colorWithWhite:0.2 alpha:1]];
    [closeBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.closeBtn = closeBtn;
    [self.view addSubview:self.closeBtn];
    
    self.tableView.tableFooterView = [[UIView alloc] init];
    
    self.tipsLabel = [[UILabel alloc] init];
    self.tipsLabel.text = @"抢红包只在聊天页面生效";
    self.tipsLabel.font = [UIFont systemFontOfSize:10];
    [self.view addSubview:self.tipsLabel];
}

- (void)initActions {
    @weakify(self);
    
    UISwitch *openRedSwitch = ((UISwitch *)self.redPacketModel.rightView);
    UISwitch *openDetailSwitch = ((UISwitch *)self.lookRedPacketModel.rightView);
    
    RACChannelTerminal *switchTerminal = openRedSwitch.rac_newOnChannel;
    RACChannelTerminal *startTerminal = [[RACKVOChannel alloc] initWithTarget:[HookTool sharedInstance] keyPath:@"startSnatchHB" nilValue:nil][@"followingTerminal"];
    
    [switchTerminal subscribe:startTerminal];
    [startTerminal subscribe:switchTerminal];
    
    RACChannelTerminal *openDetailSwitchTerminal = openDetailSwitch.rac_newOnChannel;
    RACChannelTerminal *canToRedPackageVCTerminal = [[RACKVOChannel alloc] initWithTarget:[HookTool sharedInstance] keyPath:@"canToRedPackageVC" nilValue:nil][@"followingTerminal"];
    
    [openDetailSwitchTerminal subscribe:canToRedPackageVCTerminal];
    [canToRedPackageVCTerminal subscribe:openDetailSwitchTerminal];
    
    // 打开抢红包时，关闭去详情
    [[openRedSwitch rac_newOnChannel] subscribeNext:^(NSNumber * _Nullable x) {
        if ([x boolValue]) {
            [HookTool sharedInstance].canToRedPackageVC = NO;
        } else {
            [HookTool sharedInstance].canToRedPackageVC = YES;
        }
    }];
    
    // 关闭去详情时，打开抢红包
    [[openDetailSwitch rac_newOnChannel] subscribeNext:^(NSNumber * _Nullable x) {
        if ([x boolValue]) {
            [HookTool sharedInstance].startSnatchHB = NO;
        } else {
            [HookTool sharedInstance].startSnatchHB = YES;
        }
    }];

    openRedSwitch.on = [HookTool sharedInstance].startSnatchHB;
    [openRedSwitch sendActionsForControlEvents:UIControlEventValueChanged];
    
#ifdef DEBUG
    UISwitch *debugSwitch = ((UISwitch *)self.openDebugModel.rightView);
    [[debugSwitch rac_newOnChannel] subscribeNext:^(NSNumber * _Nullable x) {
        // show FLEX
        if ([x boolValue]) {
            [[FLEXManager sharedManager] showExplorer];
        } else {
            [[FLEXManager sharedManager] hideExplorer];
        }
    }];
#endif
    
    UITextField *waitTimeTF = (UITextField *)self.waitTimeModel.rightView;
    [[[[waitTimeTF rac_signalForControlEvents:UIControlEventEditingDidEnd] map:^id _Nullable(__kindof UITextField * _Nullable x) {
        return x.text;
    }] takeUntil:waitTimeTF.rac_willDeallocSignal]
     subscribeNext:^(__kindof NSString * _Nullable x) {
        if ([x doubleValue] > 0) {
            [HookTool sharedInstance].waitTime = x;
        } else {
            [HookTool sharedInstance].waitTime = nil;
        }
    }];
    
    self.closeBtn.rac_command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
        @strongify(self);
        [self.view.window setHidden:!self.view.window.hidden];
        return [RACSignal empty];
    }];
}

- (void)layoutViews {
    [self.tableView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.closeBtn.mas_bottom);
        make.left.equalTo(self.view);
        make.right.equalTo(self.view);
        make.bottom.equalTo(self.view);
    }];

    [self.closeBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.height.equalTo(@30);
        make.width.equalTo(@60);
        make.right.equalTo(self.view.mas_right);
        make.top.equalTo(self.view.mas_top);
    }];
    
    [self.tipsLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.view);
        make.top.equalTo(self.view);
    }];
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    [super touchesBegan:touches withEvent:event];
    [self.view endEditing:YES];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.items.count;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *ids = NSStringFromClass([DebugTableViewCell class]);
    DebugTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ids forIndexPath:indexPath];
    
    if (cell) {
        cell.model = self.items[indexPath.row];
    }
    
    return cell;
}


@end
