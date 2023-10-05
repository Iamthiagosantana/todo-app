import { characterLimit } from "../constants"

export const verifyTaskText = (text) => {
    const trimmedText = text.replace(/\s+/g, "")
    if (trimmedText.length === 0 || trimmedText.length > characterLimit) {
        window.alert("Task should have less than 50 characters and not be empty.")
        return false
    }
    return true
}