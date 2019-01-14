var currScale = 1,
    isLandscape = false,
    shouldScaleToFix = false,
    screenWidth = screen.width;
QMail.Editor.prototype._selectionToEndWhenWired = false;
QMail.config.entranceType = "appmsg";
QMail.NativeNotifier.validateMessages.keyUp = true;