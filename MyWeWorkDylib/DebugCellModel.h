//
//  DebugCellModel.h
//  MyWeWorkDylib
//
//  Created by lzh on 2020/1/21.
//  Copyright © 2020 harddog. All rights reserved.
//

#import <UIKit/UIKit.h>

@class DebugCellModel;

NS_ASSUME_NONNULL_BEGIN

typedef void (^CellAction)(DebugCellModel *model);

typedef void (^CellLayoutAction)(__kindof UITableViewCell *cell, DebugCellModel *model);

@interface DebugCellModel : NSObject

@property(nonatomic, strong) NSString *leftTitle;

@property(nonatomic, strong) UIView *rightView;

@property(nonatomic, copy) CellAction action;

@property(nonatomic, copy) CellLayoutAction layoutAction;

@end

NS_ASSUME_NONNULL_END
