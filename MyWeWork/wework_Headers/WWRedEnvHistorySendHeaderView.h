//
//     Generated by class-dump 3.5 (64 bit) (Debug version compiled Sep 17 2017 16:24:48).
//
//     class-dump is Copyright (C) 1997-1998, 2000-2001, 2004-2015 by Steve Nygard.
//

#import "WWRedEnvHistoryHeaderView.h"

@class UILabel;

@interface WWRedEnvHistorySendHeaderView : WWRedEnvHistoryHeaderView
{
    UILabel *_mTotalMoneyLabel;
    UILabel *_mTotalMoneyUnitLabel;
    UILabel *_mTotalCountLabel;
}

@property(retain, nonatomic) UILabel *mTotalCountLabel; // @synthesize mTotalCountLabel=_mTotalCountLabel;
@property(retain, nonatomic) UILabel *mTotalMoneyUnitLabel; // @synthesize mTotalMoneyUnitLabel=_mTotalMoneyUnitLabel;
@property(retain, nonatomic) UILabel *mTotalMoneyLabel; // @synthesize mTotalMoneyLabel=_mTotalMoneyLabel;
- (void).cxx_destruct;
- (void)layoutSubviews;
- (void)updateWithRecordData:(const scoped_refptr_c706adb8 *)arg1 wxNickName:(id)arg2;
- (void)initUI;
- (void)dealloc;
- (id)initWithFrame:(struct CGRect)arg1;

@end
