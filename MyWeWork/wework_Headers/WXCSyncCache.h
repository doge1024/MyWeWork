//
//     Generated by class-dump 3.5 (64 bit) (Debug version compiled Sep 17 2017 16:24:48).
//
//     class-dump is Copyright (C) 1997-1998, 2000-2001, 2004-2015 by Steve Nygard.
//

#import <Foundation/NSObject.h>

#import "WXCNetWorkDelegate-Protocol.h"

@class NSMutableArray, NSString, NSTimer;

@interface WXCSyncCache : NSObject <WXCNetWorkDelegate>
{
    int _type;
    NSMutableArray *_dataArray;
    NSTimer *_timer;
    _Bool _isSending;
}

- (void)cancelTimeOutDetect;
- (void)startTimeOutDetect;
- (void)notifySyncFailOnMain;
- (void)handleSyncTimeOut;
- (void)clearDataAndNotify;
- (void)setIsSending:(_Bool)arg1;
- (void)onRespData:(id)arg1 taskId:(int)arg2 retCode:(int)arg3 retBuf:(id)arg4 backfillData:(id)arg5;
- (void)sendData;
- (int)getCacheExistCount;
- (void)addDataNonPri:(id)arg1;
- (void)dealloc;
- (id)initWithSyncType:(int)arg1;

// Remaining properties
@property(readonly, copy) NSString *debugDescription;
@property(readonly, copy) NSString *description;
@property(readonly) unsigned long long hash;
@property(readonly) Class superclass;

@end
