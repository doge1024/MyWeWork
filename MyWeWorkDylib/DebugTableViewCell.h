//
//  DebugTableViewCell.h
//  MyWeWorkDylib
//
//  Created by lzh on 2020/1/21.
//  Copyright © 2020 harddog. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DebugCellModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface DebugTableViewCell : UITableViewCell

@property(nonatomic, strong) DebugCellModel *model;

@property(nonatomic, strong) UILabel *titleLabel;

@end

NS_ASSUME_NONNULL_END
