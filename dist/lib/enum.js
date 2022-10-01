"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericMessage = exports.StatusCall = void 0;
var StatusCall;
(function (StatusCall) {
    StatusCall["STAT_UNDEFINED"] = "\uD83E\uDD0C The status of the response is undefined! \uD83E\uDD0C";
    StatusCall["STAT_403"] = "\u26D4\uFE0F You do not have the necessary permissions to log in! \u26D4\uFE0F";
    StatusCall["STAT_404"] = "\u274C Page not found! \u274C";
    StatusCall["STAT_405"] = "\u2622\uFE0F Operation not allowed! \u2622\uFE0F";
    StatusCall["STAT_500"] = "\u2620\uFE0F Server side error! \u2620\uFE0F";
})(StatusCall = exports.StatusCall || (exports.StatusCall = {}));
var GenericMessage;
(function (GenericMessage) {
    GenericMessage["DATA_UNDEFINED"] = "\uD83D\uDC4E Params are undefined! \uD83D\uDC4E";
    GenericMessage["CATCH_ERROR"] = "\uD83D\uDC40 Oops ... something went wrong, check the console for more information (F12 on the keyboard) \uD83D\uDC40";
})(GenericMessage = exports.GenericMessage || (exports.GenericMessage = {}));
//# sourceMappingURL=enum.js.map