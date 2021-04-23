let item = 0
DightalTubes.connectPIN(DigitalPin.P1,DigitalPin.P2)
basic.forever(() => {
    DightalTubes.setIntensity(2);
    DightalTubes.clear()
    DightalTubes.digit(3,2)
    basic.pause(1000)
    DightalTubes.clear()
    DightalTubes.showNumber(item)
    basic.pause(1000)
    DightalTubes.setIntensity(8);
    DightalTubes.clear()
    DightalTubes.showHex(2021)
    basic.pause(1000)
    DightalTubes.showDpAt(2, true)
    item += 1
    basic.pause(1000)
})
