//
//     Generated by class-dump 3.5 (64 bit) (Debug version compiled Sep 17 2017 16:24:48).
//
//     class-dump is Copyright (C) 1997-1998, 2000-2001, 2004-2015 by Steve Nygard.
//

#import "MJRefreshBackFooter.h"

@class NSMutableDictionary, UILabel;

@interface MJRefreshBackStateFooter : MJRefreshBackFooter
{
    UILabel *_stateLabel;
    NSMutableDictionary *_stateTitles;
}

@property(retain, nonatomic) NSMutableDictionary *stateTitles; // @synthesize stateTitles=_stateTitles;
- (void).cxx_destruct;
- (void)setState:(int)arg1;
- (void)placeSubviews;
- (void)prepare;
- (void)setTitle:(id)arg1 forState:(int)arg2;
@property(readonly, nonatomic) __weak UILabel *stateLabel;

@end
