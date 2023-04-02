import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

config()

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
)

const ui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const fillerFeedback = [
  "I've heard that one before. Let's see...",
  "Hmm... interesting question.",
  "Let me google that for you, you lazy bum.",
  "Open AI invested all that money into me and this is the question you ask me? Ok, one moment...",
]

ui.prompt()
ui.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  console.log(fillerFeedback[Math.floor(Math.random() * fillerFeedback.length)])
  setTimeout(() => {
    console.log(res.data.choices[0].message.content)
  }, 3000)

  ui.prompt()
})

// openai
//   .createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "user", content: "how do i make water resistant water?" },
//     ],
//   })
//   .then((res) => {
//     console.log(res.data.usage)
//     console.log(res.data.choices[0].message.content)
//   })
