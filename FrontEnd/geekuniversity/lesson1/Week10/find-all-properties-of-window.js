window.onload = function () {
    let names = Object.getOwnPropertyNames(window)

    names = names.filter(x => !x.match(/^on/))
    names = names.filter(x => !x.match(/^webkit|^WebKit/))

    /**
     * ---------------------------------- WHATWG ---------------------------------------
     */
    {
        // https://dom.spec.whatwg.org
        names = names.filter(x => !["Event", "CustomEvent", "EventTarget", "AbortController", "AbortSignal", "NodeList", "HTMLCollection", "MutationObserver", "MutationRecord", "Node", "Document", "XMLDocument", "DOMImplementation", "DocumentType", "DocumentFragment", "ShadowRoot", "Element", "NamedNodeMap", "Attr", "CharacterData", "Text", "CDATASection", "ProcessingInstruction", "Comment", "StaticRange", "Range", "NodeIterator", "TreeWalker", "DOMTokenList", "addEventListener", "removeEventListener", "dispatchEvent", "NodeFilter",
            "event" // https://dom.spec.whatwg.org/#interface-window-extensions
        ].includes(x))
        names = names.filter(x => {
            try {
                return !(window[x].prototype instanceof Node)
            } catch (e) {
                return true
            }
        })
        names = names.filter(x => x !== 'Node')

        // https://html.spec.whatwg.org
        names = names.filter(x => !["window", "self", "document",
            "name", "location", "history", "customElements",
            "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar",
            "status", "close", "closed", "stop", "focus", "blur", "frames", "length", "top",
            "opener", "parent", "frameElement", "open", "navigator", "applicationCache",
            "alert", "confirm", "prompt",
            "print", "postMessage", "console"
        ].includes(x))
        // https://html.spec.whatwg.org
        names = names.filter(x => ![
            "origin", "btoa", "atob", "setTimeout", "clearTimeout", "setInterval", "clearInterval", "queueMicrotask", "createImageBitmap",
            "requestAnimationFrame", "cancelAnimationFrame"
        ].includes(x))
        // https://html.spec.whatwg.org
        names = names.filter(x => ![
            "ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp",
            "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D",
            "CloseEvent", "CustomElementRegistry", "DOMStringList", "DOMStringMap",
            "DataTransfer", "DataTransferItem", "DataTransferItemList",
            "DedicatedWorkerGlobalScope", "Document", "DragEvent",
            "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection",
            "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext",
            "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort",
            "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D",
            "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent",
            "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "TextMetrics",
            "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState",
            "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator",
            "HTMLOptionsCollection", "HTMLFormControlsCollection",
            "sessionStorage", "localStorage"
        ].includes(x))

        // https://streams.spec.whatwg.org/
        names = names.filter(x => ![
            "ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController",
            "ReadableByteStreamController", "ReadableStreamBYOBRequest",
            "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController",
            "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"
        ].includes(x))

        // https://encoding.spec.whatwg.org/
        names = names.filter(x => !["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"].includes(x))

        // https://url.spec.whatwg.org
        names = names.filter(x => !["URL", "URLSearchParams"].includes(x))

        // https://xhr.spec.whatwg.org/
        names = names.filter(x => !["XMLHttpRequestEventTarget", "XMLHttpRequestUpload", "XMLHttpRequest", "FormData", "ProgressEvent"].includes(x))

        // https://fetch.spec.whatwg.org
        names = names.filter(x => !["Headers", "Request", "Response", "fetch"].includes(x))

        // https://notifications.spec.whatwg.org/
        names = names.filter(x => !["Notification"].includes(x))

        // https://storage.spec.whatwg.org
        names = names.filter(x => !["StorageManager"].includes(x))
    }

    /**
     * ---------------------------------- Khronos ---------------------------------------
     */
    {
        // https://www.khronos.org/registry/webgl/specs/latest/2.0/
        names = names.filter(x => ![
            "WebGLContextEvent", "WebGLObject", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer",
            "WebGLShader", "WebGLTexture", "WebGLUniformLocation", "WebGLActiveInfo", "WebGLShaderPrecisionFormat", "WebGLRenderingContext",
            "WebGLQuery", "WebGLSampler", "WebGLSync", "WebGLTransformFeedback", "WebGLVertexArrayObject", "WebGL2RenderingContextBase", "WebGL2RenderingContext"
        ].includes(x))
        // https://www.khronos.org/registry/webgl/specs/latest/2.0-compute/
        names = names.filter(x => !["WebGL2ComputeRenderingContext"].includes(x))
    }

    /**
     * ---------------------------------- ECMA ---------------------------------------
     */
    {
        // https://www.ecma-international.org/publications/standards/Ecma-262.htm
        names = names.filter(x => ![
            "Infinity", "NaN", "undefined",
            "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape",
            "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function",
            "Boolean", "String", "Number", "Symbol", "Object", "BigInt",
            "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError",
            "ArrayBuffer", "SharedArrayBuffer", "DataView",
            "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "BigInt64Array", "BigUint64Array",
            "Atomics", "JSON", "Math", "Reflect"
        ].includes(x))

        // https://www.ecma-international.org/publications/standards/Ecma-402.htm
        names = names.filter(e => e != "Intl")

        // https://tc39.github.io/proposal-global/
        names = names.filter(x => !['globalThis'].includes(x))
    }

    /**
     * ---------------------------------- svgwg ---------------------------------------
     */
    {
        // https://svgwg.org/svg2-draft/types.html
        names = names.filter(x => !["SVGElement", "SVGBoundingBoxOptions", "SVGGraphicsElement", "SVGGeometryElement", "SVGNumber", "SVGLength", "SVGAngle", "SVGNumberList", "SVGLengthList", "SVGStringList", "SVGAnimatedBoolean", "SVGAnimatedEnumeration", "SVGAnimatedInteger", "SVGAnimatedNumber", "SVGAnimatedLength", "SVGAnimatedAngle", "SVGAnimatedString", "SVGAnimatedRect", "SVGAnimatedNumberList", "SVGAnimatedLengthList", "SVGUnitTypes"].includes(x))

        // https://svgwg.org/svg2-draft/coords.html
        names = names.filter(x => !["SVGTransform", "SVGTransformList", "SVGAnimatedTransformList", "SVGPreserveAspectRatio", "SVGAnimatedPreserveAspectRatio"].includes(x))

        // https://svgwg.org/svg2-draft/changes.html#types
        // All appearance of SVGMatrix were replaced by DOMMatrix or DOMMatrixReadOnly.
        // All appearance of SVGRect were replaced by DOMRect or DOMRectReadOnly.
        // All appearance of SVGPoint were replaced by DOMPoint or DOMPointReadOnly.
        names = names.filter(x => !["SVGRect", "SVGMatrix", "SVGPoint"].includes(x))

        // https://svgwg.org/svg2-draft/shapes.html
        names = names.filter(x => !["SVGRectElement", "SVGCircleElement", "SVGEllipseElement", "SVGLineElement", "SVGPointList", "SVGPolylineElement", "SVGPolygonElement"].includes(x))
    }

    /**
     * ---------------------------------- W3C ---------------------------------------
     */
    {
        // https://www.w3.org/TR/webaudio/
        names = names.filter(x => !["BaseAudioContext", "AudioContext", "OfflineAudioContext", "OfflineAudioCompletionEvent", "AudioBuffer", "AudioNode", "AudioParam", "AudioScheduledSourceNode", "AnalyserNode", "AudioBufferSourceNode", "AudioDestinationNode", "AudioListener", "AudioProcessingEvent", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioDestinationNode", "MediaStreamAudioSourceNode", "MediaStreamTrackAudioSourceNode", "OscillatorNode", "PannerNode", "PeriodicWave", "ScriptProcessorNode", "StereoPannerNode", "WaveShaperNode", "AudioWorklet", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioParamMap", "AudioWorkletProcessor"].includes(x))

        // https://www.w3.org/TR/WebCryptoAPI/
        names = names.filter(x => !["CryptoKey", "SubtleCrypto", "Crypto", "crypto"].includes(x))

        // https://www.w3.org/TR/webrtc/
        names = names.filter(x => ![
            "RTCPeerConnection", "RTCPeerConnection", "RTCSessionDescription", "RTCIceCandidate", "RTCPeerConnectionIceEvent", "RTCPeerConnection", "RTCCertificate", "RTCPeerConnection", "RTCRtpSender", "RTCRtpReceiver", "RTCRtpTransceiver", "RTCIceTransport", "RTCTrackEvent", "RTCPeerConnection", "RTCDataChannel", "RTCDataChannelEvent", "RTCRtpSender", "RTCDTMFSender", "RTCDTMFToneChangeEvent", "RTCPeerConnection", "RTCStatsReport"
        ].includes(x))

        // https://www.w3.org/TR/IndexedDB/
        names = names.filter(x => !["IDBRequest", "IDBOpenDBRequest", "IDBVersionChangeEvent", "IDBFactory", "IDBDatabase", "IDBObjectStore", "IDBIndex", "IDBKeyRange", "IDBCursor", "IDBCursorWithValue", "IDBTransaction", "indexedDB",
            // Not Found
            "IDBObservation",
            // http://wicg.github.io/indexed-db-observers/EXPLAINER.html
            "IDBObserver",
            // https://github.com/WICG/indexed-db-observers/blob/gh-pages/IDBObservers.webidl
            "IDBObserverChanges"
        ].includes(x))

        // https://www.w3.org/TR/uievents
        names = names.filter(x => !["UIEvent", "FocusEvent", "MouseEvent", "WheelEvent", "InputEvent", "KeyboardEvent", "CompositionEvent", "MutationEvent", ""].includes(x))

        // https://www.w3.org/TR/css-transitions-1/
        names = names.filter(x => !["TransitionEvent"].includes(x))

        // https://www.w3.org/TR/cssom-1/
        names = names.filter(x => !["MediaList", "StyleSheet", "CSSStyleSheet", "StyleSheetList", "CSSRuleList", "CSSRule", "CSSStyleRule", "CSSImportRule", "CSSGroupingRule", "CSSMediaRule", "CSSPageRule", "CSSNamespaceRule", "CSSStyleDeclaration", "CSS"].includes(x))

        // https://www.w3.org/TR/css-typed-om-1/
        names = names.filter(x => !["CSSStyleValue", "StylePropertyMapReadOnly", "StylePropertyMap", "CSSUnparsedValue", "CSSVariableReferenceValue", "CSSKeywordValue", "CSSNumericValue", "CSSUnitValue", "CSSMathValue", "CSSMathSum", "CSSMathProduct", "CSSMathNegate", "CSSMathInvert", "CSSMathMin", "CSSMathMax", "CSSNumericArray", "CSSTransformValue", "CSSTransformComponent", "CSSTranslate", "CSSRotate", "CSSScale", "CSSSkew", "CSSSkewX", "CSSSkewY", "CSSPerspective", "CSSMatrixComponent", "CSSPositionValue", "CSSImageValue"].includes(x))

        // https://www.w3.org/TR/css-fonts-4/
        names = names.filter(x => !["CSSFontFaceRule"].includes(x))

        // https://www.w3.org/TR/cssom-view-1/
        // https://drafts.csswg.org/cssom-view/
        names = names.filter(x => ![
            "MediaQueryList", "MediaQueryListEvent", "Screen",
            // extensions to the window interface: https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface
            "matchMedia", "screen",
            "moveTo", "moveBy", "resizeTo", "resizeBy", // browsing context
            "innerWidth", "innerHeight", // viewport
            "scrollX", "scrollY", "pageXOffset", "pageYOffset", "scroll", "scrollTo", "scrollBy", // viewport scrolling
            "screenX", "screenY", "outerWidth", "outerHeight", "devicePixelRatio", "screenLeft", "screenTop", // client
            "getComputedStyle"
        ].includes(x))
        // https://drafts.csswg.org/css-font-loading
        names = names.filter(x => !["FontFaceSetLoadEvent"].includes(x))
        // https://drafts.csswg.org/resize-observer-1
        names = names.filter(x => !["ResizeObserver", "ResizeObserverEntry"].includes(x))

        // https://www.w3.org/TR/requestidlecallback
        names = names.filter(x => !["IdleDeadline", "requestIdleCallback", "cancelIdleCallback"].includes(x))

        // https://www.w3.org/TR/geometry-1
        names = names.filter(x => !["DOMPointReadOnly", "SVGPoint", "DOMPoint", "DOMRectReadOnly", "SVGRect", "DOMRect", "DOMRectList", "DOMQuad", "DOMMatrixReadOnly", "SVGMatrix", "WebKitCSSMatrix", "DOMMatrix"].includes(x))

        // https://www.w3.org/TR/css3-conditional
        names = names.filter(x => !["CSSConditionRule", "CSSMediaRule", "CSSSupportsRule"].includes(x))

        // https://www.w3.org/TR/css-animations-1
        names = names.filter(x => !["AnimationEvent", "CSSKeyframeRule", "CSSKeyframesRule"].includes(x))

        // https://www.w3.org/TR/web-animations-1
        names = names.filter(x => !["AnimationTimeline", "DocumentTimeline", "Animation", "AnimationEffect", "KeyframeEffect", "AnimationPlaybackEvent"].includes(x))

        // https://www.w3.org/TR/css-device-adapt-1
        names = names.filter(x => !["CSSViewportRule"].includes(x))

        // https://www.w3.org/TR/media-source/
        names = names.filter(x => !["MediaSource", "SourceBuffer", "SourceBufferList", "TrackDefault", "TrackDefaultList"].includes(x))

        // https://www.w3.org/TR/screen-orientation/
        names = names.filter(x => x !== 'ScreenOrientation')

        // https://www.w3.org/TR/encrypted-media/
        names = names.filter(x => !["MediaKeySystemAccess", "MediaKeys", "MediaKeySession", "MediaKeyStatusMap", "MediaKeyMessageEvent", "MediaEncryptedEvent"].includes(x))

        // https://www.w3.org/TR/gamepad/
        names = names.filter(x => !["Gamepad", "GamepadButton", "GamepadEvent"].includes(x))
        // https://wiki.mozilla.org/GamepadAPI
        names = names.filter(x => !["GamepadButtonEvent", "GamepadAxisEvent", "GamepadButtonDown", "GamepadButtonDown", "GamepadAxisMove"].includes(x))

        // https://www.w3.org/TR/DOM-Level-3-XPath/xpath.html
        // https://wiki.whatwg.org/wiki/DOM_XPath
        names = names.filter(x => !["XPathEvaluator", "XPathExpression", "XPathExpression", "XPathResult"].includes(x))

        // https://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html
        names = names.filter(x => !["CAPTURING_PHASE", "AT_TARGET", "BUBBLING_PHASE", "UNSPECIFIED_EVENT_TYPE_ERR", "DISPATCH_REQUEST_ERR", "TextEvent", "DOM_KEY_LOCATION_STANDARD", "DOM_KEY_LOCATION_LEFT", "DOM_KEY_LOCATION_RIGHT", "DOM_KEY_LOCATION_NUMPAD", "MODIFICATION", "ADDITION", "REMOVAL"].includes(x))

        // https://www.w3.org/TR/css-font-loading
        names = names.filter(x => !["FontFace"].includes(x))

        // https://www.w3.org/TR/secure-contexts/
        // interface GlobalSecureContext {
        //  readonly attribute boolean isSecureContext;
        // }
        // Window implements GlobalSecureContext;
        names = names.filter(x => !["isSecureContext"].includes(x))

        // https://www.w3.org/TR/webxr/
        names = names.filter(x => !["XR", "XRSession", "XRFrame", "XRSpace", "XRReferenceSpace", "XRStationaryReferenceSpace", "XRBoundedReferenceSpace", "XRUnboundedReferenceSpace", "XRView", "XRViewport", "XRRigidTransform", "XRRay", "XRViewerPose", "XRInputSource", "XRInputPose", "XRLayer", "XRWebGLLayer", "XRPresentationContext", "XRSessionEvent", "XRInputSourceEvent"].includes(x))
        // https://immersive-web.github.io/webvr/spec/1.1/
        names = names.filter(x => !["VRDisplay", "VRDisplayCapabilities", "VRPose", "VRFrameData", "VREyeParameters", "VRStageParameters", "VRDisplayEvent"].includes(x))
        // https://github.com/immersive-web/webxr-reference/blob/master/webxr-device-api/xrstagebounds.md
        names = names.filter(x => !["XRStageBounds"].includes(x))

        // https://www.w3.org/TR/contacts-manager-api
        names = names.filter(x => !["ContactsManager"].includes(x))

        // https://www.w3.org/TR/worklets-1
        names = names.filter(x => !["Worklet"].includes(x))

        // https://www.w3.org/TR/payment-handler
        names = names.filter(x => !["PaymentManager", "PaymentInstruments"].includes(x))

        // https://www.w3.org/TR/permissions/
        names = names.filter(x => !["PermissionStatus", "Permissions"].includes(x))

        // https://www.w3.org/TR/push-api/
        names = names.filter(x => !["PushManager", "PushSubscriptionOptions", "PushSubscription"].includes(x))

        // https://www.w3.org/TR/remote-playback/
        names = names.filter(x => !["RemotePlayback"].includes(x))

        // https://www.w3.org/TR/webdatabase/
        names = names.filter(x => !["openDatabase"].includes(x))

        // https://www.w3.org/TR/wake-lock
        names = names.filter(x => !["WakeLock", "WakeLockRequest"].includes(x))

        // https://webaudio.github.io/web-midi-api/
        // https://www.w3.org/TR/webmidi/
        names = names.filter(x => !["MIDIOptions", "MIDIInputMap", "MIDIOutputMap", "MIDIAccess", "MIDIPort", "MIDIInput", "MIDIOutput", "MIDIMessageEvent", "MIDIMessageEventInit", "MIDIConnectionEvent", "MIDIConnectionEventInit"].includes(x))

        // https://w3c.github.io/mediacapture-image/
        names = names.filter(x => !['PhotoCapabilities', 'MediaSettingsRange', 'ImageCapture'].includes(x))

        // https://w3c.github.io/mediacapture-main/
        names = names.filter(x => !["MediaStream", "MediaStreamTrack", "MediaStream", "MediaStreamTrack", "MediaStreamTrack", "MediaStreamTrack", "MediaStreamTrack", "MediaStreamTrack", "MediaStreamTrack", "MediaStream", "MediaStreamTrack", "onended", "MediaStreamTrack", "MediaStreamTrackEvent", "MediaStreamTrack", "MediaStreamTrack", "OverconstrainedError", "OverconstrainedError", "Navigator", "MediaDevices", "MediaDevices", "MediaDeviceInfo", "MediaDeviceInfo", "InputDeviceInfo", "MediaDeviceInfo", "Navigator", "MediaDevices", "MediaStream", "MediaStream"].includes(x))

        // https://w3c.github.io/mediacapture-record/
        names = names.filter(x => !['MediaRecorder', 'BlobEvent'].includes(x))

        // https://w3c.github.io/gamepad/extensions.html
        names = names.filter(x => !["GamepadHapticActuator", "GamepadPose"].includes(x))

        // https://w3c.github.io/deviceorientation/
        names = names.filter(x => !["DeviceOrientationEvent", "DeviceMotionEvent"].includes(x))

        // https://w3c.github.io/mediacapture-fromelement/
        names = names.filter(x => !["CanvasCaptureMediaStreamTrack"].includes(x))

        // https://w3c.github.io/manifest/
        names = names.filter(x => !["BeforeInstallPromptEvent"].includes(x))

        // https://w3c.github.io/DOM-Parsing/
        names = names.filter(x => !["DOMParser", "XMLSerializer", "Range"].includes(x))

        // https://w3c.github.io/webvtt/
        names = names.filter(x => !["VTTCue", "VTTRegion"].includes(x))

        // https://w3c.github.io/touch-events
        names = names.filter(x => !["Touch", "TouchList", "TouchEvent"].includes(x))

        // https://w3c.github.io/longtasks
        names = names.filter(x => !["PerformanceLongTaskTiming", "TaskAttributionTiming"].includes(x))

        // https://w3c.github.io/selection-api
        names = names.filter(x => !["Selection", "getSelection"].includes(x))

        // https://w3c.github.io/webappsec-csp/
        names = names.filter(x => !['SecurityPolicyViolationEvent'].includes(x))

        // https://w3c.github.io/reporting
        names = names.filter(x => !["ReportingObserver"].includes(x))

        // https://w3c.github.io/pointerevents
        names = names.filter(x => !["PointerEvent"].includes(x))

        // https://w3c.github.io/navigation-timing
        names = names.filter(x => !["PerformanceNavigationTiming", "PerformanceTiming", "PerformanceNavigation", "Performance"].includes(x))

        // https://w3c.github.io/server-timing
        names = names.filter(x => !["PerformanceServerTiming", "PerformanceResourceTiming"].includes(x))

        // https://w3c.github.io/paint-timing
        names = names.filter(x => !["PerformancePaintTiming"].includes(x))

        // https://w3c.github.io/performance-timeline
        names = names.filter(x => !["PerformanceEntry", "PerformanceObserver", "PerformanceObserverEntryList"].includes(x))

        // https://w3c.github.io/user-timing
        names = names.filter(x => !["PerformanceMark", "PerformanceMeasure"].includes(x))

        // https://w3c.github.io/IntersectionObserver
        names = names.filter(x => !["IntersectionObserver", "IntersectionObserverEntry"].includes(x))

        // https://w3c.github.io/FileAPI
        names = names.filter(x => !["Blob", "File", "FileList", "FileReader", "FileReaderSync"].includes(x))

        // https://w3c.github.io/clipboard-apis
        names = names.filter(x => !["ClipboardEvent", "Clipboard"].includes(x))

        // https://w3c.github.io/hr-time
        names = names.filter(x => !["performance"].includes(x))

        // https://w3c.github.io/ServiceWorker
        names = names.filter(x => !["ServiceWorker", "ServiceWorkerRegistration", "ServiceWorkerContainer", "NavigationPreloadManager", "Cache", "CacheStorage", "caches"].includes(x))

        // https://w3c.github.io/payment-request
        names = names.filter(x => !["PaymentRequest", "PaymentAddress", "PaymentResponse", "PaymentMethodChangeEvent", "PaymentRequestUpdateEvent"].includes(x))

        // https://w3c.github.io/webrtc-quic/
        // https://developers.google.com/web/updates/2019/01/rtcquictransport-api
        names = names.filter(x => !["RTCQuicTransport", "RTCQuicStream", "RTCIceTransport", "RTCQuicTransport", "RTCQuicStreamEvent"].includes(x))

        // https://w3c.github.io/webappsec-credential-management/
        names = names.filter(x => !["Credential", "CredentialsContainer", "PasswordCredential", "FederatedCredential"].includes(x))

        // https://w3c.github.io/presentation-api/
        names = names.filter(x => !["Presentation", "PresentationRequest", "PresentationAvailability", "PresentationConnectionAvailableEvent", "PresentationConnection", "PresentationConnectionCloseEvent", "PresentationReceiver", "PresentationConnectionList"].includes(x))

        // https://w3c.github.io/sensors/
        names = names.filter(x => !["SensorErrorEvent", "Sensor"].includes(x))
        // https://w3c.github.io/orientation-sensor
        names = names.filter(x => !["OrientationSensor", "AbsoluteOrientationSensor", "RelativeOrientationSensor"].includes(x))
        // https://w3c.github.io/accelerometer
        names = names.filter(x => !["Accelerometer", "LinearAccelerationSensor"].includes(x))
        // https://w3c.github.io/gyroscope
        names = names.filter(x => !["Gyroscope"].includes(x))
        // https://w3c.github.io/ambient-light
        names = names.filter(x => !["AmbientLightSensor"].includes(x))
        // https://w3c.github.io/magnetometer
        names = names.filter(x => !["Magnetometer"].includes(x))

        // https://w3c.github.io/webauthn
        names = names.filter(x => !["PublicKeyCredential", "AuthenticatorResponse", "AuthenticatorAttestationResponse", "AuthenticatorAssertionResponse"].includes(x))

        // http://w3c.github.io/nfc/
        names = names.filter(x => !["NFC"].includes(x))

        // https://w3c.github.io/speech-api/
        names = names.filter(x => !["speechSynthesis", "SpeechSynthesisUtterance", "SpeechSynthesisEvent", "SpeechSynthesisErrorEvent"].includes(x))

        // https://webbluetoothcg.github.io/web-bluetooth/
        names = names.filter(x => !["Bluetooth", "BluetoothUUID", "BluetoothDevice", "BluetoothRemoteGATTServer", "BluetoothRemoteGATTService", "BluetoothRemoteGATTCharacteristic", "BluetoothCharacteristicProperties", "BluetoothRemoteGATTDescriptor"].includes(x))

        // https://heycam.github.io/webidl
        names = names.filter(x => !["DOMException"].includes(x))

        // https://webassembly.github.io/spec/js-api
        names = names.filter(x => !['WebAssembly'].includes(x))
    }

    /**
     * ---------------------------------- WICG ---------------------------------------
     */
    {
        // http://wicg.github.io/BackgroundSync/spec/
        names = names.filter(x => x !== 'SyncManager')

        // http://wicg.github.io/netinfo/
        names = names.filter(x => x !== 'NetworkInformation')

        // https://wicg.github.io/media-capabilities/
        names = names.filter(x => !["MediaCapabilities"].includes(x))

        // https://wicg.github.io/visual-viewport/
        names = names.filter(x => ![
            "VisualViewport",
            // Extensions to the Window interface: https://wicg.github.io/visual-viewport/#extensions-to-the-window-interface
            "visualViewport"
        ].includes(x))

        // https://wicg.github.io/InputDeviceCapabilities
        names = names.filter(x => !["InputDeviceCapabilities"].includes(x))

        // https://wicg.github.io/element-timing
        names = names.filter(x => !["PerformanceElementTiming"].includes(x))

        // https://wicg.github.io/scroll-animations/
        names = names.filter(x => !["ScrollTimeline"].includes(x))

        // https://wicg.github.io/event-timing
        names = names.filter(x => !["PerformanceEventTiming"].includes(x))

        // https://wicg.github.io/background-fetch
        names = names.filter(x => !["BackgroundFetchManager", "BackgroundFetchRegistration", "BackgroundFetchRecord"].includes(x))

        // https://wicg.github.io/animation-worklet/
        names = names.filter(x => !["WorkletAnimation"].includes(x))

        // https://wicg.github.io/cookie-store/
        names = names.filter(x => !["CookieStore", "CookieChangeEvent", "ExtendableCookieChangeEvent", "cookieStore"].includes(x))

        // https://wicg.github.io/aom
        names = names.filter(x => !["AccessibleNode", "AccessibleNodeList", "ComputedAccessibleNode", "ElementInternals", "getComputedAccessibleNode"].includes(x))

        // https://wicg.github.io/mediasession
        names = names.filter(x => !["MediaSession", "MediaMetadata"].includes(x))

        // https://wicg.github.io/media-playback-quality
        names = names.filter(x => !["VideoPlaybackQuality"].includes(x))

        // https://wicg.github.io/picture-in-picture/
        names = names.filter(x => !["PictureInPictureWindow", "EnterPictureInPictureEvent"].includes(x))

        // https://wicg.github.io/shape-detection-api
        names = names.filter(x => !["FaceDetector", "DetectedFace", "BarcodeDetector", "DetectedBarcode"].includes(x))
        // https://wicg.github.io/shape-detection-api/text.html
        names = names.filter(x => !["TextDetector", "DetectedText"].includes(x))

        // https://wicg.github.io/native-file-system/
        names = names.filter(x => !["FileSystemFileHandle", "FileSystemDirectoryHandle", "chooseFileSystemEntries"].includes(x))

        // https://wicg.github.io/keyboard-map
        names = names.filter(x => !["KeyboardLayoutMap", "Keyboard"].includes(x))

        // https://wicg.github.io/web-locks/
        names = names.filter(x => !["Lock", "LockManager"].includes(x))

        // https://wicg.github.io/webusb/
        names = names.filter(x => !["USB", "USBConnectionEvent", "USBDevice", "USBInTransferResult", "USBOutTransferResult", "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousOutTransferPacket", "USBIsochronousOutTransferResult", "USBConfiguration", "USBInterface", "USBAlternateInterface", "USBEndpoint"].includes(x))

        // https://github.com/WICG/trusted-types
        names = names.filter(x => !["TrustedHTML", "TrustedScript", "TrustedScriptURL", "TrustedTypePolicy", "TrustedTypePolicyFactorys", "TrustedTypePolicyFactory", "TrustedURL", "TrustedTypes"].includes(x))
    }

    // https://github.com/immersive-web/hit-test/blob/master/explainer.md
    names = names.filter(x => !["XRHitResult"].includes(x))

    // https://github.com/dtapuska/useractivation
    names = names.filter(x => !["UserActivation"].includes(x))

    // https://developers.google.com/web/updates/2018/12/badging-api
    names = names.filter(x => !["ExperimentalBadge"].includes(x))

    // Maybe related, but spec not found
    names = names.filter(x => !["ScriptedTaskQueue", "ScriptedTaskQueueController", "TaskQueue", "TaskWorkletGlobalScope", "TaskWorklet", "taskWorklet", "Task", "WorkerTaskQueue"].includes(x))

    // deprecated in MDN
    names = names.filter(x => !['MediaStreamEvent', 'DOMError', 'external', 'captureEvents', 'releaseEvents'].includes(x))

    // obsolete in MDN
    names = names.filter(x => !['BatteryManager', 'defaultStatus', 'defaultstatus'].includes(x))

    // Non-standard in MDN
    names = names.filter(x => !['find', 'XSLTProcessor'].includes(x))

    // No spec found
    names = names.filter(x => !["clientInformation", "offscreenBuffering", "styleMedia", "chrome", "PerformanceLayoutJank", "ActivateInvisibleEvent", "PictureInPictureControlEvent", "ApplicationCacheErrorEvent", "IdleManager", "IdleStatus", "Serial", "SerialPort"].includes(x))

    console.log('next property: ' + names[0])
    console.log('number of remaining properties: ' + names.length)
}