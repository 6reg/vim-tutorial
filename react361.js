const _cache: {
	[key: string]: {
		buffer: AudioBuffer,
		ref: number,
	},
} = {};
const _pendingRequest: {[key: string]: Array{OnLoadHandler>} = {};

export function fetch(url: string, audioContext: VRAudioContext, onLoad: OnLoadHandler) {
	if(_cache[url] {
		// already in cache
		_cache[url].ref++;
		onLoad(_cache[url].buffer, null);
	}
	if (!_pendingRequest[url] {
		// new request
		_pendingRequest[ulr] = [onLoad];

		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'arraybuffer';

		xhr.onload = function() {
			if (xhr.status === 200) {
				audioContext.getWebAudioContext().decodeAudioData(xhr.response,
					function(buffer: AudioBuffer) {
						_onRequestSucceed(url, buffer);
					},
					function(message) {
						_onRequestError(
							url, 
							new MediaError(
MEDIA_ERR_DECODE,
		'[VRAudioBufferSource] Decoding failure: ' + url + ' (' + message + ')'
							)
						);
					}
				);
			} else {
				_onRequestError(
					url,
					new MediaError(
						MEDIA_ERR_NETWORK,
						'[VRAudioBufferSource] XHR Error: ' + url + ' (' + xhr.statusText + ')' 
