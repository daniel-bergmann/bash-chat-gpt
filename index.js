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
const bot = `
               _
              [ ]
             (   )
              |>|
           __/===\__
          //| o=o |\\
        <]  | o=o |  [>
          

  \u001b[31m---Well, hello there I'm a bot, how can I help?.---\u001b[39m
`

ui.prompt()
console.log(bot)

ui.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
    temperature: 0.6,
  })

  const message = `
  
  \u001b[31m  <]  | o=o |  [> \u001b[39m
    
    
    \u001b---\u001b[39m${res.data.choices[0].message.content}
    
    
  \u001b[31m  <]  | o=o |  [> \u001b[39m
`

  console.log(message)

  ui.prompt()
})
