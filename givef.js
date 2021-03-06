const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const GoalBlock = goals.GoalBlock
const autoeat = require('mineflayer-auto-eat')

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

		bot.setQuickBarSlot(0)
        const mobb = bot.players['Poyarik']
        const mob = mobb.entity

		if (!mob) {
			return
		}

		const mcData = require('minecraft-data')(bot.version)
		const movements = new Movements(bot, mcData)
		movements.scafoldingBlocks = []

		bot.pathfinder.setMovements(movements)

		const goal = new GoalFollow(mob, 1)
		bot.pathfinder.setGoal(goal, true)
});
