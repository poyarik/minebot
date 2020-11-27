const mineflayer = require('mineflayer')
const autoeat = require('mineflayer-auto-eat')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const GoalBlock = goals.GoalBlock

const bot = mineflayer.createBot({
    host: 'SERVER IP HERE',
    port: SERVER PORT HERE,
    username: 'Gosha'
})

bot.loadPlugin(pathfinder)
bot.loadPlugin(autoeat)

bot.once('spawn', () => {
    bot.chat("Всем привет пацаны! Я ИИ по имени Гоша")
    bot.autoEat.options = {
        priority: 'foodPoints',
        startAt: 10,
        bannedFood: []
      }
    setInterval(() => {
        function tossNext () {
            if (bot.inventory.items().length === 0) return
            const item = bot.inventory.items()[0]
            bot.tossStack(item, tossNext)
        }
        tossNext()
    }, 400);
});

function lookAtNearestPlayer () {
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter)
    
    if (!playerEntity) return
    
    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)
}
bot.on('physicTick', lookAtNearestPlayer)
