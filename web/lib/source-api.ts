import { getUserchema as getUserSchema } from "./types"

const { env } = process
const baseUrl = env.DB_API_URL
const apiKey = env.DB_API_KEY ?? ''

export {
    getUser
}


async function getUser(email: string, password: string) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
                return null
            }
            return result.data
        }
        console.log("getUser", response.status, await response.text(), url)

    } catch (error) {
        console.log("getuser error", error);
    }

    return null
}
