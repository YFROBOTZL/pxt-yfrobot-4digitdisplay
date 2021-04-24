let item = 0
DigitalTubes.connectPIN(DigitalPin.P1,DigitalPin.P2)
basic.forever(() => {
    DigitalTubes.setIntensity(2);
    DigitalTubes.clear()
    DigitalTubes.digit(3,2)
    basic.pause(1000)
    DigitalTubes.clear()
    DigitalTubes.showNumber(item)
    basic.pause(1000)
    DigitalTubes.setIntensity(8);
    DigitalTubes.clear()
    DigitalTubes.showHex(2021)
    basic.pause(1000)
    DigitalTubes.showDpAt(2, true)
    item += 1
    basic.pause(1000)
})
