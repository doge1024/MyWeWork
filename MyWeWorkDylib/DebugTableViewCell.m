//
//  DebugTableViewCell.m
//  MyWeWorkDylib
//
//  Created by lzh on 2020/1/21.
//  Copyright © 2020 harddog. All rights reserved.
//

#import "DebugTableViewCell.h"
#import <Masonry/Masonry.h>

@implementation DebugTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        
        self.titleLabel = [[UILabel alloc] init];
        self.titleLabel.font = [UIFont systemFontOfSize:17];
        [self.titleLabel setContentHuggingPriority:UILayoutPriorityRequired forAxis:UILayoutConstraintAxisHorizontal];
        [self.contentView addSubview:self.titleLabel];
        self.selectionStyle = UITableViewCellSelectionStyleNone;
        
        [self.contentView mas_makeConstraints:^(MASConstraintMaker *make) {
            make.left.equalTo(@16);
            make.right.equalTo(@-16);
            make.top.bottom.equalTo(self);
        }];
        
        [self.titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.left.equalTo(self.contentView);
            make.centerY.equalTo(self.contentView.mas_centerY);
        }];
    }
    return self;
}

- (void)prepareForReuse {
    [super prepareForReuse];
    [self.accessoryView removeFromSuperview];
    self.accessoryView = nil;
}

- (void)setModel:(DebugCellModel *)model {
    _model = model;
    
    self.titleLabel.text = model.leftTitle;
    [self.contentView addSubview:model.rightView];
    
    [model.rightView mas_remakeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(self.contentView);
        make.centerY.equalTo(self.contentView.mas_centerY);
    }];

    [self setNeedsLayout];
    [self layoutIfNeeded];
    if (model.layoutAction) {
        model.layoutAction(self, model);
    }
}

@end
