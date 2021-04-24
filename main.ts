/** 
 * @file pxt-yfrobot-4digitdisplay
 * @brief YFROBOT's Four Digit Display makecode Package.
 * @n This is a MakeCode graphical programming education robot.
 * 
 * @copyright    YFROBOT[www.yfrobot.com],2020
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](yfrobot@qq.com)
 * @date  2021-04-17
*/

//% weight=10 color=#64C800 icon="\uf12e" block="DigitalTubes"
namespace DigitalTubes {
    
    let PINCLK = DigitalPin.P1;
    let PINDIO = DigitalPin.P2;

    let CMD_SYSTEM_CONFIG = 0x48   
    let DIG1_ADDRESS = 0x68
    let DIG2_ADDRESS = 0x6A
    let DIG3_ADDRESS = 0x6C
    let DIG4_ADDRESS = 0x6E
    let DatAddressArray = [DIG1_ADDRESS, DIG2_ADDRESS, DIG3_ADDRESS, DIG4_ADDRESS];

    let _SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];
    let _intensity = 8
    let dbuf = [0, 0, 0, 0]

    /**
     * Connects to the digital tube module at the specified pin.
     * @param pin_c CLK pin. eg: DigitalPin.P1
     * @param pin_d DIO pin. eg: DigitalPin.P2
     */
    //% blockId="yfrobot_4digitaltubes_pins"
    //% block="connect 4 digital tubes at CLK %pin_c and DIO %pin_d"
    //% pin_c.fieldEditor="gridpicker" pin_c.fieldOptions.columns=4 pin_c.fieldOptions.tooltips="false"
    //% pin_d.fieldEditor="gridpicker" pin_d.fieldOptions.columns=4 pin_d.fieldOptions.tooltips="false"
    //% weight=100
    export function connectPIN(pin_c: DigitalPin, pin_d: DigitalPin): void {
        PINCLK = pin_c;
        PINDIO = pin_d;
    }


    /** FrameStart_1650 
     */
    function FrameStart_1650(): void {
        pins.digitalWritePin(PINDIO, 1);
        pins.digitalWritePin(PINCLK, 1);
        pins.digitalWritePin(PINDIO, 0);
    }

    /** FrameEnd_1650 
     */
    function FrameEnd_1650(): void {
        pins.digitalWritePin(PINDIO, 0);
        pins.digitalWritePin(PINCLK, 1);
        pins.digitalWritePin(PINDIO, 1);
    }

    /** FrameAck_1650 
     */
    function FrameAck_1650(): number {
        if(pins.digitalReadPin(PINDIO) == 0) {
            pins.digitalWritePin(PINCLK , 1);	
            pins.digitalWritePin(PINCLK , 0);	
            return 0;
        } else {
            return 1;
        }
    }

    /** writeByte 
     */
    function writeByte(firstByte: number, secondByte: number): number {
        let tmp=0;
        let i=0;
        let err=0;		
        tmp=firstByte;

        FrameStart_1650();
        for(i=0;i<8;i++) {
            if(tmp&0x80) {
                pins.digitalWritePin(PINDIO, 1);
            } else {
                pins.digitalWritePin(PINDIO, 0);
            }
            pins.digitalWritePin(PINCLK , 0);
            pins.digitalWritePin(PINCLK , 1);
            pins.digitalWritePin(PINCLK , 0);
            
            tmp=tmp<<1;
        }
        if(FrameAck_1650() == 1) {
            err=1;
        }
        tmp=secondByte;
        for(i=0;i<8;i++) {
            if(tmp&0x80) {
                pins.digitalWritePin(PINDIO, 1);
            } else {
                pins.digitalWritePin(PINDIO, 0);
            }
        
            pins.digitalWritePin(PINCLK , 0);
            pins.digitalWritePin(PINCLK , 1);
            pins.digitalWritePin(PINCLK , 0);
            
            tmp=tmp<<1;
        }
        if(FrameAck_1650()==1) {
            err=1;
        }
        FrameEnd_1650();
        return err;
    }

    /**
     * send command to display
     * @param c command, eg: 0
     */
    function cmd(c: number) {
        writeByte(CMD_SYSTEM_CONFIG, c);
    }

    /**
     * send data to display
     * @param d data, eg: 0
     * @param bit bit, eg: 0
     */
    function dat(bit: number, d: number) {
        writeByte(DatAddressArray[bit % 4], d);
    }

    /**
     * turn on display
     */
    //% blockId="TM650_ON" block="turn on display"
    //% weight=50 blockGap=8
    export function on() {
        cmd(_intensity * 16 + 1)
    }

    /**
     * turn off display
     */
    //% blockId="TM650_OFF" block="turn off display"
    //% weight=50 blockGap=8
    export function off() {
        _intensity = 0
        cmd(0)
    }

    /**
     * clear display content
     */
    //% blockId="TM650_CLEAR" block="clear display"
    //% weight=40 blockGap=8
    export function clear() {
        dat(0, 0)
        dat(1, 0)
        dat(2, 0)
        dat(3, 0)
        dbuf = [0, 0, 0, 0]
    }

    /**
     * show a digital in given position
     * @param num is number (0-15) will be shown, eg: 1
     * @param bit is position, eg: 0
     */
    //% blockId="TM650_DIGIT" block="show digit %num|at %bit"
    //% weight=80 blockGap=8
    //% num.max=15 num.min=0
    export function digit(num: number, bit: number) {
        dbuf[bit % 4] = _SEG[num % 16]
        dat(bit, _SEG[num % 16])
    }

    /**
     * show a number in display
     * @param num is number will be shown, eg: 100
     */
    //% blockId="TM650_SHOW_NUMBER" block="show number %num"
    //% weight=95 blockGap=8
    export function showNumber(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit(Math.idiv(num, 1000) % 10, 0)
        digit(num % 10, 3)
        digit(Math.idiv(num, 10) % 10, 2)
        digit(Math.idiv(num, 100) % 10, 1)
    }

    /**
     * show a number in hex format
     * @param num is number will be shown, eg: 123
     */
    //% blockId="TM650_SHOW_HEX_NUMBER" block="show hex number %num"
    //% weight=90 blockGap=8
    export function showHex(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit((num >> 12) % 16, 0)
        digit(num % 16, 3)
        digit((num >> 4) % 16, 2)
        digit((num >> 8) % 16, 1)
    }

    /**
     * show Dot Point in given position
     * @param bit is positiion, eg: 0
     * @param show is true/false, eg: true
     */
    //% blockId="TM650_SHOW_DP" block="show dot point %bit|show %num"
    //% weight=80 blockGap=8
    export function showDpAt(bit: number, show: boolean) {
        if (show) dat(bit, dbuf[bit % 4] | 0x80)
        else dat(bit, dbuf[bit % 4] & 0x7F)
    }

    /**
     * set display intensity
     * @param dat is intensity of the display, eg: 3
     */
    //% blockId="TM650_INTENSITY" block="set intensity %dat"
    //% weight=70 blockGap=8
    export function setIntensity(dat: number) {
        if ((dat < 0) || (dat > 8))
            return;
        if (dat == 0)
            off()
        else {
            _intensity = dat
            cmd((dat << 4) | 0x01)
        }
    }

    on();

}
