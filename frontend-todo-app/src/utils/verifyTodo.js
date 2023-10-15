import { characterLimit } from "../constants"

export const verifyTaskText = (text) => {
    if (text.length === 0 || text.length > characterLimit) {
        window.alert("Task should have less than 50 characters and not be empty.")
        return false
    }
    return true
}