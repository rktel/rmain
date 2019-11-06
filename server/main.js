

Meteor.startup(_ => {

    let mainCounterTime = 0
    Meteor.setInterval(_ => {
        mainCounterTime++
        if (mainCounterTime == 2) {
            Meteor.call('Antapaccay_createPlates')
            Meteor.call('Pluton_createPlates')
        }
        if (mainCounterTime == 10 * 60) {
            mainCounterTime == 0
        }
    }, 1000);



})