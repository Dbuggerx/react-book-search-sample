"use strict";
exports.__esModule = true;
function ssrReducer(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case 'react-book-search/ssr/RENDER_READY':
            return {
                ready: action.payload.ready
            };
        default:
            return state;
    }
}
exports["default"] = ssrReducer;
