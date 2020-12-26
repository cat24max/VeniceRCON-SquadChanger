module.exports = async ({ battlefield }) => {

    const squadSize = parseInt(await battlefield.vu.get('squadSize'))

    function getSquadNameFromCommand(msg, player) {
        if(msg.startsWith('!squad ')) {
            const words = msg.split(' ')
            if(words.length > 1) {
                return words[1].toLowerCase()
            } else {
                battlefield.say('Usage: !squad <squad>', ['player', player])
            }
        }
        return null
    }

    function getSquadId(squadName) {
        switch(squadName) {
            case '0':
            case 'leave':
            case 'none':
                return 0
            case 'a':
            case 'alpha':
                return 1
            case 'b':
            case 'bravo':
                return 2
            case 'c':
            case 'charlie':
                return 3
            case 'd':
            case 'delta':
                return 4
            case 'e':
            case 'echo':
                return 5
            case 'f':
            case 'foxtrot':
            case 'fox':
                return 6
            case 'g':
            case 'golf':
                return 7
            case 'h':
            case 'hotel':
                return 8
            case 'i':
            case 'indiaa':
                return 9
            case 'j':
            case 'juliet':
                return 10
            case 'k':
            case 'kilo':
                return 11
            case 'l':
            case 'lima':
                return 12
            case 'm':
            case 'mike':
                return 13
            case 'n':
            case 'november':
                return 14
            case 'o':
            case 'oscar':
                return 15
            case 'p':
            case 'papa':
                return 16
            case 'q':
            case 'quebec':
                return 17
            case 'r':
            case 'romeo':
                return 18
            case 's':
            case 'sierra':
                return 19
            case 't':
            case 'tango':
                return 20
            case 'u':
            case 'uniform':
                return 21
            case 'v':
            case 'victor':
                return 22
            case 'w':
            case 'whiskey':
                return 23
            case 'x':
            case 'x-ray':
            case 'xray':
                return 24
            case 'y':
            case 'yankee':
                return 25
            case 'z':
            case 'zulu':
                return 26
            default:
                return -1
        }
    }

    async function isSquadAvailable(teamId, squadId) {
        const players = (await battlefield.getPlayers())
        const squadMemberCount = players.filter(p => p.teamId === teamId && p.squadId === squadId).length
        if(squadMemberCount < squadSize) return true
        return false
        // TODO: Check for squad privacy (if possible?)
    }

    battlefield.on('chat', async (ev) => {
        let squadName = getSquadNameFromCommand(ev.msg, ev.player)
        if(squadName !== null) {
            let squadId = getSquadId(squadName)
            if(squadId !== -1) {
                const player = await battlefield.getPlayerByName(ev.player)
                const isSquadAvail = await isSquadAvailable(player.teamId, squadId)
                if(isSquadAvail) {
                    battlefield.say('You have been moved to squad #' + squadId, ['player', ev.player])
                    battlefield.playerMove(ev.player, player.teamId, squadId, false)
                } else {
                    battlefield.say('Unable to move, squad full', ['player', ev.player])
                }
            } else {
                battlefield.say('Usage: !squad <squad>', ['player', ev.player])
            }
        }
    })
}
