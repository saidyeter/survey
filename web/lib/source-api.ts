import { TNewParticipantSchema, TNewQuestionSchema, TNewSurveyValidationSchema, TQuestionAnswersFormSchema, TQuestionAnswersReqSchema, TUpdateOnRunningQuestionRequestSchema, checkNewSurveyIsAllowedResponse, checkPreSurveyExistsScheme, getActiveSurveyResponseSchema, getParticipantsResponseSchema, getSurveySchema, getSurveysResponseSchema, getUserSchema, participantSchema, partipiciantValidationResponseSchema, qnaSchema, questionsResponseSchema, surveyDetailSchema, surveySchema } from "./types"

const { env } = process
const baseUrl = env.DB_API_URL
const apiKey = env.DB_API_KEY ?? ''

export {
  getUser,
  getRunningSurvey,
  validateParticipant,
  getQuestions,
  submitAnswers,
  getSurveys,
  getSurveyDetails,
  checkNewSurveyIsAllowed,
  createNewSurvey,
  getSurvey,
  createNewQuestion,
  raiseUpQuestion,
  lowerDownQuestion,
  removeQuestion,
  copySingleQuestion,
  checkPreSurveyExists,
  startSurvey,
  finishSurvey,
  getPreSurvey,
  getParticipants,
  getSingleParticipant,
  createNewPartipiciant,
  updatePartipiciant,
  deletePartipiciant,
  getSingleQuestion,
  updateSingleQuestionOnRunningSurvey
}

function beforeReq() {
  if (process.env.NODE_ENV == 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
}

async function updateSingleQuestionOnRunningSurvey(id:number,req:TUpdateOnRunningQuestionRequestSchema) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question/update-on-running/" + id)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(req),
      cache: 'no-cache'
    })
    if (response.ok) {
     return true
    }
    console.log("updateSingleQuestionOnRunningSurvey", response.status, await response.text(), url)

  } catch (error) {
    console.log("updateSingleQuestionOnRunningSurvey error", error);
  }

  return false
}


async function getSingleQuestion(id:number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question/single/" + id)

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
    })
    if (response.ok) {
      const data = await response.json()

      const result = qnaSchema.safeParse(data)
      if (!result.success) {

        console.log('unsuccesfull parse', result.error);

        return undefined
      }
      return result.data
    }
    console.log("getSingleQuestion", response.status, await response.text(), url)

  } catch (error) {
    console.log("getSingleQuestion error", error);
  }

  return undefined
}



async function deletePartipiciant(id: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/participant/remove/" + id)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("deletePartipiciant", response.status, await response.text(), url)

  } catch (error) {
    console.log("deletePartipiciant error", error);
  }

  return false
}

async function updatePartipiciant(id: number, req: TNewParticipantSchema) {
  beforeReq()
  const url = encodeURI(baseUrl + "/participant/edit/" + id)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(req),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("updatePartipiciant", response.status, await response.text(), url)

  } catch (error) {
    console.log("updatePartipiciant error", error);
  }

  return false
}

async function createNewPartipiciant(req: TNewParticipantSchema) {
  beforeReq()
  const url = encodeURI(baseUrl + "/participant/create")

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(req),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("createNewPartipiciant", response.status, await response.text(), url)

  } catch (error) {
    console.log("createNewPartipiciant error", error);
  }

  return false
}

async function getSingleParticipant(id: number) {
  beforeReq()

  const url = encodeURI(baseUrl + "/participant/single/" + id)
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
    })
    if (response.ok) {
      const data = await response.json()
      const result = participantSchema.safeParse(data)
      if (!result.success) {

        console.log('unsuccesfull parse', result.error);

        return undefined
      }
      return result.data
    }
    console.log("getSingleParticipant", response.status, await response.text(), url)

  } catch (error) {
    console.log("getSingleParticipant error", error);
  }

  return undefined
}

async function getParticipants(pageSize?: number, pageNumber?: number, search?: string) {
  beforeReq()
  const _pageSize = pageSize ?? 10
  const _pageNumber = pageNumber ?? 0
  const _search = search ?? ""

  const url = encodeURI(baseUrl + "/participant/list?" + "pageSize=" + _pageSize + "&pageNumber=" + _pageNumber + "&search=" + _search)
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
    })
    if (response.ok) {
      const data = await response.json()
      const result = getParticipantsResponseSchema.safeParse(data)
      if (!result.success) {

        console.log('unsuccesfull parse', result.error);

        return undefined
      }
      return result.data
    }
    console.log("getParticipants", response.status, await response.text(), url)

  } catch (error) {
    console.log("getParticipants error", error);
  }

  return undefined
}

async function getPreSurvey() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/pre-survey")
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
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

async function finishSurvey() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/finish-survey/")

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("finishSurvey", response.status, await response.text(), url)

  } catch (error) {
    console.log("finishSurvey error", error);
  }

  return false
}

async function startSurvey() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/start-survey/")

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("startSurvey", response.status, await response.text(), url)

  } catch (error) {
    console.log("startSurvey error", error);
  }

  return false
}

async function checkPreSurveyExists() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/check-pre-survey-exists")

  try {

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
    })


    if (response.ok) {

      const data = await response.json()
      const result = checkPreSurveyExistsScheme.safeParse(data)
      if (!result.success) {
        console.log('unsuccesfull parse', result.error.errors[0], JSON.stringify(data));

        return undefined
      }
      return result.data
    }
    console.log("checkPreSurveyExists", response.status, await response.text(), url)

  } catch (error) {
    console.log("checkPreSurveyExists error", error);
  }

  return undefined
}

async function removeQuestion(questionId: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question/" + questionId)

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("removeQuestion", response.status, await response.text(), url)

  } catch (error) {
    console.log("removeQuestion error", error);
  }

  return false
}

async function copySingleQuestion(questionId: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question/copy-single-question/" + questionId)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("copySingleQuestion", response.status, await response.text(), url)

  } catch (error) {
    console.log("copySingleQuestion error", error);
  }
  return false
}

async function lowerDownQuestion(questionId: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question/lower-order/" + questionId)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("lowerDownQuestion", response.status, await response.text(), url)

  } catch (error) {
    console.log("lowerDownQuestion error", error);
  }

  return false
}

async function raiseUpQuestion(questionId: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question/raise-order/" + questionId)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({}),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("raiseUpQuestion", response.status, await response.text(), url)

  } catch (error) {
    console.log("raiseUpQuestion error", error);
  }

  return false
}


async function createNewQuestion(req: TNewQuestionSchema) {
  beforeReq()
  const url = encodeURI(baseUrl + "/question")

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(req),
      cache: 'no-cache'
    })
    if (response.ok) {
      return true
    }
    console.log("createNewQuestion", response.status, await response.text(), url)

  } catch (error) {
    console.log("createNewQuestion error", error);
  }

  return false
}

async function getSurvey(surveyId: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/" + surveyId)

  try {

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache',
    })


    if (response.ok) {

      const data = await response.json()
      const result = getSurveySchema.safeParse(data)
      if (!result.success) {
        console.log('unsuccesfull parse', result.error.errors[0], JSON.stringify(data));

        return undefined
      }
      return result.data
    }
    console.log("getSurvey", response.status, await response.text(), url)

  } catch (error) {
    console.log("getSurvey error", error);
  }

  return undefined
}

async function createNewSurvey(req: TNewSurveyValidationSchema) {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey")

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(req),
      cache: 'no-cache'
    })
    if (response.ok) {
      const data = await response.json()
      const result = surveySchema.safeParse(data)
      if (!result.success) {
        console.log('unsuccesfull parse', result.error.errors[0]);

        return undefined
      }
      return result.data
    }
    console.log("createNewSurvey", response.status, await response.text(), url)

  } catch (error) {
    console.log("createNewSurvey error", error);
  }

  return undefined
}

async function checkNewSurveyIsAllowed() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/check-new-survey-is-allowed")
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
    })

    if (response.ok) {

      const data = await response.json()
      const result = checkNewSurveyIsAllowedResponse.safeParse(data)
      if (!result.success) {
        console.log('unsuccesfull parse', result.error.errors[0]);

        return undefined
      }
      return result.data.allowed
    }
    console.log("getSurveyDetails", response.status, await response.text(), url)

  } catch (error) {
    console.log("getSurveyDetails error", error);
  }

  return undefined
}




async function getSurveyDetails(surveyId: number) {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/details?surveyId=" + surveyId)

  try {

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
      // to do : sil
    })


    if (response.ok) {

      const data = await response.json()
      const result = surveyDetailSchema.safeParse(data)
      if (!result.success) {
        console.log(JSON.stringify(data));

        console.log('unsuccesfull parse', result.error.errors[0]);

        return undefined
      }
      return result.data
    }
    console.log("getSurveyDetails", response.status, await response.text(), url)

  } catch (error) {
    console.log("getSurveyDetails error", error);
  }

  return undefined
}


async function getSurveys() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/all")

  try {

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
    })


    if (response.ok) {

      const data = await response.json()

      const result = getSurveysResponseSchema.safeParse(data)
      if (!result.success) {
        console.log('unsuccesfull parse', result.error);

        return undefined
      }
      return result.data
    }
    console.log("getSurveys", response.status, await response.text(), url)

  } catch (error) {
    console.log("getSurveys error", error);
  }

  return undefined
}


async function submitAnswers(ticket: string, answers: TQuestionAnswersReqSchema) {
  beforeReq()
  const url = encodeURI(baseUrl + "/answer/" + ticket)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(answers),
      cache: 'no-cache'
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
  const url = encodeURI(baseUrl + "/question/" + ticket)

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
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
      }),
      cache: 'no-cache'
    })
    if (response.status == 200) {
      const data = await response.json()
      const result = partipiciantValidationResponseSchema.safeParse(data)
      if (!result.success) {

        console.log('unsuccesfull parse', result.error);

        return undefined
      }
      return result.data
    }
    else if (response.status == 208) {
      return {
        participationTicket: ""
      }
    }
    console.log("validateParticipant", response.status, await response.text(), url)

  } catch (error) {
    console.log("validateParticipant error", error);
  }

  return undefined
}




async function getRunningSurvey() {
  beforeReq()
  const url = encodeURI(baseUrl + "/survey/active-survey")

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': apiKey
      },
      cache: 'no-cache'
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
      }),
      cache: 'no-cache'
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
