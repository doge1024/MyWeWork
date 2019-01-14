//即将废弃的代码，暂时保存在这里

// QMail.Editor.prototype._createAudioElement = function(option) {

//     var qmAudioDiv = document.createElement('div');
//     qmAudioDiv.setAttribute("qmsrc",option.src);
//     qmAudioDiv.setAttribute("qmsize", option.size);
//     qmAudioDiv.setAttribute("qmduration", option.duration);
//     qmAudioDiv.setTitle(option.title);
//     qmAudioDiv.addClass(this.QM_INSERT_AUDIO_CLASSNAME);
//     qmAudioDiv.addClass(this.QM_INSERT_AUDIO_END_CLASSNAME);
//     qmAudioDiv.setAttribute("contenteditable", "false");

//     var innerHTML = ['<div class="qmaudio-content">',
//                         '<span class="imgblock"></span>',
//                         '<span class="qmaudio_title">' + option.title + '</span>',
//                         '<span class="qmaudio_size">' + option.size + 'KBytes</span>',
//                     '</div>'].join('');

//     qmAudioDiv.innerHTML = innerHTML;
//     return qmAudioDiv;
// }

// QMail.Editor.prototype.insertAudio = function(option) {

//     var wrapper  = document.createElement('div');
//     var audioElm = this._createAudioElement(option);

//     wrapper.appendChild(audioElm);
//     wrapper.appendChild(document.createElement('div'));

//     var appendWrapper = this.insertElement(wrapper);
//     audioElem = null;

//     if(appendWrapper) {
//         audioElem = appendWrapper.querySelector('.' + this.QM_INSERT_AUDIO_CLASSNAME);
//         //设置光标到节点之后
//         this.setCaretAfterElement(audioElem);
//         //保存当前光标用于下次插入
//         this.storeCurrentSelection();
//         //添加完后调整滚动区域
//         this.scrollToCaret(100);
//     }

//     return audioElem;
// }

// QMail.Editor.prototype.playAudio = function(audioElem) {

//     var self = QMail.Viewer.instance.editor;

//     if(self._currentPlayingAudioElement) {
//         self.stopAudio(self._currentPlayingAudioElement);
//     }

//     if(audioElem) {
//         audioElem.removeClass(self.QM_INSERT_AUDIO_END_CLASSNAME)
//              .addClass(self.QM_INSERT_AUDIO_PLAY_CLASSNAME);
//         audioElem.playing = true;
//         self._currentPlayingAudioElement = audioElem;
//         QMail.NativeNotifier.notify('playAudio' , audioElem.getAttribute('qmsrc'));
//     }
// }

// QMail.Editor.prototype.stopAudio = function(audioElem) {
    
//     var self = QMail.Viewer.instance.editor;

//     if(!audioElem) {
//         audioElem = self._currentPlayingAudioElement;
//     }

//     if(audioElem) {
//         audioElem.playing = false;
//         audioElem.removeClass(self.QM_INSERT_AUDIO_PLAY_CLASSNAME)
//                  .addClass(self.QM_INSERT_AUDIO_END_CLASSNAME);
//         QMail.NativeNotifier.notify('stopAudio' , audioElem.getAttribute('qmsrc'));
//     }
    
//     if(audioElem && audioElem === self._currentPlayingAudioElement) {
//         self._currentPlayingAudioElement = null;
//     }
// }