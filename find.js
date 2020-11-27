const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const collectBlock = require('mineflayer-collectblock').plugin

const bot = mineflayer.createBot({
    host: 'SERVER IP HERE',
    port: SERVER PORT HERE,
    username: 'Gosha'
})

// Load pathfinder and collect block plugins
bot.loadPlugin(pathfinder)
bot.loadPlugin(collectBlock)

// Load mc data
let mcData
bot.once('spawn', () => {
  mcData = require('minecraft-data')(bot.version)
})

// Listen for when a player says "collect [something]" in chat
bot.on('chat', (username, message) => {
  const args = message.split(' ')
  if (args[0] !== 'Собери') return

  // Get the correct block type
  const blockType = mcData.blocksByName[args[1]]
  if (!blockType) {
    bot.chat("Не знаю такого блока.")
    return
  }

  bot.chat('Собираю ближний ' + blockType.name)

  // Try and find that block type in the world
  const block = bot.findBlock({
    matching: blockType.id,
    maxDistance: 64
  })

  if (!block) {
    bot.chat("Не вижу таких поблизости")
    return
  }

  // Collect the block if we found one
  bot.collectBlock.collect(block, err => {
    if (err) bot.chat(err.message)
  })
 
})
