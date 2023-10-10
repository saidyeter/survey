import { TQuestionAnswersResponseSchema, getActiveSurveyResponseSchema, getUserSchema, partipiciantValidationResponseSchema, questionsResponseSchema } from "./types"

const { env } = process
const baseUrl = env.DB_API_URL
const apiKey = env.DB_API_KEY ?? ''

export {
    getUser,
    getActiveSurvey,
    validateParticipant,
    getQuestions,
    submitAnswers
}

function beforeReq() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}


async function submitAnswers(ticket: string, answers: TQuestionAnswersResponseSchema) {
    beforeReq()
    const url = encodeURI(baseUrl + "/answer?ticket=" + ticket)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify(answers)
        })
        if (response.ok) {
            return true
        }
        console.log("validateParticipant", response.status, await response.text(), url)

    } catch (error) {
        console.log("validateParticipant error", error);
    }

    return false
}


async function getQuestions(ticket: string) {
    beforeReq()
    const url = encodeURI(baseUrl + "/question?ticket=" + ticket)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': apiKey
            }
        })
        if (response.ok) {
            const data = await response.json()

            const result = questionsResponseSchema.safeParse(data)
            if (!result.success) {

                console.log('unsuccesfull parse', result.error);

                return undefined
            }
            return result.data
        }
        console.log("getQuestions", response.status, await response.text(), url)

    } catch (error) {
        console.log("getQuestions error", error);
    }

    return undefined
}

async function validateParticipant(email: string, codepart: string) {
    beforeReq()
    const url = encodeURI(baseUrl + "/participant/validate")
    // https://localhost:7215/Participant/validate
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify({
                "email": email,
                "codepart": codepart
            })
        })
        if (response.ok) {
            const data = await response.json()
            const result = partipiciantValidationResponseSchema.safeParse(data)
            if (!result.success) {

                console.log('unsuccesfull parse', result.error);

                return undefined
            }
            return result.data
        }
        console.log("validateParticipant", response.status, await response.text(), url)

    } catch (error) {
        console.log("validateParticipant error", error);
    }

    return undefined
}




async function getActiveSurvey() {
    beforeReq()
    const url = encodeURI(baseUrl + "/survey")

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': apiKey
            },
        })
        if (response.ok) {
            const data = await response.json()
            const result = getActiveSurveyResponseSchema.safeParse(data)
            if (!result.success) {

                console.log('unsuccesfull parse', result.error);

                return undefined
            }
            return result.data
        }
        console.log("getActiveSurvey", response.status, await response.text(), url)

    } catch (error) {
        console.log("getActiveSurvey error", error);
    }

    return undefined
}




async function getUser(email: string, password: string) {
    beforeReq()
    const url = encodeURI(baseUrl + "/user/check")

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        if (response.ok) {

            const data = await response.json()
            const result = getUserSchema.safeParse(data)
            if (!result.success) {
                return undefined
            }
            return result.data
        }
        console.log("getUser", response.status, await response.text(), url)

    } catch (error) {
        console.log("getuser error", error);
    }

    return undefined
}
