function generateChatMessageResponse(chatId, responses, responseTimes) {
  return {
    chatId,
    responses: responses.map((response, index) => ({
      model: response.model,
      id: response.id,
      role: response.role,
      message: response.message,
      response_time: responseTimes?.[response.model] ?? 0, //avoid undefined
    })),
  };
}

module.exports = { generateChatMessageResponse };
