export enum StatusCall {
    STAT_UNDEFINED = "🤌 The status of the response is undefined! 🤌",
    STAT_401 = "⛔️ Unauthorized! ⛔️",
    STAT_403 = "⛔️ You do not have the necessary permissions to log in! ⛔️",
    STAT_404 = "❌ Page not found! ❌",
    STAT_405 = "☢️ Operation not allowed! ☢️",
    STAT_429 = "📨 Too many requests have been sent! 📨",
    STAT_500 = "☠️ Server side error! ☠️",
    STAT_502 = "📪 Bad gateway! 📪",
}
export enum GenericMessage {
    DATA_UNDEFINED = "👎 Params are undefined! 👎",
    CATCH_ERROR = "👀 Oops ... something went wrong 👀",
}