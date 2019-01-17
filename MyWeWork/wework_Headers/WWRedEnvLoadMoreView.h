//
//     Generated by class-dump 3.5 (64 bit) (Debug version compiled Sep 17 2017 16:24:48).
//
//     class-dump is Copyright (C) 1997-1998, 2000-2001, 2004-2015 by Steve Nygard.
//

#import <UIKit/UIButton.h>

@class NSDictionary, UIActivityIndicatorView, UILabel, UIView;

@interface WWRedEnvLoadMoreView : UIButton
{
    int _mLoadStatus;
    double _mSeperatorMarginX;
    UIView *_mSeperatorView;
    NSDictionary *_mStatusTextDic;
    NSDictionary *_mStatusColorDic;
    UILabel *_mLoadTextLabel;
    UIActivityIndicatorView *_mActivityIndicator;
}

@property(retain, nonatomic) UIActivityIndicatorView *mActivityIndicator; // @synthesize mActivityIndicator=_mActivityIndicator;
@property(retain, nonatomic) UILabel *mLoadTextLabel; // @synthesize mLoadTextLabel=_mLoadTextLabel;
@property(nonatomic) int mLoadStatus; // @synthesize mLoadStatus=_mLoadStatus;
@property(retain, nonatomic) NSDictionary *mStatusColorDic; // @synthesize mStatusColorDic=_mStatusColorDic;
@property(retain, nonatomic) NSDictionary *mStatusTextDic; // @synthesize mStatusTextDic=_mStatusTextDic;
@property(retain, nonatomic) UIView *mSeperatorView; // @synthesize mSeperatorView=_mSeperatorView;
@property(nonatomic) double mSeperatorMarginX; // @synthesize mSeperatorMarginX=_mSeperatorMarginX;
- (void).cxx_destruct;
- (void)layoutSubviews;
- (void)updateFont;
- (int)getLoadStatus;
- (void)setLoadStatus:(int)arg1;
- (void)initUI;
- (void)initStatusConfig;
- (id)initWithFrame:(struct CGRect)arg1;

@end
