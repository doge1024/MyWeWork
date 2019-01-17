//
//     Generated by class-dump 3.5 (64 bit) (Debug version compiled Sep 17 2017 16:24:48).
//
//     class-dump is Copyright (C) 1997-1998, 2000-2001, 2004-2015 by Steve Nygard.
//

#import <UIKit/UIView.h>

@class UIButton, UIColor, UIFont, UIImageView, UILabel, UIScrollView;
@protocol QMUIEmptyViewLoadingViewProtocol;

@interface QMUIEmptyView : UIView
{
    UIView<QMUIEmptyViewLoadingViewProtocol> *_loadingView;
    UIImageView *_imageView;
    UILabel *_textLabel;
    UILabel *_detailTextLabel;
    UIButton *_actionButton;
    double _verticalOffset;
    UIFont *_textLabelFont;
    UIFont *_detailTextLabelFont;
    UIFont *_actionButtonFont;
    UIColor *_textLabelTextColor;
    UIColor *_detailTextLabelTextColor;
    UIColor *_actionButtonTitleColor;
    UIView *_contentView;
    UIScrollView *_scrollView;
    struct UIEdgeInsets _imageViewInsets;
    struct UIEdgeInsets _loadingViewInsets;
    struct UIEdgeInsets _textLabelInsets;
    struct UIEdgeInsets _detailTextLabelInsets;
    struct UIEdgeInsets _actionButtonInsets;
}

+ (void)setDefaultAppearance;
+ (void)initialize;
@property(retain, nonatomic) UIScrollView *scrollView; // @synthesize scrollView=_scrollView;
@property(readonly, nonatomic) UIView *contentView; // @synthesize contentView=_contentView;
@property(retain, nonatomic) UIColor *actionButtonTitleColor; // @synthesize actionButtonTitleColor=_actionButtonTitleColor;
@property(retain, nonatomic) UIColor *detailTextLabelTextColor; // @synthesize detailTextLabelTextColor=_detailTextLabelTextColor;
@property(retain, nonatomic) UIColor *textLabelTextColor; // @synthesize textLabelTextColor=_textLabelTextColor;
@property(retain, nonatomic) UIFont *actionButtonFont; // @synthesize actionButtonFont=_actionButtonFont;
@property(retain, nonatomic) UIFont *detailTextLabelFont; // @synthesize detailTextLabelFont=_detailTextLabelFont;
@property(retain, nonatomic) UIFont *textLabelFont; // @synthesize textLabelFont=_textLabelFont;
@property(nonatomic) double verticalOffset; // @synthesize verticalOffset=_verticalOffset;
@property(nonatomic) struct UIEdgeInsets actionButtonInsets; // @synthesize actionButtonInsets=_actionButtonInsets;
@property(nonatomic) struct UIEdgeInsets detailTextLabelInsets; // @synthesize detailTextLabelInsets=_detailTextLabelInsets;
@property(nonatomic) struct UIEdgeInsets textLabelInsets; // @synthesize textLabelInsets=_textLabelInsets;
@property(nonatomic) struct UIEdgeInsets loadingViewInsets; // @synthesize loadingViewInsets=_loadingViewInsets;
@property(nonatomic) struct UIEdgeInsets imageViewInsets; // @synthesize imageViewInsets=_imageViewInsets;
@property(readonly, nonatomic) UIButton *actionButton; // @synthesize actionButton=_actionButton;
@property(readonly, nonatomic) UILabel *detailTextLabel; // @synthesize detailTextLabel=_detailTextLabel;
@property(readonly, nonatomic) UILabel *textLabel; // @synthesize textLabel=_textLabel;
@property(readonly, nonatomic) UIImageView *imageView; // @synthesize imageView=_imageView;
@property(retain, nonatomic) UIView<QMUIEmptyViewLoadingViewProtocol> *loadingView; // @synthesize loadingView=_loadingView;
- (void).cxx_destruct;
- (void)setActionButtonTitle:(id)arg1;
- (void)setDetailTextLabelText:(id)arg1;
- (void)setTextLabelText:(id)arg1;
- (void)setImage:(id)arg1;
- (void)setLoadingViewHidden:(_Bool)arg1;
- (void)updateDetailTextLabelWithText:(id)arg1;
- (struct CGSize)sizeThatContentViewFits;
- (void)layoutSubviews;
- (void)didInitialized;
- (id)initWithCoder:(id)arg1;
- (id)initWithFrame:(struct CGRect)arg1;

@end
