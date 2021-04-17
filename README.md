# Four Digit Display
YFROBOT's Four Digit Display makecode Package for microbit .

Four Digit Display is a Module with four 8-segment LED, it can show number.

Author: YFROBOT  
Date:   2021-4-17

![](https://raw.githubusercontent.com/finalvalue/pxt-yfrobot-4digitdisplay/main/icon.png)

## Usage

* open your microbit makecode project, in Add Package;
* paste https://github.com/finalvalue/pxt-yfrobot-4digitdisplay  
* to search box then search.

![](https://raw.githubusercontent.com/finalvalue/pxt-yfrobot-4digitdisplay/main/4-LED.jpg)

## API

- **on()**  
turn on the display.  

- **off()**  
turn off the display.  

- **clear()**  
clear content of the display.  

- **digit(num: number, bit: number)**  
show a digit number in given position.  

- **showNumber(num: number)**  
show a interger number in display.  

- **showHex(num: number)**  
show a hex number.  

- **showDpAt(bit: number, show: boolean)**  
show or hide dot piont in give bit  
bit is dot piont position, [0 - 3]  
show, True will show DP, other will hide it  

- **setIntensity(dat: number)**  
set display intensity.  

## Demo

![](https://raw.githubusercontent.com/finalvalue/pxt-yfrobot-4digitdisplay/main/demo.jpg)

## License  

MIT

Copyright (c) 2018, microbit/micropython Chinese community  

## Supported targets  

* for PXT/microbit


[From microbit/micropython Chinese community](http://www.micropython.org.cn) 